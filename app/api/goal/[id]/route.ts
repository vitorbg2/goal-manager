import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db/db';
import { Prisma as PrismaRef } from '@prisma/client'

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

export async function PATCH(request: Request, { params }: any) {
    const id = params.id;

    const content = await request.json();

    const goal = await prisma.goal.update({
        where: { id: id },
        data: {
            ...content,
        }
    });

    return NextResponse.json(
        {
            message: 'Goal updated',
            goal: goal
        },
        {
            status: 200
        }
    );
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