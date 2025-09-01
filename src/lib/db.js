// src/lib/db.js
import { db } from './firebase'
import {
  collection, addDoc, doc, getDocs, query, orderBy,
  Timestamp, updateDoc, deleteDoc
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

function itemsCol(){
  const uid = getAuth().currentUser?.uid
  if (!uid) {
    const e = new Error('Not authed yet'); e.code = 'auth/pending'
    throw e
  }
  return collection(db, `users/${uid}/items`)
}

function safeDate(d) {
  const x = new Date(d)
  if (Number.isNaN(+x)) {
    const e = new Error('Invalid expiry date'); e.code = 'invalid/expiry'
    throw e
  }
  return x
}

export async function addItem(i){
  try {
    return await addDoc(itemsCol(), {
      name: (i.name || '').trim(),
      quantity: i.quantity || 1,
      price: i.price ?? null,
      currency: i.currency ?? 'GBP',
      expiry: Timestamp.fromDate(safeDate(i.expiry)),
      addedAt: Timestamp.now(),
      consumed: false,
    })
  } catch (e) {
    console.error('addItem failed:', e.code || 'no-code', e.message || e)
    throw e
  }
}

export async function listItems(){
  try {
    const snap = await getDocs(query(itemsCol(), orderBy('expiry','asc')))
    return snap.docs.map(d=>({ id: d.id, ...toItem(d.data()) }))
  } catch (e) {
    console.error('listItems failed:', e.code || 'no-code', e.message || e)
    throw e
  }
}

export async function markConsumed(id){
  const uid = getAuth().currentUser?.uid
  await updateDoc(doc(db, `users/${uid}/items/${id}`), { consumed: true })
}
export async function removeItem(id){
  const uid = getAuth().currentUser?.uid
  await deleteDoc(doc(db, `users/${uid}/items/${id}`))
}

function toItem(data){
  return {
    name: data.name,
    quantity: data.quantity,
    price: data.price,
    currency: data.currency,
    expiry: data.expiry.toDate(),
    addedAt: data.addedAt?.toDate?.() ?? new Date(),
    consumed: !!data.consumed,
  }
}
