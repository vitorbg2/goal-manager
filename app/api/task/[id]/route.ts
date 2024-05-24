import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';
import { Prisma as PrismaRef } from '@prisma/client'

export async function PATCH(request: Request, { params }: any) {
    const id = params.id;
    const content = await request.json();

    const task = await prisma.task.update({
        where: { id: id },
        data: {
            ...content,
        }
    });

    return NextResponse.json(
        {
            message: 'Task updated',
            task: task
        },
        {
            status: 200
        }
    );
}

export async function DELETE(request: Request, { params }: any) {
    const id = params.id;
    await prisma.task.delete({
        where: {
            id: id
        }
    }).catch((e) => {
        const notFoundError = e instanceof PrismaRef.PrismaClientKnownRequestError && e.code === "P2025";
        if (!notFoundError) {
            throw e;
        }
        console.warn("Not found when deleting task");
     });

    return NextResponse.json({}, { status: 200 });
}