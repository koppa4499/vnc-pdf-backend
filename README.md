# VNC Material Archive - PDF Generation Backend

Serverless PDF generation using Puppeteer and Vercel.

## Quick Deploy

1. Push these files to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select this GitHub repo
5. Click "Deploy"

That's it! You'll get a URL like: `https://vnc-pdf-backend.vercel.app`

## Update Your Frontend

Replace the API URL in your `app.html`:

```javascript
const response = await fetch('https://YOUR_VERCEL_URL/api/generate-pdf', {
```

Replace `YOUR_VERCEL_URL` with your actual Vercel deployment URL.

## Features

- ✅ Server-side PDF generation
- ✅ Consistent, high-quality output
- ✅ Works across all browsers
- ✅ Automatic scaling
- ✅ Print background support
- ✅ Serverless (no server management)
- ✅ Free tier (up to 100 function invocations)
