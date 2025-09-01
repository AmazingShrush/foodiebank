const RECIPES = [
  { id: '1', name:'Tomato Soup 🍅', uses:['tomato','onion'] },
  { id: '2', name:'French Toast 🍞', uses:['bread','egg','milk'] },
  { id: '3', name:'Veg Fried Rice 🍚', uses:['rice','carrot','peas'] },
]
export default function Recipes(){
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Use what you have</h1>
      <div className="grid gap-3">
        {RECIPES.map(r=> (
          <div key={r.id} className="card p-4">
            <div className="font-semibold">{r.name}</div>
            <div className="text-sm opacity-70">uses: {r.uses.join(', ')}</div>
          </div>
        ))}
      </div>
      <button className="btn btn-secondary w-full">Surprise Me 🎲</button>
    </div>
  )
}
