import './App.css'
import { Routes, Route } from 'react-router'
import MediaIndex from './components/MediaIndex/MediaIndex'
import UserLogin from './components/UserLogin/UserLogin'


//import { useContext } from 'react'
//import { UserContext } from './contexts/UserContext'

function App() {

  //const { user } = useContext(UserContext)
  return (
    <>
      <Routes>
        <Route path='/medias' element={<MediaIndex />}/>
        <Route path='/login' element={<UserLogin />}/>
      </Routes>
    </>
  )
}

export default App
