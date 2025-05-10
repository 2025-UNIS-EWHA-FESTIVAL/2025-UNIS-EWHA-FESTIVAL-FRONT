import { useEffect, useState } from 'react';
import '../App.css';
import Api from '../api/Api';


const AdBanner = () => {
    const [bannerImages, setBannerImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await Api.get('/api/banner');
                if (response.status === 200) {
                    setBannerImages(response.data.data);
                }
            } catch (error) {
                console.error("이미지 불러오기 실패", error);
            }
        };

        fetchBanner(); 
    }, []);

    useEffect(() => {
        if (bannerImages.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
        }, 3000); 

        return () => clearInterval(interval); 
    }, [bannerImages]);

    return (
        <div className="w-full h-full">
            <img 
                src={bannerImages[currentIndex]}
                alt="광고 배너"
                className="w-full h-[85px] object-cover"
            />
        </div>
    );
} 

export default AdBanner;