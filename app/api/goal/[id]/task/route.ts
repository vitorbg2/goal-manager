//import next request and response
import { NextResponse } from 'next/server';

//import prisma client
import prisma from '../../../../../lib/db/db';

export async function POST(request: Request, { params }: any) {
    const id = params.id;
    const data = await request.json();
    data.status = 'todo';

    const task = await prisma.task.create({
        data: {
            goalId: id,
            ...data,
        }
    });

    return NextResponse.json(
        {
            data: task,
        },
        { status: 201 }
    );
}