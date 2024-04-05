import { useState } from 'react'
import '../output.css'
import { TagsView } from './TagsView'

function App() {

  return (<>
    <main className="bg-white h-screen flex">
        <TagsView />
    </main>
  </>)
}

export default App
