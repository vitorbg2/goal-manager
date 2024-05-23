import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';

export async function GET(request: Request, { params }: any) {
    const id = params.id;

    const goal = await prisma.goal.findUnique({
        where: {
            id: id,
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
            ...content
        },
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
        }
    }).catch((_) => { });

    return NextResponse.json({}, { status: 200 });
}