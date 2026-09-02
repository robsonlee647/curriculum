# curriculum

A hands-on, project-based full-stack developer curriculum — a static site published on GitHub Pages.

The curriculum moves through seven stages, each a real, runnable repository under [@alebofflee](https://github.com/alebofflee):

0. **Prerequisites** — editor, git, Node, PostgreSQL, Claude Code
1. **JavaScript Foundations** — core language, no framework
2. **Next.js** — routing, components, state, API calls
3. **NestJS** — a Todo REST API (in-memory)
4. **TypeORM + PostgreSQL** — the same API, now persisted
5. **Firebase Authentication** — the same API, now per-user
6. **Capstone: SnapTask** — a two-sided task marketplace combining everything above

## Site

Plain HTML/CSS/JS, no build step:

```
index.html            landing page + roadmap
prerequisites.html    stage 0
frontend.html         stages 1–2
backend.html          stages 3–5
capstone.html         stage 6
assets/css/style.css
assets/js/main.js
```

## Publish to GitHub Pages

1. Push this repo to `origin` (`robsonlee647/curriculum`).
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. The site will be live at `https://robsonlee647.github.io/curriculum/`.

Local preview:

```bash
python3 -m http.server 8000
open http://localhost:8000
```
