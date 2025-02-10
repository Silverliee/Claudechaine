import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite'

export async function GET() {
    try {
        const db = await open({
            filename: 'src/scripts/loyalty.db',
            driver: sqlite3.Database
        });

        const stats = await db.all(`
            SELECT 
                date,
                purchase_type,
                total_earned,
                total_used,
                unique_users
            FROM stats_daily
            ORDER BY date DESC
        `);
        await db.close();

        return NextResponse.json({ data: stats });
    } catch (error) {
        console.error('Error in stats API:', error);
        return NextResponse.json(
            // @ts-ignore
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}