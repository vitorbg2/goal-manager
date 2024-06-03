'use client'
import { useState, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'

type FormFields = {
    title: string;
    description: string;
    dueDate: Date;
};

export default function GoalPage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<FormFields>();
    const router = useRouter()

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await fetch('/api/goal', {
                method: 'POST',
                body: JSON.stringify({
                    'title': data.title,
                    'description': data.description,
                    'dueDate': new Date(data.dueDate).toISOString(),
                })
            });
            router.push('/');
        } catch (err) {
            console.error(err);
            setError('root', {
                message: "Falha ao submeter o formulário, tente novamente mais tarde",
            });
        }
        console.log(data);
    }

    return (
        <div className='flex w-full'>
            <div className="w-full mx-10">
                <span className='text-3xl'>Criar nova meta</span>
                <form onSubmit={handleSubmit(onSubmit)} className="px-8 pt-6 pb-8 mb-4">
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
                                    tomorrow.setHours(0,0,0);
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