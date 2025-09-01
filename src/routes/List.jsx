// src/routes/List.jsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { listItems, markConsumed, removeItem } from '../lib/db'
import ItemCard from '../components/ItemCard'
import { getAuth } from 'firebase/auth'

export default function List(){
  const qc = useQueryClient()
  const uid = getAuth().currentUser?.uid

  const { data } = useQuery({
    queryKey: ['items', uid],
    queryFn: listItems,
    enabled: !!uid, // wait for auth
  })

  const m1 = useMutation({
    mutationFn: markConsumed,
    onSuccess:()=> qc.invalidateQueries({queryKey:['items']})
  })
  const m2 = useMutation({
    mutationFn: removeItem,
    onSuccess:()=> qc.invalidateQueries({queryKey:['items']})
  })

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold mb-2">Grocery List</h1>
      {(data || []).map(i=> (
        <ItemCard key={i.id} item={i}
          onConsume={()=> m1.mutate(i.id)}
          onDelete={()=> m2.mutate(i.id)} />
      ))}
      {!data?.length && <div className="opacity-70">No items yet — add some!</div>}
    </div>
  )
}
