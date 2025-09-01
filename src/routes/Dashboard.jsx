// src/routes/Dashboard.jsx
import { useQuery } from '@tanstack/react-query'
import { listItems } from '../lib/db'
import { getAuth } from 'firebase/auth'

export default function Dashboard(){
  const uid = getAuth().currentUser?.uid
  const { data } = useQuery({
    queryKey: ['items', uid],
    queryFn: listItems,
    enabled: !!uid,
  })
  const total = (data || []).reduce((sum,i)=> sum + (i.price || 0), 0)

  return (
    <div className="space-y-4">
      <section className="card p-4 text-center">
        <div className="text-sm opacity-70">You saved</div>
        <div className="text-3xl font-bold">£{(total*0.3).toFixed(2)}</div>
        <div className="text-sm opacity-70">(rough estimate)</div>
      </section>

      <section className="card p-4">
        <div className="font-semibold mb-2">Expiring Soon</div>
        <ul className="space-y-2">
          {(data || []).slice(0,3).map(i=> (
            <li key={i.id} className="flex justify-between">
              <span>{i.name}</span>
            </li>
          ))}
          {(!data || data.length === 0) && <div>Nothing yet — add some groceries!</div>}
        </ul>
      </section>
    </div>
  )
}
