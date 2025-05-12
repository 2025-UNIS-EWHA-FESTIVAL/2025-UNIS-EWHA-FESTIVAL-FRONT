import { Link } from "react-router-dom";
import AdBanner from "../components/AdBanner";
import ReviewCarousel from "../components/ReviewCarousel";

const home = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full overflow-hidden">
            <div className="relative w-[375px] h-[667px] bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: "url('/assets/home.svg')" }}>
                    <div className="absolute top-0 left-0 w-full h-[85px]">
                        <AdBanner/>
                    </div>

                    <Link to = '/enter'>
                        <img
                            src='/assets/enterBtn.svg'
                            alt = "응모 버튼"
                            className="absolute left-1/2 -translate-x-1/2 bottom-[230px] cursor-pointer">
                        </img>
                    </Link>

                    <div className="absolute w-full h-[184px] pr-[12px] pl-[12px] mb-[30px] bottom-0">
                        <div className="w-[155px] h-[24px] font-pretendard bg-[#00FF15] text-center text-[14px] font-black"> ◆ 벗들의 진실된 후기 ◆</div>
                        <div className="w-[260px] h-[20px] font-pretendard bg-[#00FF15] text-[#ff0000] mt-[7px] font-black text-center text-[10px] border border-black">가짜? 없습니다! 200% 진실된 후기! 여러분도 가능합니다</div>
                        <div className="w-full h-[125px] mt-[10px]">
                            <ReviewCarousel />
                        </div>
                    </div>
            </div>
      
      </div>

    );
}

export default home;
