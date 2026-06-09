# Casamento João & Catarina

Static, mobile-first wedding invitation built with HTML, Tailwind CDN, and vanilla JavaScript.

## Local Preview

Serve the repository root with any static file server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages Deployment

This repository is prepared for GitHub Pages with `.github/workflows/pages.yml`.

1. Push changes to `main`.
2. In GitHub, open `Settings` > `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Run the `Deploy static site to GitHub Pages` workflow, or push to `main`.

Expected production URL:

```text
https://joaorodriguesgithub.github.io/cjweddinginvite/
```

## Pre-Launch Checklist

- Replace the RSVP placeholder `[LINK_DO_GOOGLE_FORMS]` in `index.html` with the final Google Forms URL.
- Confirm both videos load correctly on iOS Safari and Android Chrome.
- Confirm the Google Maps and Waze links open the venue correctly.
- Keep all asset paths relative, for example `./assets/images/...`, for GitHub Pages compatibility.
