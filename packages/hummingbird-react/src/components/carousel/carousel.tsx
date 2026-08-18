'use client';

import * as React from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { cn } from '../../utils/cn';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselContextProps {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  orientation: 'horizontal' | 'vertical';
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel(part: string): CarouselContextProps {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error(`Carousel.${part} must be used within a Carousel`);
  }
  return context;
}

export interface CarouselProps extends React.ComponentProps<'div'> {
  /** Options forwarded to Embla Carousel. */
  opts?: CarouselOptions;
  /** Embla Carousel plugins (e.g. autoplay). */
  plugins?: CarouselPlugin;
  /** The scroll axis of the carousel. */
  orientation?: 'horizontal' | 'vertical';
  /** Receives the Embla API instance for imperative control. */
  setApi?: (api: CarouselApi) => void;
}

function CarouselRoot({
  className,
  children,
  opts,
  plugins,
  orientation = 'horizontal',
  setApi,
  onKeyDownCapture,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback((emblaApi: NonNullable<CarouselApi>) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  React.useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = React.useCallback((index: number) => api?.scrollTo(index), [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      if (event.key === prevKey) {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === nextKey) {
        event.preventDefault();
        scrollNext();
      }
      onKeyDownCapture?.(event);
    },
    [orientation, scrollPrev, scrollNext, onKeyDownCapture]
  );

  const context = React.useMemo<CarouselContextProps>(
    () => ({
      carouselRef,
      api,
      orientation,
      scrollPrev,
      scrollNext,
      scrollTo,
      canScrollPrev,
      canScrollNext,
      selectedIndex,
      scrollSnaps,
    }),
    [
      carouselRef,
      api,
      orientation,
      scrollPrev,
      scrollNext,
      scrollTo,
      canScrollPrev,
      canScrollNext,
      selectedIndex,
      scrollSnaps,
    ]
  );

  return (
    <CarouselContext.Provider value={context}>
      <div
        data-slot="carousel"
        data-orientation={orientation}
        role="region"
        aria-roledescription="carousel"
        className={cn('carousel', className)}
        onKeyDownCapture={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
CarouselRoot.displayName = 'Carousel';

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel('Content');
  return (
    <div ref={carouselRef} data-slot="carousel-content" className="carousel-viewport">
      <div
        data-orientation={orientation}
        className={cn('carousel-container', className)}
        {...props}
      />
    </div>
  );
}
CarouselContent.displayName = 'Carousel.Content';

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel('Item');
  return (
    <div
      data-slot="carousel-item"
      data-orientation={orientation}
      role="group"
      aria-roledescription="slide"
      className={cn('carousel-slide', className)}
      {...props}
    />
  );
}
CarouselItem.displayName = 'Carousel.Item';

function CarouselPrevious({ className, children, ...props }: React.ComponentProps<'button'>) {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel('Previous');
  return (
    <button
      type="button"
      data-slot="carousel-previous"
      data-orientation={orientation}
      className={cn('carousel-control carousel-control-prev', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      {children ?? (
        <>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous slide</span>
        </>
      )}
    </button>
  );
}
CarouselPrevious.displayName = 'Carousel.Previous';

function CarouselNext({ className, children, ...props }: React.ComponentProps<'button'>) {
  const { scrollNext, canScrollNext, orientation } = useCarousel('Next');
  return (
    <button
      type="button"
      data-slot="carousel-next"
      data-orientation={orientation}
      className={cn('carousel-control carousel-control-next', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      {children ?? (
        <>
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next slide</span>
        </>
      )}
    </button>
  );
}
CarouselNext.displayName = 'Carousel.Next';

function CarouselIndicators({ className, ...props }: React.ComponentProps<'div'>) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel('Indicators');
  return (
    <div
      data-slot="carousel-indicators"
      className={cn('carousel-indicators', className)}
      {...props}
    >
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          type="button"
          className="carousel-indicator"
          data-active={index === selectedIndex ? '' : undefined}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === selectedIndex || undefined}
          onClick={() => scrollTo(index)}
        />
      ))}
    </div>
  );
}
CarouselIndicators.displayName = 'Carousel.Indicators';

function CarouselCaption({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="carousel-caption" className={cn('carousel-caption', className)} {...props} />
  );
}
CarouselCaption.displayName = 'Carousel.Caption';

const Carousel = /* @__PURE__ */ Object.assign(CarouselRoot, {
  Content: CarouselContent,
  Item: CarouselItem,
  Previous: CarouselPrevious,
  Next: CarouselNext,
  Indicators: CarouselIndicators,
  Caption: CarouselCaption,
});

namespace Carousel {
  export type Props = React.ComponentProps<typeof CarouselRoot>;
  export type ContentProps = React.ComponentProps<typeof CarouselContent>;
  export type ItemProps = React.ComponentProps<typeof CarouselItem>;
  export type PreviousProps = React.ComponentProps<typeof CarouselPrevious>;
  export type NextProps = React.ComponentProps<typeof CarouselNext>;
  export type IndicatorsProps = React.ComponentProps<typeof CarouselIndicators>;
  export type CaptionProps = React.ComponentProps<typeof CarouselCaption>;
  export type Api = CarouselApi;
}

export { Carousel };
export type { CarouselApi };
