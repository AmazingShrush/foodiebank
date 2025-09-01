// src/components/AddItemForm.jsx
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { addItem } from '../lib/db'
import { useQueryClient } from '@tanstack/react-query'

const schema = z.object({
  name: z.string().min(1),
  quantity: z.coerce.number().min(1).default(1),
  price: z.union([z.coerce.number(), z.literal('')]).optional(),
  expiry: z.coerce.date(),
})

export default function AddItemForm(){
  const qc = useQueryClient()
  const { register, handleSubmit, reset, formState:{errors, isSubmitting} } =
    useForm({ resolver: zodResolver(schema) })

  return (
    <form className="card p-4 space-y-3" onSubmit={handleSubmit(async (d)=>{
      try {
        await addItem({
          name: d.name,
          quantity: d.quantity,
          price: d.price ?? null,
          expiry: d.expiry, // already Date from zod
        })
        await qc.invalidateQueries({ queryKey: ['items'] })
        reset()
      } catch (e) {
        alert(`Add failed: ${(e.code || 'error')} – ${e.message || e}`)
      }
    })}>
      <input className="input" placeholder="Item name" {...register('name')} />
      <input className="input" type="number" placeholder="Quantity" {...register('quantity')} />
      <input className="input" type="number" step="0.01" placeholder="Price (optional)" {...register('price')} />
      <input className="input" type="date" {...register('expiry')} />
      {errors.name && <p className="text-red-600 text-sm">Name required</p>}
      {errors.expiry && <p className="text-red-600 text-sm">Valid expiry date required</p>}
      <button className="btn btn-primary w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Add Item'}
      </button>
    </form>
  )
}
