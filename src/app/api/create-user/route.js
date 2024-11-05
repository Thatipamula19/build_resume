import fs from 'fs';
import path from 'path';
export async function POST(request) {
    const payload = await request.json();
    const filePath = path.join(process.cwd(), '/public/data', 'data.json');
    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(jsonData);
        data.users.push(payload);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return new Response(JSON.stringify({ message: 'Data added successfully' }), {
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