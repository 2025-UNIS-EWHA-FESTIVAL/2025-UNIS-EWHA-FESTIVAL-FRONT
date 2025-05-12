import { useState } from "react";
import AdBanner from "../components/AdBanner";
import { Link, useNavigate } from "react-router-dom";
import Api from "../api/Api";

const Enter = () => {
    const text = "토스뱅크 1001-9178-6947";
    const navigate = useNavigate();

    const handleCopy = async () => {
    try {
        await navigator.clipboard.writeText(text);
        alert("클립보드에 복사되었습니다.");
    } catch (err) {
        alert("복사에 실패했습니다.");
        console.error(err);
    }
    };

    const handleClick = async () => {
        console.log("handleClick called");
        try {
            const response = await Api.post('/api/draw/enter');
            const { orderNumber, isWinner, prize } = response.data.data;
            navigate('/enter-load', {state: {orderNumber, isWinner, prize}});
        }
        catch(error) {
            if (error.response) {
                console.error("응답 에러", error.response.data);
            } else if (error.request) {
                console.error("요청 자체 실패", error.request);
            } else {
                console.error("기타 에러", error.message);
            }
            alert("응모에 실패했습니다. 다시 시도해 주세요.");
        }
    }

    return (
    <div className="flex flex-col justify-center items-center h-full overflow-hidden">
        <div className="relative w-[375px] h-[667px] bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/assets/enter.svg')" }}>
                <div className="top-0 left-0 w-full h-[85px]">
                    <AdBanner/>
                </div>
                <div className="absolute flex flex-col w-[284px] h-[461px] mt-[61px] mb-[66px] mr-[43px] ml-[43px]">
                    <div className="w-[284px] h-[70px] text-center text-[25px]">
                        <span className="font-pretendard text-[#00FF15] font-bold">"990원 </span>
                        <span className="font-pretendard text-white font-bold">송금 후"</span> <br/>
                        <span className="font-pretendard text-white font-bold"> 응모 완료 버튼을 눌러주세요</span>
                    </div>

                    <div className="flex justify-evenly w-[290px] h-[38px] rounded-[20px] border-[3px] border-[#00ff15] bg-white mt-[35px] text-center items-center px-[10px] py-[5px]">
                        <p className="font-pretendard font-bold text-[14px]">토스뱅크 1001-9178-6947 강린아</p>
                            <img 
                                src='/assets/copy.svg' 
                                className="cursor-pointer"
                                onClick={handleCopy}
                            />
                    </div>

                    <Link to = '/enter-load'>
                        <img
                            src='/assets/enterBtn.svg'
                            alt = "응모 버튼"
                            className="relative left-1/2 -translate-x-1/2 mt-[40px] cursor-pointer"
                            onClick={handleClick}>
                        </img>
                    </Link>

                    <div className="w-full">
                        <p className="font-pretendard font-medium text-[10px] text-center mt-[40px]">
                        * 해당 이벤트는 웹개발/마케팅 프로젝트의 일환으로 수익금의
                        일부를 기부 후 인증할 예정입니다.
                        </p>
                        <p className="font-pretendard font-medium text-[10px] text-center mt-[3px]">
                        ** 이벤트 특성상 환불이 어렵습니다.
                        </p>
                    </div>

                    <div className="w-[280px] h-[81px] text-center items-center mt-[15px]">
                        <p 
                        className="font-myeongjo font-extrabold text-[20px] text-white"
                        style={{
                            textShadow: '1px 1px 0 #FF0DCF, -1px -1px 0 #FF0DCF, -1px 1px 0 #FF0DCF, 1px -1px 0 #FF0DCF'
                        }}>
                            감사합니다
                        </p>
                        <p 
                        className="font-myeongjo font-extrabold text-[14px] text-white mt-[12px]"
                        style={{
                            textShadow: '1px 1px 0 #4339FF, -1px -1px 0 #4339FF, -1px 1px 0 #4339FF, 1px -1px 0 #4339FF'
                        }}>
                            ~ 한 해 건강과 행복이 가득하길 기원합니다. ~
                        </p>
                        <div className="w-[276px] h-[18px] font-pretendard bg-[#00FF15] text-center items-center border border-black px-[3px] py-[1px] text-[10px] font-black mt-[12px]"> 
                            이화여대 중앙실전창업학회 유니스의 앞으로의 활동도 기대해주세요!
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Enter;