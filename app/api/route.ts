// Route handlers

export async function GET(request: Request) {
    const goals = [
        {
            name: 'Meta 1',
            tasks: [
                {
                    name: 'Task 1',
                    status: 'todo'
                },
                {
                    name: 'Task 2',
                    status: 'done'
                }
            ]
        }
    ];
    return Response.json({'goals' : goals}, { status: 200 });
}