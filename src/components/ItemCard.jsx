import { pretty, daysLeft, trafficColor } from '../lib/date'

export default function ItemCard({ item, onConsume, onDelete }){
  const left = daysLeft(item.expiry)
  return (
    <div className={`card p-3 flex items-center justify-between ${trafficColor(item.expiry)}`}>
      <div>
        <div className="font-semibold">{item.name}</div>
        <div className="text-sm opacity-70">expires {pretty(item.expiry)} • {left} days</div>
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={onConsume}>✓</button>
        <button className="btn btn-secondary" onClick={onDelete}>🗑️</button>
      </div>
    </div>
  )
}
