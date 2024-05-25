'use client'
 
import { useState, useEffect } from 'react'
 
export default function Counter() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/goal')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
 
  return (
    <div>
      <ul>
        {data.goals.map((_goal: any) => (
          <li key={_goal.id}>{_goal.title} - Data de fim: {_goal.dueDate}</li>
        ))}
      </ul>
    </div>
  )
}