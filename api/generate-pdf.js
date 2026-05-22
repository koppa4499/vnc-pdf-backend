import puppeteer from 'puppeteer';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { html, filename } = req.body;

        if (!html) {
            return res.status(400).json({ error: 'HTML content is required' });
        }

        // Launch browser
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.createPage();

        // Set viewport
        await page.setViewport({
            width: 794,
            height: 1123,
            deviceScaleFactor: 2
        });

        // Set content
        await page.setContent(html, {
            waitUntil: 'networkidle2'
        });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
            printBackground: true
        });

        await browser.close();

        // Return PDF as response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename || 'document.pdf'}"`);
        res.send(pdfBuffer);

    } catch (error) {
        console.error('PDF Generation Error:', error);
        return res.status(500).json({ 
            error: 'Failed to generate PDF',
            details: error.message 
        });
    }
}
