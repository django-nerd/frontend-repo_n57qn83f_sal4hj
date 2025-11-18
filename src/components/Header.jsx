import React from 'react'

export default function Header() {
  return (
    <header className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg font-bold">💚</span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">חיים בריאים — קבוצת תמיכה</h1>
            <p className="text-white/80 text-sm">מרחב קהילתי לתמיכה, מוטיבציה ושיתוף</p>
          </div>
        </div>
      </div>
    </header>
  )
}
