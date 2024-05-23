//import next request and response
import { NextResponse } from 'next/server';

//import prisma client
import prisma from '../../../lib/db';

export async function GET() {
    const goals = await prisma.goal.findMany();

    return NextResponse.json({ 'goals': goals }, { status: 200 });
}

export async function POST(request: Request) {
    const data = await request.json();

    const goal = await prisma.goal.create({
        data: data,
    });

    return NextResponse.json(
        {
            data: goal,
        },
        { status: 201 }
    );
}