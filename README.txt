SEARCHSIGNAL AI 5D WEBSITE
=========================
The site is a static HTML/CSS/JS project.

Shared navigation:
- partials/header.html is the one shared navbar.
- partials/footer.html is the one shared footer.
- Every page has data-include="header" and data-include="footer".
- assets/site.js loads both shared files automatically.
Edit the partial once and it updates across all pages after deployment.

Files:
index.html, seo.html, aeo.html, geo.html, about.html, contact.html,
privacy-policy.html, 404.html, blog/index.html, blog/*.html,
assets/styles.css, assets/site.js, partials/header.html, partials/footer.html,
robots.txt and sitemap.xml.

Publish:
1. Copy every file and folder into the root of your GitHub Pages repository.
2. Commit and push to the branch/folder configured in Settings > Pages.
3. Test the live website. Shared partials use fetch, so test on GitHub Pages,
   not by opening the HTML directly with file://.
4. Replace hello@searchsignalai.com in contact.html with your real email.
5. Replace the sample LinkedIn and X links in partials/footer.html.
6. Confirm the canonical domain in all pages, robots.txt and sitemap.xml.

Pages are separate URLs and normal navigation opens them in the same tab.
If you want a link to open a new browser tab, add target="_blank"
rel="noopener noreferrer" to that specific anchor.

The 5D effect uses layered gradients, CSS perspective, 3D transforms,
floating visual elements, depth shadows and hover motion. It is responsive
and respects reduced-motion settings.
