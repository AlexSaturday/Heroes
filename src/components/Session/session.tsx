import React from 'react'
import './session.css'

export const Session: React.FC = () => {
  return (
    <div className="session-root">
      <aside className="session-aside">
        Панель инструментов
      </aside>
      <main className="session-main">
        Область контента
      </main>
    </div>
  )
}

export default Session


