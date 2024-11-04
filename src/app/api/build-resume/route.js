import puppeteer from 'puppeteer';
import chromium from '@sparticuz/chromium-min';
import { GenerateResume } from './GenerateResume';

export async function POST(request) {
    const payload = await request.json();

    try {
        const htmlContent = GenerateResume(payload);

        const browser = await puppeteer.launch({
            headless: chromium.args,
            args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
            executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // this is for local
            // executablePath: await chromium.executablePath("https://s3.ap-south-1.amazonaws.com/ilwebsite2.devinfinitylearn.in/npm-libraries/chromium-v130.0.0-pack.tar"),
        });
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({
            printBackground: true,
            format: 'A4',
            margin: {
                top: '10mm',
                right: '10mm',
                bottom: '10mm',
                left: '10mm',
            },
        });

        await browser.close();
        return new Response(pdfBuffer, {
            status: 200,
            headers: {
                'Accept': "*/*",
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=certificate.pdf',
            }
        });

    } catch (error) {
        console.error("Error generating PDF:", error);
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
