import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../Components/DashProfile";
import DashSideBar from "../Components/DashSideBar";
import DashUsers from "../Components/DashUsers";
import DashNews from "../components/DashNews";



export default function DashBoard() {
  const location = useLocation();
  const[tab,setTab]= useState();

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search]);
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row text-white ">
      <div className="md:w-56">
        <DashSideBar/>
      </div>
      {tab==='profile' && <DashProfile/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'news' && <DashNews/>}
   
     
    </div>
  )
}
