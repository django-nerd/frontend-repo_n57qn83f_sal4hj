import React, { useState } from 'react'
import Header from './components/Header'
import GroupCreator from './components/GroupCreator'
import GroupList from './components/GroupList'
import Chat from './components/Chat'

function App() {
  const [openGroup, setOpenGroup] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <GroupCreator onCreated={(g)=>setOpenGroup(g)} />
          </div>
          <div className="lg:col-span-2">
            <GroupList onOpen={(g)=>setOpenGroup(g)} />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white/70 backdrop-blur border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">ברוכים הבאים</h2>
            <p className="text-gray-700">
              כאן תוכלו ליצור קבוצות תמיכה בנושאי בריאות, תזונה וירידה במשקל, לשתף התקדמות, לבקש עזרה
              ולמצוא קהילה מחבקת. התחילו בפתיחת קבוצה חדשה או הצטרפו לקבוצה קיימת.
            </p>
          </div>
        </section>
      </main>

      {openGroup && <Chat group={openGroup} onClose={()=>setOpenGroup(null)} />}
    </div>
  )
}

export default App
