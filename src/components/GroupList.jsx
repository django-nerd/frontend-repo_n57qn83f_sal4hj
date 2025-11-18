import React, { useEffect, useState } from 'react'

export default function GroupList({ onOpen }) {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/groups`)
      const data = await res.json()
      setGroups(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="bg-white/80 backdrop-blur p-4 rounded-xl shadow">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">קבוצות פעילות</h3>
        <button onClick={load} className="text-sm text-emerald-700 hover:underline">רענן</button>
      </div>
      {loading ? (
        <p className="text-gray-600">טוען...</p>
      ) : groups.length === 0 ? (
        <p className="text-gray-600">אין עדיין קבוצות. פתחו אחת!</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-3">
          {groups.map(g => (
            <li key={g.id} className="border rounded-lg p-3 hover:shadow transition cursor-pointer" onClick={()=>onOpen && onOpen(g)}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{g.name}</p>
                  <p className="text-sm text-gray-600">{g.topic}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 rounded-full px-2 py-1">{g.members_count} חברים</span>
              </div>
              {g.description && <p className="text-sm text-gray-700 mt-2 line-clamp-2">{g.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
