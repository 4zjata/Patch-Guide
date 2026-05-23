# Vanced Portal

A premium, lightweight, mobile-first static portal built in English to help non-technical friends and family install patched Android applications (YouTube ReVanced, YouTube Music ReVanced, TikTok, and Instagram) without hassle.

## Features

- **No API Rate Limits**: Uses direct, static URLs pointing to the `FiorenMas/Revanced-And-Revanced-Extended-Non-Root` and `ReVanced/GmsCore` GitHub releases.
- **Automatic CPU Detection**: Utilizes User-Agent Hints and legacy parsers to detect if the user's phone is ARM64 or ARM32, auto-selecting the appropriate APK version.
- **Huawei Device Handling**: Adds a toggle to switch GmsCore (microG) downloads to the Huawei-signed version if Google services are missing.
- **Easy Translations & Text Editing**: All text, descriptions, lists, and download links are isolated in a single config file (`translations.js`).
- **Sleek Aesthetics**: Features a modern space dark theme, glassmorphic layout cards, responsive fluid typography, and clean SVG brand icons.

---

## Local Development & Testing

Since this is a pure static website (HTML, CSS, JS), you can test it locally without compiling.

To run it, start a local HTTP server inside the project directory:

**Using Python:**
```bash
python3 -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

Then open your browser and navigate to `http://localhost:8000`.

---

## How to Customize Copy or Translate

All text strings are stored in [translations.js](file:///home/voidy/rzeczy/repo/Patchwebsite/translations.js). 

To edit any title, description, or instructions:
1. Open `translations.js`.
2. Locate the text you want to change inside the `TRANSLATIONS` object.
3. Edit the string and save. The website will update immediately upon refresh.

### Translating to Polish:
We have included a commented-out Polish configuration template at the bottom of `translations.js` (`TRANSLATIONS_PL`). If you decide to translate the site:
1. Complete the translations inside the template.
2. Rename or assign `const TRANSLATIONS = TRANSLATIONS_PL` to make it the active language object.

---

## Adding Installation Screenshots

The website includes styled CSS mobile frames (`.mockup-container`) serving as placeholders for steps screenshots. 

Once the site is deployed and you take the screenshots on your mobile phone:
1. Save your screenshots as PNG or JPG to the `assets/screenshots/` folder (e.g., `youtube_step1.png`, `youtube_step2.png`).
2. Open `app.js` and locate the `renderWizardSteps()` function (around line 250).
3. Find the `<!-- Placeholder screen mockup for screenshots -->` HTML block.
4. Replace the `<div class="mockup-placeholder">...</div>` markup with a simple image tag:
   ```html
   <img src="assets/screenshots/your_screenshot_name.png" alt="Step Screenshot" class="mockup-image">
   ```
5. Save the file. The image will automatically cover the placeholder and fit within the responsive phone frame with rounded corners.

---

## VPS Deployment Guide

Since this is a static site, it runs on practically zero RAM and CPU.

### Option A: Using Caddy (Recommended)
Caddy is the simplest web server. It handles HTTPS certificates automatically out of the box.

1. Install Caddy on your VPS.
2. Create a file named `Caddyfile` in your project folder (or `/etc/caddy/Caddyfile`):
   ```caddy
   your-domain.com {
       root * /var/www/vanced-portal
       file_server
       encode gzip
   }
   ```
3. Copy your project files to `/var/www/vanced-portal`.
4. Restart Caddy: `sudo systemctl restart caddy`.

### Option B: Using Nginx
1. Copy the project files to `/var/www/vanced-portal`.
2. Create an Nginx server configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/vanced-portal;
       index index.html;

       location / {
           try_files $uri $uri/ =404;
       }

       # Enable Gzip compression
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml;
   }
   ```
3. Enable the site and reload Nginx: `sudo systemctl reload nginx`.
4. Run certbot to enable HTTPS: `sudo certbot --nginx -d your-domain.com`.
