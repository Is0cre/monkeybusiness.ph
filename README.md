# Monkey Business Landing Page

Static landing page for **monkeybusiness.ph**, designed for GitHub Pages.

## Deploy to GitHub Pages

1. Create a new public repository (or use an existing one).
2. Upload this folder to the root of the repo. Pages stay in the root. Images, CSS, and JS live in `assets/`.
3. Go to **Settings → Pages**.
4. Source: Deploy from a branch → `main` / `root`.
5. Save. Your site will be live at `https://yourusername.github.io/repo-name/` (or custom domain).

### Custom Domain (monkeybusiness.ph)

1. In your domain registrar (for .ph), add a CNAME record pointing to `yourusername.github.io`.
2. In the GitHub repo, create a file named `CNAME` containing:
   ```
   monkeybusiness.ph
   ```
3. Wait for DNS to propagate (can take up to 24–48h).

## Files

- `index.html`, `about.html`, and one page per flavour
- `assets/css/styles.css`, `assets/js/site.js`
- `assets/img/` — photos and the footer coin
- `robots.txt` — allows crawling of the public site

Theme: dark luxury, gold accents, floating coin, "Against the Grain" / Cagayan Valley manifesto. Fully responsive.

Feel free to edit the copy, add real services, or swap the email.
