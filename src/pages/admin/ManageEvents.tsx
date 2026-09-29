import { useEffect, useState } from 'react'
import { AdminSidebar } from '../../components/AdminSidebar'
import { EventForm } from '../../components/EventForm'
import { getEvents } from '../../lib/data'
import { configured, supabase } from '../../lib/supabase'
import type { Event } from '../../types'

export default function ManageEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [editing, setEditing] = useState<Event>()
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const load = () => getEvents().then(setEvents).catch(() => setMessage('Events could not be loaded.'))
  useEffect(() => { load() }, [])
  async function save(values: Partial<Event>) { if (!configured) return setMessage('Configure Supabase before managing live events.'); const { id, capacity, ...rest } = values; const payload = { ...rest, capacity: capacity == null || String(capacity).trim() === '' ? null : Number(capacity) }; const { error } = id ? await supabase.from('events').update(payload).eq('id', id) : await supabase.from('events').insert(payload); if (error) return setMessage('Event could not be saved. Admin database access requires a secure server-side integration.'); setMessage('Event saved.'); setShow(false); setEditing(undefined); load() }
  async function remove(id: string) { if (!confirm('Delete this event? This cannot be undone.')) return; if (!configured) return setMessage('Configure Supabase before managing live events.'); const { error } = await supabase.from('events').delete().eq('id', id); if (error) return setMessage('Event could not be deleted. Admin database access requires a secure server-side integration.'); setMessage('Event deleted.'); load() }
  const shown = events.filter(event => event.title.toLowerCase().includes(query.toLowerCase()))
  const actions = (event: Event) => <div className="admin-card-actions"><button className="btn" onClick={() => { setEditing(event); setShow(true) }}>Edit</button><button className="btn" style={{ color: '#b00' }} onClick={() => remove(event.id)}>Delete</button></div>
  return <div className="admin-layout"><AdminSidebar/><main className="admin-main"><p className="eyebrow">Manage the calendar</p><div className="admin-page-heading"><h1 style={{fontSize:'3rem',margin:'3px 0 24px',fontWeight:950}}>EVENTS</h1><button className="btn primary" onClick={() => { setEditing(undefined); setShow(!show) }}>Add event</button></div>{message&&<p role="status" style={{fontWeight:700}}>{message}</p>}{show&&<div style={{maxWidth:580,marginBottom:25}}><EventForm initial={editing} onSave={save} onCancel={() => setShow(false)}/></div>}<input className="field admin-search" placeholder="Search event" value={query} onChange={event => setQuery(event.target.value)}/><div className="event-table-desktop"><div className="table-wrap"><table className="table"><thead><tr><th>Event</th><th>Category</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{shown.map(event => <tr key={event.id}><td><b>{event.title}</b></td><td>{event.category}</td><td>{event.date}</td><td>{event.registration_open?'Open':'Closed'}</td><td>{actions(event)}</td></tr>)}</tbody></table></div></div><div className="event-card-list">{shown.map(event => <article className="admin-mobile-card" key={event.id}><h2>{event.title}</h2><dl><div><dt>Category</dt><dd>{event.category}</dd></div><div><dt>Date</dt><dd>{event.date}</dd></div><div><dt>Status</dt><dd>{event.registration_open?'Open':'Closed'}</dd></div><div><dt>Venue</dt><dd>{event.venue}</dd></div></dl>{actions(event)}</article>)}</div></main></div>
}
