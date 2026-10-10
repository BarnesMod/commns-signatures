# CommNS Outlook Signature Builder — GitHub Pages

Static website for UW–Madison CommNS staff to edit and copy one of three email signatures. No account or server is required for visitors.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `commns-signatures`. Choose **Public** if the page should be accessible without GitHub authentication. (Confirm publishing approval with your CommNS supervisor first.)
2. Upload **the contents of this folder** into the repository root: `index.html`, `assets/`, `.nojekyll`, and `README.md`. Do not upload only the ZIP.
3. Open repository **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**; branch **main**, folder **/(root)**; click **Save**.
4. Wait for GitHub Pages to deploy. Your URL normally looks like `https://USERNAME.github.io/commns-signatures/`. Share that link with staff.
5. Team members edit their details, choose a design, select **Copy formatted signature**, and paste into Outlook signature settings. Send a test email from Outlook desktop and web to check alignment, hyperlinks, and logo display.

## How logos work

Logo images are served as ordinary publicly accessible files from this GitHub Pages website (rather than being embedded as `data:` images). This is friendlier to email clients, but some Outlook editions may block external images or strip them when pasting; recipients can also have remote image loading disabled. Test all three layouts before team rollout. Keep the website live after signatures are deployed: signatures refer to the hosted images.

The included logo images were derived from an example screenshot. Replace `assets/crest.png` and `assets/banner.png` with approved UW–Madison/CommNS identity files (keeping the filenames, or updating `index.html`) before institutional distribution.

## Notes

- Staff enter contact information in their own browsers; the site includes no form submission or external analytics.
- Editing one of the input fields updates all three previews.
- Avoid entering confidential information. GitHub Pages websites for public repositories are publicly accessible.
- Optional contact fields can be blank.
