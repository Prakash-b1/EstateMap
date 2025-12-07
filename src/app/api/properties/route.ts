import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Property } from '@/types';

// Force dynamic to prevent Next.js from caching the GET response statically
export const dynamic = 'force-dynamic';

const dataPath = path.join(process.cwd(), 'src', 'data', 'properties.json');

function getProperties(): Property[] {
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(fileContents) as Property[];
    } catch (error) {
        console.error("Error reading properties file:", error);
        return [];
    }
}

function saveProperties(properties: Property[]) {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(properties, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing properties file:", error);
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const saleMode = searchParams.get('saleMode');
    const usage = searchParams.get('usage');
    const city = searchParams.get('city');

    let filtered = getProperties();

    if (type) {
        filtered = filtered.filter((p) => p.type === type);
    }
    if (saleMode) {
        filtered = filtered.filter((p) => p.saleMode === saleMode);
    }
    if (usage) {
        filtered = filtered.filter((p) => p.usage === usage);
    }
    if (city) {
        filtered = filtered.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
    }

    return NextResponse.json(filtered);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const properties = getProperties();

        // Calculate new ID safely
        const maxId = properties.reduce((max, p) => (p.id > max ? p.id : max), 0);

        const newProperty: Property = {
            ...body,
            id: maxId + 1,
        };

        properties.push(newProperty);
        saveProperties(properties);

        return NextResponse.json({ success: true, message: 'Property listed successfully', property: newProperty });
    } catch (error) {
        console.error('Error saving property:', error);
        return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
    }
}
