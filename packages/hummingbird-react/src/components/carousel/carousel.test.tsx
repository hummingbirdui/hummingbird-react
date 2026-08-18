import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Carousel, type CarouselApi } from './carousel';

function renderCarousel(rootProps: Partial<Carousel.Props> = {}) {
  return render(
    <Carousel aria-label="Demo carousel" {...rootProps}>
      <Carousel.Content>
        <Carousel.Item>Slide one</Carousel.Item>
        <Carousel.Item>Slide two</Carousel.Item>
        <Carousel.Item>Slide three</Carousel.Item>
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.Indicators />
    </Carousel>
  );
}

describe('Carousel', () => {
  describe('Rendering', () => {
    it('renders the root as a carousel region', () => {
      renderCarousel();
      const root = screen.getByRole('region', { name: /demo carousel/i });
      expect(root).toHaveClass('carousel');
      expect(root).toHaveAttribute('aria-roledescription', 'carousel');
      expect(root).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('renders the viewport and container', () => {
      renderCarousel();
      const viewport = document.querySelector('[data-slot="carousel-content"]');
      expect(viewport).toHaveClass('carousel-viewport');
      expect(viewport?.firstElementChild).toHaveClass('carousel-container');
    });

    it('renders items as slides', () => {
      renderCarousel();
      const slides = screen.getAllByRole('group');
      expect(slides).toHaveLength(3);
      slides.forEach((slide) => {
        expect(slide).toHaveClass('carousel-slide');
        expect(slide).toHaveAttribute('aria-roledescription', 'slide');
      });
    });

    it('renders the controls with core classes and screen-reader labels', () => {
      renderCarousel();
      const prev = screen.getByRole('button', { name: /previous slide/i });
      const next = screen.getByRole('button', { name: /next slide/i });
      expect(prev).toHaveClass('carousel-control-prev');
      expect(next).toHaveClass('carousel-control-next');
      expect(prev.querySelector('.carousel-control-prev-icon')).toBeInTheDocument();
      expect(next.querySelector('.carousel-control-next-icon')).toBeInTheDocument();
    });

    it('renders custom control children instead of the default icon', () => {
      render(
        <Carousel>
          <Carousel.Content>
            <Carousel.Item>Slide</Carousel.Item>
          </Carousel.Content>
          <Carousel.Previous aria-label="Back">
            <span data-testid="custom-icon" />
          </Carousel.Previous>
        </Carousel>
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(
        document.querySelector('.carousel-control-prev-icon')
      ).not.toBeInTheDocument();
    });

    it('renders the caption', () => {
      render(
        <Carousel>
          <Carousel.Content>
            <Carousel.Item>
              <Carousel.Caption>
                <h5>First slide</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel.Content>
        </Carousel>
      );
      const caption = document.querySelector('[data-slot="carousel-caption"]');
      expect(caption).toHaveClass('carousel-caption');
      expect(caption).toHaveTextContent('First slide');
    });
  });

  describe('Orientation', () => {
    it('propagates vertical orientation to the parts', () => {
      renderCarousel({ orientation: 'vertical' });
      expect(screen.getByRole('region')).toHaveAttribute('data-orientation', 'vertical');
      expect(document.querySelector('.carousel-container')).toHaveAttribute(
        'data-orientation',
        'vertical'
      );
      expect(screen.getAllByRole('group')[0]).toHaveAttribute(
        'data-orientation',
        'vertical'
      );
      expect(screen.getByRole('button', { name: /previous slide/i })).toHaveAttribute(
        'data-orientation',
        'vertical'
      );
    });
  });

  describe('Embla wiring', () => {
    it('provides the Embla API through setApi', async () => {
      const setApi = vi.fn();
      renderCarousel({ setApi });
      await waitFor(() => {
        expect(setApi).toHaveBeenCalled();
      });
      const api: CarouselApi = setApi.mock.calls[0][0];
      expect(api?.scrollNext).toBeTypeOf('function');
      expect(api?.scrollSnapList).toBeTypeOf('function');
    });

    it('forwards Embla options', async () => {
      const setApi = vi.fn();
      renderCarousel({ setApi, opts: { loop: true, align: 'center' } });
      await waitFor(() => expect(setApi).toHaveBeenCalled());
      const api: CarouselApi = setApi.mock.calls[0][0];
      expect(api?.internalEngine().options.loop).toBe(true);
      expect(api?.internalEngine().options.align).toBe('center');
    });

    it('sets the vertical axis from the orientation prop', async () => {
      const setApi = vi.fn();
      renderCarousel({ setApi, orientation: 'vertical' });
      await waitFor(() => expect(setApi).toHaveBeenCalled());
      const api: CarouselApi = setApi.mock.calls[0][0];
      expect(api?.internalEngine().options.axis).toBe('y');
    });
  });

  describe('Class Merging', () => {
    it('merges custom classNames on the parts', () => {
      render(
        <Carousel className="custom-root">
          <Carousel.Content className="custom-container">
            <Carousel.Item className="custom-item">Slide</Carousel.Item>
          </Carousel.Content>
          <Carousel.Previous className="custom-prev" />
        </Carousel>
      );
      expect(screen.getByRole('region')).toHaveClass('carousel', 'custom-root');
      expect(document.querySelector('.carousel-container')).toHaveClass('custom-container');
      expect(screen.getByRole('group')).toHaveClass('carousel-slide', 'custom-item');
      expect(
        screen.getByRole('button', { name: /previous slide/i })
      ).toHaveClass('carousel-control-prev', 'custom-prev');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards a ref to the root element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <Carousel ref={ref}>
          <Carousel.Content>
            <Carousel.Item>Slide</Carousel.Item>
          </Carousel.Content>
        </Carousel>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('carousel');
    });
  });

  describe('Display Name', () => {
    it('has the correct display names', () => {
      expect(Carousel.displayName).toBe('Carousel');
      expect(Carousel.Content.displayName).toBe('Carousel.Content');
      expect(Carousel.Item.displayName).toBe('Carousel.Item');
      expect(Carousel.Previous.displayName).toBe('Carousel.Previous');
      expect(Carousel.Next.displayName).toBe('Carousel.Next');
      expect(Carousel.Indicators.displayName).toBe('Carousel.Indicators');
      expect(Carousel.Caption.displayName).toBe('Carousel.Caption');
    });
  });

  describe('Accessibility', () => {
    it('scrolls with the arrow keys matching the orientation', async () => {
      const setApi = vi.fn();
      renderCarousel({ setApi });
      await waitFor(() => expect(setApi).toHaveBeenCalled());
      const api: NonNullable<CarouselApi> = setApi.mock.calls[0][0];
      const scrollNext = vi.spyOn(api, 'scrollNext');
      const scrollPrev = vi.spyOn(api, 'scrollPrev');
      const root = screen.getByRole('region');

      fireEvent.keyDown(root, { key: 'ArrowRight' });
      expect(scrollNext).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(root, { key: 'ArrowLeft' });
      expect(scrollPrev).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(root, { key: 'ArrowDown' });
      fireEvent.keyDown(root, { key: 'ArrowUp' });
      expect(scrollNext).toHaveBeenCalledTimes(1);
      expect(scrollPrev).toHaveBeenCalledTimes(1);
    });

    it('uses the vertical arrow keys when orientation is vertical', async () => {
      const setApi = vi.fn();
      renderCarousel({ setApi, orientation: 'vertical' });
      await waitFor(() => expect(setApi).toHaveBeenCalled());
      const api: NonNullable<CarouselApi> = setApi.mock.calls[0][0];
      const scrollNext = vi.spyOn(api, 'scrollNext');
      const scrollPrev = vi.spyOn(api, 'scrollPrev');
      const root = screen.getByRole('region');

      fireEvent.keyDown(root, { key: 'ArrowDown' });
      expect(scrollNext).toHaveBeenCalledTimes(1);
      fireEvent.keyDown(root, { key: 'ArrowUp' });
      expect(scrollPrev).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(root, { key: 'ArrowRight' });
      fireEvent.keyDown(root, { key: 'ArrowLeft' });
      expect(scrollNext).toHaveBeenCalledTimes(1);
      expect(scrollPrev).toHaveBeenCalledTimes(1);
    });

    it('throws when a part is used outside the root', () => {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      expect(() => render(<Carousel.Item>Orphan</Carousel.Item>)).toThrow(
        /Carousel.Item must be used within a Carousel/
      );
      spy.mockRestore();
    });
  });
});
