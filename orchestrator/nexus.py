import os, json, re, requests, shutil
from urllib import response
from datetime import datetime
from dotenv import load_dotenv
from google import genai

load_dotenv(".env.local")

# --- Config ---
GEMINI_KEY   = os.getenv("GEMINI_API_KEY")
PH_KEY       = os.getenv("POSTHOG_PERSONAL_API_KEY")
PH_PROJECT   = os.getenv("POSTHOG_PROJECT_ID")
PH_HOST      = "https://us.posthog.com"
PAGE_FILE    = "components/hero.tsx"
HISTORY_FILE = "history.md"

client = genai.Client(api_key=GEMINI_KEY)

# --- Step 1: Auto-fetch PostHog metrics ---
def fetch_metrics():
    print("📊 Fetching PostHog metrics...")
    headers = {"Authorization": f"Bearer {PH_KEY}"}

    def hogql(query):
        r = requests.post(
            f"{PH_HOST}/api/projects/{PH_PROJECT}/query/",
            headers=headers,
            json={"query": {"kind": "HogQLQuery", "query": query}}
        )
        r.raise_for_status()
        return r.json()["results"]

    pageviews = hogql("""
        SELECT count() FROM events
        WHERE event = '$pageview'
        AND timestamp > now() - interval 7 day
    """)[0][0]

    cta_clicks = hogql("""
        SELECT count() FROM events
        WHERE event = '$autocapture'
        AND timestamp > now() - interval 7 day
        AND properties.$el_text LIKE '%Join Waitlist%'
    """)[0][0]

    ctr = round((cta_clicks / pageviews * 100), 2) if pageviews > 0 else 0
    metrics = {"pageviews_7d": pageviews, "cta_clicks_7d": cta_clicks, "ctr_pct": ctr}
    print(f"   ✓ Pageviews: {pageviews} | CTA Clicks: {cta_clicks} | CTR: {ctr}%")
    return metrics

# --- Step 2: Read current copy from page.tsx ---
def read_current_copy():
    with open(PAGE_FILE, "r") as f:
        return f.read()

# --- Step 3: Call Gemini to generate optimized copy ---
def generate_copy(metrics, current_source):
    print("🤖 Generating optimized copy via Gemini...")
    prompt = f"""
You are a conversion rate optimization expert analyzing a SaaS landing page.

CURRENT METRICS (last 7 days):
- Pageviews: {metrics['pageviews_7d']}
- CTA Clicks: {metrics['cta_clicks_7d']}
- CTR: {metrics['ctr_pct']}%

CURRENT PAGE SOURCE:
{current_source[:3000]}

Generate improved headline, subheadline, and CTA button text to increase CTR.
Respond ONLY with valid JSON. No explanation. No markdown fences.
Format: {{"headline": "...", "subheadline": "...", "cta": "..."}}
"""
    response = client.models.generate_content(model="gemini-2.5-flash", contents=prompt)
    raw = response.text.strip().strip("```json").strip("```").strip()
    copy = json.loads(raw)
    print(f"   ✓ New headline: \"{copy['headline']}\"")
    return copy

# --- Step 4: Patch page.tsx ---
def patch_page(old_source, new_copy):
    patched = old_source
    patched = re.sub(
        r'(<h1[^>]*>)(.*?)(</h1>)',
        rf'\g<1>{new_copy["headline"]}\g<3>',
        patched, count=1, flags=re.DOTALL
    )
    patched = re.sub(
        r'(Nexus is your intelligent shopping companion[^<]*)',
        new_copy["subheadline"],
        patched, count=1
    )
    patched = re.sub(
        r'(Join Waitlist)',
        new_copy["cta"],
        patched, count=1
    )
    shutil.copy(PAGE_FILE, PAGE_FILE + ".bak")
    with open(PAGE_FILE, "w") as f:
        f.write(patched)
    print(f"   ✓ Patched {PAGE_FILE}")

# --- Step 5: Append to history.md ---
def log_run(run_num, metrics, old_source, new_copy):
    old_h = re.search(r'<h1[^>]*>([^<]+)</h1>', old_source)
    entry = f"""
## Run #{run_num} — {datetime.utcnow().strftime('%Y-%m-%d %H:%M')} UTC
**Metrics:** Pageviews: {metrics['pageviews_7d']} | Clicks: {metrics['cta_clicks_7d']} | CTR: {metrics['ctr_pct']}%
**Old Headline:** {old_h.group(1).strip() if old_h else 'unknown'}
**New Headline:** {new_copy['headline']}
**New Subheadline:** {new_copy['subheadline']}
**New CTA:** {new_copy['cta']}
**Status:** Deployed ✓
"""
    with open(HISTORY_FILE, "a") as f:
        f.write(entry)
    print(f"   ✓ Logged to {HISTORY_FILE}")

# --- Run count helper ---
def next_run_number():
    try:
        with open(HISTORY_FILE, "r") as f:
            return f.read().count("## Run #") + 1
    except FileNotFoundError:
        return 1

# --- Main ---
if __name__ == "__main__":
    print("\n🚀 NEXUS — CRO Orchestrator\n")
    run_num = next_run_number()
    metrics = fetch_metrics()
    old_source = read_current_copy()
    new_copy = generate_copy(metrics, old_source)
    patch_page(old_source, new_copy)
    log_run(run_num, metrics, old_source, new_copy)
print(f"\n✅ Run #{run_num} complete. Now run:\n\n   git add -A && git commit -m 'run: iteration {run_num}' && git push origin main\n")
