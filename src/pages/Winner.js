import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Api from "../api/Api";
import AdBanner from "../components/AdBanner";

const Winner = () => {
    const [collegeName, setCollegeName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [reviewText, setReviewText] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!location.state) {
            navigate("/enter"); 
        }
    }, [location, navigate]);

    if(!location.state) {
        return null;
    }

    const { orderNumber, prize } = location.state;


    const isValid = collegeName && phoneNumber && reviewText;

    const handlePhoneInput = (e) => {
        const numberOnly = e.target.value.replace(/[^0-9]/g, "");
        setPhoneNumber(numberOnly);
    };

    const handleReviewLength = (e) => {
        const value = e.target.value;
        if(value.length <= 100) {
            setReviewText(value);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const textOnly = reviewText.replace(/[.,\s]/g, "");
        if(textOnly.length === 0) {
            alert("벗의 후기를 더 자세하게 듣고 싶어요.");
            return;
        } 

        try {
            await Api.post('/api/draw/win', {
                orderNumber,
                collegeName,
                phoneNumber,
                reviewText,
            });
            navigate('/win-info');
        }
        catch(error) {
            console.error("제출 실패: ", error);
            alert("제출에 실패했습니다. 다시 시도해주세요.");
        }
    };


    return (
        <div className="flex flex-col items-center min-h-screen overflow-hidden">
            <div className="relative w-[375px] h-[667px] bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: "url('/assets/winner.svg')" }}>
                <div className="absolute top-0 left-0 w-full h-[85px]">
                    <AdBanner/>
                </div>

                <div className="absolute w-[326px] h-[67px] left-1/2 -translate-x-1/2 top-[287px] text-center items-center">
                    <p className="font-pretendard font-black text-[25px]">!{prize} 당첨!</p>
                </div>

                <div className="absolute w-[275px] h-[240px] left-1/2 -translate-x-1/2 bottom-[55px] flex flex-col items-center text-center">
                    <div className="w-full h-[18px]">
                        <span className="font-pretendard font-bold text-[15px] text-white">아래 정보를 통해</span>
                        <span className="font-pretendard font-bold text-[15px] text-[#00ff15]">  상품을 </span>
                        <span className="font-pretendard font-bold text-[15px] text-white">전달드릴게요!</span>
                    </div>

                    <form onSubmit={handleSubmit} className="w-[279px] h-[423px] mt-[30px] flex flex-col">
                        <div className="flex justify-between items-center">
                            <label className="font-bold text-[15px] text-white mr-[40px]">단과대</label>
                            <input
                                className="font-pretendard w-[189px] h-[35px] border-[2px] border-[#00ff15] bg-black text-white placeholder-winner font-[14px] font-medium focus:outline-none p-[10px]"
                                placeholder="ex) 조형예술대학"
                                value={collegeName}
                                onChange={(e) => setCollegeName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center mt-[17px]">
                            <label className="font-bold text-[15px] text-white mr-[40px]">연락처</label>
                            <input
                                className="font-pretendard w-[189px] h-[35px] border-[2px] border-[#00ff15] bg-black text-white placeholder-winner font-[14px] font-medium focus:outline-none p-[10px]"
                                placeholder="ex) 01012345678"
                                value={phoneNumber}
                                onChange={handlePhoneInput}
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center mt-[17px]">
                            <label className="font-bold text-[15px] text-white mr-[10px]">한 줄 후기</label>
                            <input
                                className="font-pretendard w-[189px] h-[35px] border-[2px] border-[#00ff15] bg-black text-white placeholder-winner font-[14px] font-medium focus:outline-none p-[10px]"
                                value={reviewText}
                                onChange={handleReviewLength}
                                required
                            />
                        </div>

                        <button className="flex justify-center items-center mt-[30px]" type="submit" disabled={!isValid}>
                            <img  
                                src='/assets/submitBtn.svg' 
                                className={isValid ? "cursor-pointer" : "cursor-not-allowed"} />
                        </button>
                    </form>
                    

                </div>
                
            </div>
        </div>
    )
}

export default Winner;