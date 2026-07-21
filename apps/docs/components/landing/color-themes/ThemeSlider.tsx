import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { Navigation } from "swiper/modules";
import { themes } from "@/data/landing/themes";
import { Button } from "@hummingbirdui/react";
import { useIsDarkMode } from "@/hooks/use-main-theme";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import "swiper/css/navigation";
import "swiper/css";

interface ThemeSliderProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSlider = ({ selectedTheme, onThemeChange }: ThemeSliderProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [isSlideBegin, setIsSlideBegin] = useState(true);
  const [isSlideEnd, setIsSlideEnd] = useState(false);
  const isDark = useIsDarkMode();

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="relative w-full sm:w-85/100 lg:w-89/100 mx-auto mb-6">
      <Swiper
        modules={[Navigation]}
        freeMode={true}
        slidesPerView="auto"
        spaceBetween={10}
        className="size-full"
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
          <SwiperSlide className="flex items-center justify-center w-auto!">
            <button
              onClick={() => onThemeChange(theme.toLowerCase())}
              data-theme={theme.toLowerCase()}
              className={`flex items-center bg-default gap-3 rounded-lg border px-2 py-1.75 ${selectedTheme === theme ? "border-[#1e90ff] dark:border-[#4da7ff]" : "border-subtle"} ${isDark && 'dark'}`}
            >
              <div className="size-6 rounded bg-primary shrink-0" />
              <span className="text-default capitalize">{theme}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute -left-13 top-1/2 z-10 hidden h-full -translate-y-1/2 bg-default sm:block">
        <Button
          onClick={handlePrev}
          shape="circle"
          variant="subtle"
          color="neutral"
          className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSlideBegin}
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      <div className="absolute -right-13 top-1/2 z-10 hidden h-full -translate-y-1/2 bg-default text-end sm:block">
        <Button
          onClick={handleNext}
          shape="circle"
          variant="subtle"
          color="neutral"
          className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSlideEnd}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default ThemeSlider;
