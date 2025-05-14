import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../App.css';

const EnterLoad = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state) {
            navigate('/enter');
            return;
        }

        const { isWinner, orderNumber, prize } = state;

        const timer = setTimeout(() => {
            if (isWinner) {
                navigate('/win', { state: { orderNumber, prize } });
            } else {
                navigate('/fail');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [state, navigate]);

    return(
        <div className="flex flex-col items-center h-full overflow-hidden">
            <div className="relative w-[375px] h-[667px] bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: "url('/assets/enterLoad.svg')" }}>
                <div className="top-0 left-0 w-full h-[85px]">
                    <AdBanner/>
                </div>
                <div className="relative left-1/2 -translate-x-1/2 top-[90px] w-[160px] h-[36px] font-pretendard bg-[#00FF15] text-center p-[6px] text-[16px] border border-black font-black">
                    ◆과연 결과는?◆
                </div>

                <div className="relative left-1/2 -translate-x-1/2 w-[213px] h-[213px] top-[120px]">
                    <img src = '/assets/questionMark.svg'
                         className="wobble-hor-bottom"/>
                </div>

                <div className="relative left-1/2 -translate-x-1/2 w-[219px] top-[160px] text-center">
                    <p 
                        className="font-myeongjo font-extrabold text-[14px] text-white mt-[12px]"
                        style={{
                        textShadow: '1px 1px 0 #4339FF, -1px -1px 0 #4339FF, -1px 1px 0 #4339FF, 1px -1px 0 #4339FF'
                    }}>
                       ♡ 행운의 결과를 기다려보세요 ♡
                    </p>
                </div>

            </div>
        </div>
    )
}

export default EnterLoad;