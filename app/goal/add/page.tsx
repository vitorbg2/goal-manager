'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GoalPage() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [form, setForm] = useState<FormData>()
    const [error, setError] = useState<string>()

    const isValid = (formData: FormData): boolean => {
        if (!formData.get("title") || !formData.get("description") || !formData.get("dueDate")) {
            return false;
        }

        return true;
    }

    async function onSubmit(formData: FormData) {
        if (!isValid(formData)) {
            setError("Formulário inválido, preencha todos os campos");
        }
        setForm(formData)
    }

    useEffect(() => {
        if (!form) {
            return;
        }
        setLoading(true);
        fetch('/api/goal', {
            method: 'POST',
            body: JSON.stringify({
                'title': form.get("title"),
                'description': form.get("description"),
                'dueDate': new Date(form.get("dueDate")!.toString()).toISOString()
            })
        }).then((data) => {
            console.log(data);
            router.push('/');
        }).finally(() => {
            setLoading(false);
        })
    }, [form]);

    if (isLoading) {
        return (
            <div>
                Carregando....
            </div>
        );
    }

    return (
        <div className='flex w-full'>
            <div className="w-full mx-10">
                <span className='text-3xl'>Criar nova meta</span>
                <form action={onSubmit} className="px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Título da meta
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" name="title" type="text" placeholder="Title" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Descrição da meta
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description" type="text" placeholder="Description" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                            Data fim
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dueDate" name="dueDate" type="date" placeholder="Due Date" />
                    </div>
                    <div className="flex w-full justify-end">
                        <button className="justify-self-center bg-blue-500 w-64 h-12 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="submit">Criar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}