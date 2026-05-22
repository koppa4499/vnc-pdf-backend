# VNC Material Archive - PDF Generation Backend

Serverless PDF generation using Playwright and Vercel.

## Quick Deploy

1. Push these files to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select this GitHub repo
5. Click "Deploy"

That's it! You'll get a URL.

## Files

- `package.json` - Dependencies
- `vercel.json` - Vercel configuration
- `api/generate-pdf.js` - PDF generation endpoint
- `.gitignore` - Git ignore rules

## Update Frontend

Replace API URL in `app.html`:
```javascript
const response = await fetch('https://YOUR_VERCEL_URL/api/generate-pdf', {
```
