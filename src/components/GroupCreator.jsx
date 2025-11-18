import React, { useState } from 'react'

export default function GroupCreator({ onCreated }) {
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('ירידה במשקל')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const createGroup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${backend}/api/groups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, topic, description })
      })
      if (!res.ok) throw new Error('שמירה נכשלה')
      const data = await res.json()
      onCreated && onCreated({ id: data.id, name, topic, description, members_count: 0 })
      setName('')
      setDescription('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={createGroup} className="bg-white/80 backdrop-blur p-4 rounded-xl shadow flex flex-col gap-3">
      <h3 className="font-semibold text-gray-800">פתחו קבוצה חדשה</h3>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="שם הקבוצה" className="border rounded-lg px-3 py-2" required />
      <select value={topic} onChange={(e)=>setTopic(e.target.value)} className="border rounded-lg px-3 py-2">
        <option>ירידה במשקל</option>
        <option>תזונה בריאה</option>
        <option>כושר ואימונים</option>
        <option>בריאות מנטלית</option>
      </select>
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="תיאור קצר" className="border rounded-lg px-3 py-2" rows={3} />
      <button disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-2 transition">
        {loading ? 'יוצר...' : 'צור קבוצה'}
      </button>
    </form>
  )
}
