import { chromium } from '@playwright/test';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { html, filename } = req.body;

        if (!html) {
            return res.status(400).json({ error: 'HTML content is required' });
        }

        const browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox']
        });

        const context = await browser.createContext({
            viewport: { width: 794, height: 1123 }
        });

        const page = await context.createPage();
        await page.setContent(html, { waitUntil: 'networkidle' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            printBackground: true
        });

        await browser.close();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename || 'document.pdf'}"`);
        res.send(pdfBuffer);

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
    }
}
