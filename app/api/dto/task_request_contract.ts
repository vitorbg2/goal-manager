export default class TaskRequestContract {
    readonly title: string;
    readonly description: string;
    readonly status: string;

    constructor(title: string, description: string, status: string) {        
        this.title = title;
        this.description = description;
        this.status = status;
    }

    static fromJSON(taskRequest: any): TaskRequestContract {
        return new TaskRequestContract(
            taskRequest.title,
            taskRequest.description,
            taskRequest.status
        );
    }
}