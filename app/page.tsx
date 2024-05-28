'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage () {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/goal')
      .then(res => res.json())
      .then(data => {
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

  const homePageGoalProgress = (goal: any) => {
    return (
      <div className='bg-red-300 border-gray-700 border-2 flex flex-col w-80 h-40 rounded-3xl px-4 py-2 place-self-center mt-4'>
        <span className='text-center font-mono font-bold text-md pt-2'>
          {goal.title}
        </span>
        <span className='text-center font-mono mt-2'>
          {goal.completedTasksCount}/{goal.tasksCount} Itens ✅
        </span>
        {/* <span className='self-center'>progressBar</span> */}
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-col justify-center mx-4 px-10 py-8'>
        <div
          id='goals_resume'
          className='bg-emerald-300 flex rounded-xl h-36 p-6 w-full'
        >
          <span className='font-mono text-xl basis-2/5 self-center'>
            Gerenciador de metas
          </span>
          <div className='flex basis-3/5'>
            {goalComponent('Todas as metas', data.goals.length)}
            {goalComponent(
              'Em progresso',
              data.goals.filter((goal: any) => goal.isCompleted === false)
                .length
            )}
            {goalComponent(
              'Completas',
              data.goals.filter((goal: any) => goal.isCompleted === true).length
            )}
          </div>
        </div>
        <div id='goals_home' className='flex flex-1 h-max'>
          <div className='basis-2/5 flex flex-col'>
            <div className='h-44 w-2/3 flex items-center ml-8'>
              <div className='basis-2/5'>
                <div className='flex w-28 h-20 bg-yellow-300 hover:bg-yellow-500 active:bg-yellow-600 shadow-md hover:shadow-xl rounded-xl justify-center items-center text-4xl cursor-pointer' onClick={() => router.push('/goal')}>
                  +
                </div>
              </div>
              <span className='basis-3/5 text-3xl font-mono'>Nova Meta</span>
            </div>
            {/* <div>Metas anteriores Button</div> */}
          </div>
          <div className='basis-3/5 grid grid-cols-2 gap-y-4'>
            {data.goals.filter((goal: any) => goal.isCompleted !== true).map((goal: any) => homePageGoalProgress(goal))}
          </div>
        </div>
      </div>
    </div>
  )
}
