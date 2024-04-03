import { useState } from 'react'
import '../output.css'
import { TagsView } from './TagsView'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-slate-900 min-h-screen h-content">
      <TagsView />
    </div>
  )
}

export default App
