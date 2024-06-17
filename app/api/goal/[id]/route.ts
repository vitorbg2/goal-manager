import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db/db';
import { Prisma as PrismaRef } from '@prisma/client'
import { UpdateGoal } from '@/lib/services/goal_service';
import GoalRequestContract from '../../dto/goal_request_contract';

export async function GET(request: Request, { params }: any) {
    const id = params.id;

    const goal = await prisma.goal.findUnique({
        where: {
            id: id,
        },
        include: {
            tasks: true
        }
    });

    if (!goal) {
        return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json(goal);
}

export async function PUT(request: Request, { params }: any) {
    try {
        const id = params.id;
        const json = await request.json();
        const contract = GoalRequestContract.fromJSON({
            ...json,
            id: id
        });

        const updatedGoal = await UpdateGoal(contract);

        return NextResponse.json(
            {
                message: 'Goal updated',
                goal: updatedGoal
            },
            {
                status: 200
            }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Falha no servidor' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: any) {
    const id = params.id;
    await prisma.goal.delete({
        where: {
            id: id
        },
        include: {
            tasks: true
        }
    }).catch((e) => {
        const notFoundError = e instanceof PrismaRef.PrismaClientKnownRequestError && e.code === "P2025";
        if (!notFoundError) {
            throw e;
        }
        console.warn("Not found when deleting goal");
    });

    return NextResponse.json({}, { status: 200 });
}