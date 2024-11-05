import fs from 'fs';
import path from 'path';
export async function POST(request) {
    const payload = await request.json();
    try {
        const filePath = path.join(process.cwd(), '/public/data', 'data.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const user = JSON.parse(jsonData)?.users?.find(user => user?.phone === payload?.phone);
        console.log(user);
        if (user) {
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        } else {
        return new Response(JSON.stringify({
            error: 'User not found'
        }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        }
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