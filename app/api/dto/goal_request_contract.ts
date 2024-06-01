import TaskRequestContract from "./task_request_contract";

export default class GoalRequestContract {
    readonly title: string;
    readonly description: string;
    readonly dueDate: string;
    readonly tasks: TaskRequestContract[];

    constructor(title: string, description: string, dueDate: string, tasks: TaskRequestContract[]) {        
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.tasks = tasks;
    }

    static fromJSON(goalRequest: any): GoalRequestContract {
        let tasks = [];
        if (goalRequest.tasks && Array.isArray(goalRequest.tasks)) {
            tasks = goalRequest.tasks.map((task:any) => TaskRequestContract.fromJSON(task));
        }

        return new GoalRequestContract(
            goalRequest.title,
            goalRequest.description,
            goalRequest.dueDate,
            tasks
        );
    }
}