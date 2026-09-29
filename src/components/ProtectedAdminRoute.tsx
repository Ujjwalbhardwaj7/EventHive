import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(Boolean(data.session))
      setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session))
      setChecking(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (checking) return <main className="admin-main">Checking admin session…</main>
  return authenticated ? <>{children}</> : <Navigate to="/admin/login" replace />
}
