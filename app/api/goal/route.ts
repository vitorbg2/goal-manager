//import next request and response
import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';
import GoalDTO from '../dto/goal';

export async function GET() {
    const goals = await prisma.goal.findMany({
        include: {
            tasks: {
                select: {
                    status: true
                }
            }
        }
    });
    const response = goals.map((goal) => GoalDTO.fromJSON(goal));

    return NextResponse.json({ 'goals': response }, { status: 200 });
}

export async function POST(request: Request) {
    const data = await request.json();

    const goal = await prisma.goal.create({
        data: {
            ...data
        },
    });

    return NextResponse.json(
        {
            data: goal,
        },
        { status: 201 }
    );
}