import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Enter from './pages/Enter';
import EnterLoad from './pages/EnterLoad';
import Winner from './pages/Winner';
import Fail from './pages/Fail';
import WinnerInfo from './pages/WinnerInfo';
import Api from './api/Api';
import ReactGA from 'react-ga4';

ReactGA.initialize("G-QH2ZDQ5PWJ");

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
  const location = useLocation();
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(null);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  useEffect(() => {
    Api
    .get('/api/status')
    .then((response) => {
        console.log("서버점검상태: ", response.data);
        setIsUnderMaintenance(!response.data.data);
      }
    )
    .catch((error) => {
      console.log("점검 상태 확인 실패", error);
      setIsUnderMaintenance(true);
    });
  },[]);

  if (isUnderMaintenance === null) return <div>로딩 중...</div>;

  return isUnderMaintenance ? <MaintenancePage/> : <AppRoutes/>;
  
}

export default App;
