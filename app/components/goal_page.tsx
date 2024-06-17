'use client'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation'

type Task = {
    title: string;
    description: string;
    status: string;
}

type FormFields = {
    title: string;
    description: string;
    dueDate: string;
    tasks: Task[];
};

export default function GoalPage() {
    const params = useParams<{ id: string }>()
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isLoading }
    } = useForm<FormFields>({
        mode: "onSubmit",
        defaultValues: params.id ? async () => getGoal() : {}
    });
    const { fields: tasks, append, remove } = useFieldArray({
        name: "tasks",
        control
    });

    const getGoal = async () => {
        try {
            const res = await (await fetch(`/api/goal/${params.id}`)).json();
            const goal: FormFields = {
                title: res.title,
                description: res.description,
                dueDate: String(res.dueDate).split('T')[0],
                tasks: res.tasks && Array.isArray(res.tasks) ? res.tasks.map((task: any): Task => ({
                    title: task.title,
                    description: task.description,
                    status: task.status
                })) : [],
            };
            return goal;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            if (params.id) {
                // Not implemented yet
            } else {
                await fetch('/api/goal', {
                    method: 'POST',
                    body: JSON.stringify({
                        'title': data.title,
                        'description': data.description,
                        'dueDate': new Date(data.dueDate).toISOString(),
                        'tasks': data.tasks
                    })
                });
            }
            router.push('/');
        } catch (err) {
            console.error(err);
            setError('root', {
                message: "Falha ao submeter o formulário, tente novamente mais tarde",
            });
        }
    }

    return (
        <div className='flex w-full'>
            <div className="w-full mx-10">
                <span className='text-3xl'>Criar nova meta {isLoading ? '- Carregando....' : ''}</span>                
                <form onSubmit={handleSubmit(onSubmit)} className={`px-8 pt-6 pb-8 mb-4 ${isLoading ? 'hidden' : ''}`}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Título da meta
                        </label>
                        <input
                            {...register('title', {
                                required: "Título obrigatório",
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title" name="title" type="text" placeholder="Title"
                        />
                        {errors.title && <span>{errors.title.message}</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Descrição da meta
                        </label>
                        <input
                            {...register('description')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description" type="text" placeholder="Description"
                        />
                        {errors.description && <span>{errors.description.message}</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                            Data fim
                        </label>
                        <input
                            {...register('dueDate', {
                                required: 'Data fim é obrigatória',
                                validate: (value) => {
                                    const input = new Date(value + 'T00:01');
                                    const tomorrow = new Date();
                                    tomorrow.setDate(tomorrow.getDate() + 1);
                                    tomorrow.setHours(0, 0, 0);
                                    if (input.getTime() >= tomorrow.getTime()) {
                                        return true;
                                    }
                                    return "A data fim deve ser maior que a data de hoje";
                                }
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dueDate" name="dueDate" type="date" placeholder="Due Date"
                        />
                        {errors.dueDate && <span>{errors.dueDate.message}</span>}
                    </div>
                    <div className='mt-12 mb-12'>
                        <div className='mb-6 flex flex-row justify-between'>
                            <span className='font-bold text-xl'>Tarefas</span>
                            <button className='rounded bg-blue-500 text-white py-2 px-3 hover:bg-blue-600' onClick={(e) => {
                                e.preventDefault();
                                append({ title: '', description: '', status: 'todo' });
                            }}>Nova tarefa</button>
                        </div>
                        {
                            tasks.map((field, index) => (
                                <div className='mb-6' key={field.id}>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.id}>
                                        Tarefa {index + 1}
                                    </label>
                                    <div className='flex flex-row'>
                                        <input
                                            {...register(`tasks.${index}.title`, {
                                                required: "Título da tarefa é obrigatório"
                                            })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={field.id} type="text" placeholder="Título"
                                        />
                                        <div className='ml-6 flex items-center cursor-pointer' onClick={(e) => {
                                            e.preventDefault();
                                            remove(index);
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.tasks && errors.tasks[index]?.title && <span>{errors.tasks[index]?.title?.message}</span>}
                                    <div className='mt-4'>
                                        <input
                                            {...register(`tasks.${index}.description`)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Descrição"
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex w-full justify-end">
                        <button disabled={isSubmitting} className="justify-self-center bg-blue-500 w-64 h-12 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="submit">
                            {isSubmitting ? 'Carregando..' : 'Criar'}
                        </button>
                    </div>
                    {
                        errors.root &&
                        <div className="flex w-full justify-end">
                            {errors.root.message}
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}