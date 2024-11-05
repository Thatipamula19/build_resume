import fs from 'fs';
import path from 'path';
export async function GET() {
    // const payload = await request.json();
    try {
        const filePath = path.join(process.cwd(), '/public/data', 'data.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(jsonData);
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error("error:", error);
        return new Response(JSON.stringify({
            error: error?.response ? error?.response?.data : error?.message
        }), {
            status: error?.response ? error?.response?.status : 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}