import type { FunctionComponent } from "react";

import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

interface IDateTimeSliderProps {
    list: (string | number)[];
    initialIndex: number;
    onSelect: (value: string | number) => void;
    className?: string
}

const DateTimeSlider: FunctionComponent<IDateTimeSliderProps> = ({ list, initialIndex, onSelect, className }) => {

    const handleClick = (swiper:SwiperClass) => {
        if (swiper.clickedIndex != null) {
            const value = list[swiper.clickedIndex];
            onSelect(value);
            swiper.slideTo(swiper.clickedIndex);
        }
    };

    return (
        <div className="slider-track">
            <Swiper
                direction="vertical"
                slidesPerView={5}
                centeredSlides
                spaceBetween={10}
                mousewheel={{ releaseOnEdges: true, sensitivity: 1 }}
                // loop
                speed={200}
                modules={[Mousewheel]}
                initialSlide={initialIndex}
                onSlideChange={(slide) => onSelect(list[slide.activeIndex])}
                onClick={handleClick}
                className={`swiper-column ${className ? className : 'w-[80px] h-[220px]'}`}
            >
                {list.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className="swiper-slide-item text-center flex items-center justify-center pt-1 text-gray-400 cursor-pointer"
                    >
                        {item}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default DateTimeSlider;