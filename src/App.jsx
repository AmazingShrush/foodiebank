import { Outlet, Link, useLocation } from 'react-router-dom'
import TopBar from './components/TopBar'

export default function App(){
  const { pathname } = useLocation()
  return (
    <div className="max-w-md mx-auto p-4">
      <TopBar />
      <Outlet />
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {[
          ['/', '🏠'],
          ['/add', '➕'],
          ['/list', '🧺'],
          ['/recipes', '🍳'],
        ].map(([to, label]) => (
          <Link key={to} to={to} className={`btn ${pathname===to? 'btn-primary':'btn-secondary'}`}>{label}</Link>
        ))}
      </nav>
    </div>
  )
}
