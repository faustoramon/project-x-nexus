# Nexus — Human-in-the-Loop CRO Engine

## What Nexus Does

Nexus is an automated Conversion Rate Optimization engine that fetches real user analytics from PostHog, sends them to Gemini AI to generate optimized landing page copy, and surgically patches the live Next.js frontend — all in a single command. Each iteration is timestamped and logged, creating a reproducible, auditable record of every copy change and the metrics that drove it.

---

## The Problem

CRO loops are broken. Analytics live in one tool, copywriters live in another, and a human — usually a PM or growth lead — manually bridges the gap: export data, write a brief, wait for copy, A/B test, repeat. This human bridge is slow, undocumented, and impossible to replay. Nexus collapses the silo.

---

## Architecture

Nexus runs as a single-process orchestrator. The 5-step flow:

```
1. FETCH   → Pull live pageview + CTA click metrics from PostHog API
2. GENERATE → Send metrics + current hero source to Gemini 2.5 Flash
3. PARSE   → Extract structured {headline, subheadline, cta} JSON from response
4. PATCH   → Surgically rewrite components/hero.tsx with new copy (regex, re.DOTALL)
5. LOG     → Append timestamped iteration record to history.md
```

A git push to `main` triggers an automatic Vercel deploy. The human stays in the loop only for the push — every other step is automated.

**Radical simplicity is a deliberate systems design choice.** A single-process orchestrator with a flat file log is more auditable, more reproducible, and easier to reason about than a distributed agent graph.

```
orchestrator/nexus.py          # The entire brain
components/hero.tsx            # The file being patched each run
history.md                     # Flat iteration log, auto-appended
```

---

## Setup & Reproduction

```bash
# 1. Install dependencies
pip install google-genai posthog python-dotenv requests

# 2. Set environment variables in .env.local
POSTHOG_PERSONAL_API_KEY=your_key
POSTHOG_PROJECT_ID=your_project_id
GEMINI_API_KEY=your_key

# 3. Run the engine
python3 orchestrator/nexus.py
```

After the script completes, push to deploy:

```bash
git add -A && git commit -m 'run: iteration N' && git push origin main
```

Vercel auto-deploys on push. No other infrastructure required.

---

## Iteration Log

Every run appends a timestamped entry to [`history.md`](./history.md), recording the metrics seen and the copy generated. Three iterations are logged as of submission.

---

## AI & Tool Attribution

| Tool | Role |
|---|---|
| **v0 (Vercel)** | Frontend scaffold — generated the initial Next.js landing page component structure |
| **Gemini 2.5 Flash (`google-genai`)** | Copy generation — receives live metrics + hero source, returns `{headline, subheadline, cta}` JSON |
| **PostHog** | Analytics backend — real pageview and CTA click data used as the optimization signal |
| **Claude (Anthropic)** | README drafting and project handoff support |

---

## Live Demo

**Live site:** [https://project-x-nexus.vercel.app](https://project-x-nexus.vercel.app)

**GitHub:** [https://github.com/faustoramon/project-x-nexus](https://github.com/faustoramon/project-x-nexus)

---

## External Resources & Citations

- [PostHog REST API](https://posthog.com/docs/api) — analytics data source
- [Google Gemini API (`google-genai`)](https://ai.google.dev/gemini-api/docs) — copy generation model
- [Vercel](https://vercel.com/docs) — deployment platform (git push → auto-deploy)
- [Next.js](https://nextjs.org/docs) — frontend framework
- Frontend scaffold generated with [v0 by Vercel](https://v0.dev)
