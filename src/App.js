import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Enter from './pages/Enter';
import EnterLoad from './pages/EnterLoad';
import Winner from './pages/Winner';
import Fail from './pages/Fail';
import WinnerInfo from './pages/WinnerInfo';

function MaintenancePage() {
  return (
    <div className="flex flex-col text-center items-center min-h-screen overflow-hidden">
      <div className='w-[280px] h-[130px] absolute left-1/2 -translate-x-1/2 bottom-[290px]'>
        <p className='font-pretendard text-black font-medium text-[24px]'>UNIS 럭키드로우 페이지는 10시~23시까지 운영합니다.</p>
        <p className='font-pretendard text-black font-medium text-[24px] mt-[12px]'>아침에 다시 만나요!</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path = "/" element = {<Home />} />
      <Route path = "/enter" element = {<Enter />} />
      <Route path = '/enter-load' element = {<EnterLoad />} />
      <Route path = '/win' element = {<Winner />} />
      <Route path = '/fail' element ={<Fail />} />
      <Route path = '/win-info' element = {<WinnerInfo />} />
    </Routes>

  );
}

function App() {
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(null);

  useEffect(() => {
    fetch('/api/status', {
      method: 'GET',
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error(`status: ${response.status}`);
      } 
      return response.json();
    })
    .then((data) => {
      console.log("서버점검상태:", data);
      console.log("점검여부:", data.data);
      setIsUnderMaintenance(!data.data);
    })
    .catch((error) => {
      console.log("점검 상태 확인 실패", error);
      setIsUnderMaintenance(true);
    });
  },[]);

  return(
    <Router>
      {isUnderMaintenance ? <MaintenancePage/> : <AppRoutes/>}
    </Router>
  )
}

export default App;
