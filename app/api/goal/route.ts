//import next request and response
import { NextResponse } from 'next/server';
import prisma from '../../../lib/db/db';
import GoalDTO from '../dto/goal';
import { CreateGoal } from '@/lib/services/goal_service';
import GoalRequestContract from '../dto/goal_request_contract';

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
    const json = await request.json();
    const data = GoalRequestContract.fromJSON(json);
    const createdGoal = await CreateGoal(data);

    return NextResponse.json(
        {
            data: createdGoal,
        },
        { status: 201 }
    );
}