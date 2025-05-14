import './App.css'
import { Routes, Route } from 'react-router'
import MediaIndex from './components/MediaIndex/MediaIndex'

function App() {


  return (
    <>
      <Routes>
        <Route path='/medias' element={<MediaIndex />}/>
      </Routes>
    </>
  )
}

export default App
