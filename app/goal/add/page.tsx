'use client'
import { useState, useEffect } from 'react'

export default function GoalPage() {
    const [isLoading, setLoading] = useState(false)

    async function onSubmit(formData: any) {
        // console.log(formData);
        console.log(formData.get("title"));
        console.log(formData.get("description"));
    }

    return (
        <div className='flex w-full'>
            <div className="w-full mx-10">
                Criar nova meta
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
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 w-64 h-12 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="submit">Criar</button>
                    </div>
                </form>
            </div>
            {/* <form onSubmit={onSubmit}>
                <input type="text" name="goalTitle"></input>
                <input type="text" name="goalDescription"></input>
            </form> */}
        </div>
    )
}