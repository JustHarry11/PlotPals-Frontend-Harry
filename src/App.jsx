import './App.css'
import { Routes, Route, Navigate } from 'react-router'
import NavBar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'


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


function App() {

  return (
    <>
    <div className="app-wrapper">
      <NavBar />
      
      <main className='main-content'>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>}/>
        <Route path='/home' element={<FavouriteHome />} />
        <Route path='/medias' element={<MediaIndex />}/>
        <Route path='/medias/:mediaId' element={<MediaShow />}/>
        <Route path='/genres'element={<GenreIndex />} />
        <Route path='/genres/:genreId'element={<GenreShow />} />


        <Route path='/medias/new' element={<MediaCreate />}/>
        <Route path='/medias/:mediaId/edit' element={<MediaUpdate />}/>
        <Route path='/favourites' element={<UserFavourite />} />

        <Route path='/login' element={<UserLogin />}/>
        <Route path='/register' element={<UserRegister />} />

      </Routes>
      </main>
      <Footer />
      </div>
    </>
  )
}

export default App
