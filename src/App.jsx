import './App.css'
import { Routes, Route } from 'react-router'
import NavBar from './components/Navbar/Navbar'


import MediaIndex from './components/MediaIndex/MediaIndex'
import UserLogin from './components/UserLogin/UserLogin'
import MediaShow from './components/MediaShow/MediaShow'
import MediaUpdate from './components/MediaUpdate/MediaUpdate'
import UserRegister from './components/UserRegister/UserRegister'
import UserFavourite from './components/UserFavourite/UserFavourite'
import MediaCreate from './components/MediaCreate/MediaCreate'

import FavouriteHome from './components/HomeFavourite/HomeFavourite'
import GenreIndex from './components/GenreIndex/GenreIndex'
import GenreShow from './components/GenreShow/GenreShow'


//import { useContext } from 'react'
//import { UserContext } from './contexts/UserContext'

function App() {

  //const { user } = useContext(UserContext)
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/medias' element={<MediaIndex />}/>
        <Route path='/login' element={<UserLogin />}/>
        <Route path='/medias/new' element={<MediaCreate />}/>
        <Route path='/medias/:mediaId' element={<MediaShow />}/>
        <Route path='/medias/:mediaId/edit' element={<MediaUpdate />}/>
        <Route path='/register' element={<UserRegister />} />
        <Route path='/favourites' element={<UserFavourite />} />
        <Route path='/home' element={<FavouriteHome />} />
        <Route path='/genres'element={<GenreIndex />} />
        <Route path='/genres/:genreId'element={<GenreShow />} />
      </Routes>
    </>
  )
}

export default App
