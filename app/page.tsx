'use client'

import { useState, useEffect } from 'react'

export default function Counter () {
  const [data, setData] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // const data = {
    //   goals: [
    //     {
    //       id: 'clwm99wlg00041skfrb8k7i6g',
    //       title: 'First Goal',
    //       description: 'First goal showing on react page',
    //       dueDate: '2024-05-25T15:18:27.449Z',
    //       createdAt: '2024-05-25T15:18:35.188Z',
    //       updatedAt: '2024-05-25T15:18:35.188Z',
    //       tasks: []
    //     }
    //   ]
    // }
    // setData(data)
    // setLoading(false)
    fetch('/api/goal')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  const goalComponent = (title: string, value: number) => {
    return (
      <div className='flex-1 flex flex-col items-center'>
        <h1 className='my-2 font-mono text-center text-base'>{title}</h1>
        <div className='bg-blue-400 flex-1 w-4/6 rounded-xl border-2 border-gray-900 items-center justify-center flex'>
          <span className='font-mono text-center text-2xl'>{value}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='flex justify-center px-10 py-8'>
        <div className='bg-emerald-300 rounded-xl h-36 mx-6 p-6 w-full flex'>
          <span className='font-mono text-xl flex-1 self-center'>
            Gerenciador de metas
          </span>
          <div className='flex flex-1'>
            {goalComponent('Todas as metas', data.goals.length)}
            {goalComponent('Em progresso', data.goals.filter((goal: any) => goal.isCompleted === false).length)}
            {goalComponent('Completas', data.goals.filter((goal: any) => goal.isCompleted === true).length)}
          </div>
        </div>
      </div>
    </div>
  )
}
