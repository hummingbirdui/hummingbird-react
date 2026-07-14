import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Navigation } from "swiper/modules";
import { themes } from "@/data/landing/themes";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";

import "./styles.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ThemeSlider = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isSlideBegin, setIsSlideBegin] = useState(true);
  const [isSlideEnd, setIsSlideEnd] = useState(false);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      console.log(isSlideEnd);
    }
  };

  return (
    <div className="relative mx-auto max-w-148 sm:max-w-172 lg:max-w-205">
      <Swiper
        modules={[Navigation]}
        freeMode={true}
        slidesPerView="auto"
        spaceBetween={10}
        className="mySwiper w-full h-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsSlideBegin(swiper.isBeginning);
          setIsSlideEnd(swiper.isEnd);
        }}
        onProgress={(swiper) => {
          setIsSlideBegin(swiper.isBeginning);
          setIsSlideEnd(swiper.isEnd);
        }}
      >
        {themes.map((theme) => (
          <SwiperSlide
            className="flex items-center justify-center w-auto!"
          >
            <button className="w-full flex items-center gap-3 rounded-lg border border-subtle bg-default px-2 py-1.75 transition-colors shrink-0">
              <div className="size-6 rounded bg-primary shrink-0" />
              <span className="text-default capitalize">{theme}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute -left-13 top-1/2 z-10 hidden h-full -translate-y-1/2 bg-default sm:block">
        <button
          onClick={handlePrev}
          className="btn btn-circle btn-subtle-neutral swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSlideBegin}
        >
          <ChevronLeftIcon />
        </button>
      </div>

      <div className="absolute -right-13 top-1/2 z-10 hidden h-full -translate-y-1/2 bg-default text-end sm:block">
        <button
          onClick={handleNext}
          className="btn btn-circle btn-subtle-neutral swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSlideEnd}
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

export default ThemeSlider;
