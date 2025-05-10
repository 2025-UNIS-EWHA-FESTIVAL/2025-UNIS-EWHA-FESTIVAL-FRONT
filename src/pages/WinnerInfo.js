import AdBanner from "../components/AdBanner";

const WinnerInfo = () => {
    const url = "https://www.instagram.com/p/DJWJaBGBebB/?img_index=1"

    return (
        <div className="flex flex-col items-center min-h-screen overflow-hidden">
            <div className="relative w-[375px] h-[667px] bg-cover bg-center overflow-hidden"
                style={{ backgroundImage: "url('/assets/winnerInfo.svg')" }}>
                <div className="absolute top-0 left-0 w-full h-[85px]">
                    <AdBanner/>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 w-[200px] h-[110px] flex flex-col bottom-[100px]">
                    <span 
                        className="font-pretendard text-center font-medium text-[15px] mb-[16px] text-white"
                        style={{
                            textShadow: '1px 1px 0 #FF0DCF, -1px -1px 0 #FF0DCF, -1px 1px 0 #FF0DCF, 1px -1px 0 #FF0DCF'
                        }}>
                            대동제 부스 근처에<br/>서식하는 유니콘을 찾으면<br/>행운이 찾아올지도 몰라요!
                    </span>

                    <button className="">
                        <img 
                            src = '/assets/unicornBtn.svg'
                            onClick = {()=>{window.open(url)}}/>
                    </button>
                </div>
            </div>
        </div>

    )
}

export default WinnerInfo;