import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './pages/Menu'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import DashBoard from './pages/DashBoard'
import PrivateRoute from './components/PrivateRoute'
import AddNews from './pages/AddNews'
import UpdateNews from './pages/UpdateNews'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import NewsDetails from './pages/NewsDetails'
import Politics from './pages/Politics'
import Science from './pages/Science'
import Business from './pages/Business'
import Sports from './pages/Sports'
import Culture from './pages/Culture'
import Investigation from './pages/Investigation'
import Health from './pages/Health'
import World from './pages/World'






export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/news/:slug" element={<NewsDetails />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/science" element={<Science />} />
        <Route path="/business" element={<Business />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/investigations" element={<Investigation />} />
        <Route path="/health" element={<Health/>} />
        <Route path="/world" element={<World/>} />

 
        <Route element={<PrivateRoute/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/> 
        <Route/>

        <Route element={<OnlyAdminPrivateRoute/>}/>
          <Route path="/addnews" element={<AddNews />}></Route>
          <Route path="/update-news/:id" element={<UpdateNews/>} />
          
        <Route/> 

      </Routes>
      
      <Footer/>
    </BrowserRouter>
  )
}
