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






export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        

 
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
