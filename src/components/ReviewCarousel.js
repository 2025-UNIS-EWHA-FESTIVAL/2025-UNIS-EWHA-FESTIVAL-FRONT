import { useEffect, useState } from "react";
import Slider from "react-slick";
import Api from "../api/Api";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewCarousel = () => {
    const [review, setReview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        const fetchReview = async (isInitial = false) => {
            if(isInitial) setInitialLoading(true);
            setLoading(true);
            try {
                const response = await Api.get("/api/draw/results");
                setReview(response.data.data);
              } catch (error) {
                console.log("리뷰 불러오기 실패", error);
              } finally {
                if(isInitial) setInitialLoading(false);
              }
        };

        fetchReview(true);

        const interval = setInterval(() => {
            fetchReview(false);
        }, 10000);

        return() => clearInterval(interval);
    }, []);


    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 3000,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };

    if (!review) return <div>리뷰 없음</div>;

    return (
        <>
        {initialLoading ? (<div>loading...</div>) : review.length > 0 ? (
                <Slider {...settings}>
                    {review.map((review, index) => (
                        <div
                            key={index}
                            >
                            <div className="w-[172px] h-[130px] bg-black rounded-[15px] border-[3px] border-[#00FF15] p-[12px]">
                                <div className="w-full h-[47px] flex justify-between">
                                    <div className="w-[50px] h-[50px]">
                                        <img src='/assets/unicornProfile.svg'/>
                                    </div>

                                <div className="w-[100px] h-full flex flex-col">
                                    <div className="font-pretendard text-[15px] text-white font-extrabold gap-[2px]">{review.prize} 당첨!</div>
                                    <div className="font-pretendard text-[10px] text-[#787878] font-medium mt-[2px]">{review.entryTime.slice(0, 10)}</div>
                                </div>
                                </div>
                            
                                <div className="w-[142px] h-[44px] flex flex-col mt-[15px]">
                                    <p className="font-pretendard text-[14px] text-[#787878] font-semibold">{review.collegeName} 벗</p>
                                    <p className="font-pretendard text-[14px] text-white font-medium mt-[2px]">
                                        {review.reviewText.length > 13
                                            ? review.reviewText.slice(0,12) + '...'
                                        : review.reviewText}
                                    </p>
                                </div>

                            </div>
                                                           
                        </div>
                    ))
                }
                </Slider>
            ) : (
            <div>리뷰 없음</div>
        )}
        </>

    );
}

export default ReviewCarousel;

            // try {
            //     const response = await Api.get("/api/draw/results");
            //     setReview(response.data);
            // }
            // catch (error) {
            //     console.error("리뷰 불러오기 실패", error);
            // }