import prisma from '../db/db';
import GoalRequestContract from '@/app/api/dto/goal_request_contract';
import TaskRequestContract from '@/app/api/dto/task_request_contract';

export async function CreateGoal(goalContract: GoalRequestContract): Promise<any> {
    const goal = await prisma.goal.create({
        data: {
            title: goalContract.title,
            description: goalContract.description,
            dueDate: goalContract.dueDate
        }
    });

    if (goalContract.tasks.length > 0) {
        await prisma.task.createMany({
            data: goalContract.tasks.map((task: TaskRequestContract) => ({
                title: task.title,
                description: task.description,
                status: 'todo',
                goalId: goal.id
            }))
        });
    }

    return goal;
}

export async function UpdateGoal(goalContract: GoalRequestContract): Promise<any> {
    if (!goalContract.id) {
        throw Error('Need a ID To update a goal');
    }
    
    const goal = await prisma.goal.update({
        where: { id: goalContract.id },
        data: {
            title: goalContract.title,
            description: goalContract.description,
            dueDate: goalContract.dueDate,
        }
    });

    await prisma.task.deleteMany({
        where: {
            goalId: goalContract.id
        }
    });

    if (goalContract.tasks.length > 0) {
        await prisma.task.createMany({
            data: goalContract.tasks.map((task: TaskRequestContract) => ({
                title: task.title,
                description: task.description,
                status: task.status,
                goalId: goal.id
            }))
        });
    }

    return goal;
}