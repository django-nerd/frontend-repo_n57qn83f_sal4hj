import React, { useEffect, useState, useRef } from 'react'

export default function Chat({ group, onClose }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const bottomRef = useRef(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${backend}/api/groups/${group.id}/messages`)
      const data = await res.json()
      setMessages(data)
    } catch (e) { console.error(e) } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [group.id])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const send = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    const newMsg = { group_id: group.id, author_name: 'אורח', content: text.trim() }
    setText('')
    try {
      const res = await fetch(`${backend}/api/groups/${group.id}/messages`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newMsg)
      })
      if (!res.ok) throw new Error('שליחה נכשלה')
      await load()
    } catch (e) { console.error(e) }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col">
        <div className="px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between">
          <div>
            <p className="font-semibold">{group.name}</p>
            <p className="text-white/80 text-sm">{group.topic}</p>
          </div>
          <button onClick={onClose} className="bg-white/20 hover:bg-white/30 rounded px-3 py-1">סגור</button>
        </div>

        <div className="p-4 h-96 overflow-y-auto space-y-3 bg-emerald-50/50">
          {loading ? (
            <p className="text-gray-600">טוען שיחות...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-600">עוד אין הודעות. היו הראשונים לשתף!</p>
          ) : (
            messages.map(m => (
              <div key={m.id} className="bg-white rounded-lg border p-3">
                <p className="text-sm text-gray-500">{m.author_name}</p>
                <p className="text-gray-800">{m.content}</p>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        <form onSubmit={send} className="p-3 border-t flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 border rounded-lg px-3 py-2" placeholder="כתבו הודעת תמיכה, טיפ או שאלה..." />
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4">שלח</button>
        </form>
      </div>
    </div>
  )
}
