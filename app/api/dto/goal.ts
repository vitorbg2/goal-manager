export default class GoalDTO {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly dueDate: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date | undefined;
    readonly isCompleted: boolean;
    readonly completedTasksCount: number;
    readonly uncompletedTasksCount: number;
    readonly tasksCount: number;

    constructor(id: number, title: string, description: string, dueDate: Date, createdAt: Date, updatedAt: Date | undefined, isCompleted: boolean, completedTasksCount: number, uncompletedTasksCount: number, tasksCount: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isCompleted = isCompleted;
        this.completedTasksCount = completedTasksCount;
        this.uncompletedTasksCount = uncompletedTasksCount;
        this.tasksCount = tasksCount;
    }

    static fromJSON(goalJsonDB: any): GoalDTO {
        const tasks = goalJsonDB.tasks;
        const completedTasksCount = tasks.filter((task: any) => task.status === 'done').length;
        const uncompletedTasksCount = tasks.filter((task: any) => task.status === 'todo').length;

        return new GoalDTO(
            goalJsonDB.id,
            goalJsonDB.title,
            goalJsonDB.description,
            new Date(goalJsonDB.dueDate),
            new Date(goalJsonDB.createdAt),
            goalJsonDB.updatedAt ? new Date(goalJsonDB.updatedAt) : undefined,
            completedTasksCount === tasks.length,
            completedTasksCount,
            uncompletedTasksCount,
            tasks.length
        );
    }
}