import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImage,
  CardImageOverlay,
  CardGroup,
  cardVariants,
  cardImageVariants,
} from './card';

describe('Card', () => {
  describe('Rendering', () => {
    it('renders a div with the card class', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card).toBeInstanceOf(HTMLDivElement);
      expect(card).toHaveClass('card');
      expect(card).toHaveAttribute('data-slot', 'card');
      expect(card).toHaveTextContent('Content');
    });

    it('renders a full card composition', () => {
      render(
        <Card>
          <CardImage src="/img.png" alt="Cover" />
          <CardHeader>Header</CardHeader>
          <CardBody>
            <CardTitle>Title</CardTitle>
            <CardSubtitle>Subtitle</CardSubtitle>
            <CardText>Some text</CardText>
          </CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      );
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Some text')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: /cover/i })).toBeInTheDocument();
    });
  });

  describe('Structure & classes', () => {
    it('applies card-header', () => {
      render(<CardHeader>Header</CardHeader>);
      const el = screen.getByText('Header');
      expect(el).toHaveClass('card-header');
      expect(el).toHaveAttribute('data-slot', 'card-header');
    });

    it('applies card-body', () => {
      render(<CardBody>Body</CardBody>);
      const el = screen.getByText('Body');
      expect(el).toHaveClass('card-body');
      expect(el).toHaveAttribute('data-slot', 'card-body');
    });

    it('applies card-footer', () => {
      render(<CardFooter>Footer</CardFooter>);
      const el = screen.getByText('Footer');
      expect(el).toHaveClass('card-footer');
      expect(el).toHaveAttribute('data-slot', 'card-footer');
    });

    it('applies card-title', () => {
      render(<CardTitle>Title</CardTitle>);
      const el = screen.getByText('Title');
      expect(el).toHaveClass('card-title');
      expect(el).toHaveAttribute('data-slot', 'card-title');
    });

    it('applies card-subtitle', () => {
      render(<CardSubtitle>Subtitle</CardSubtitle>);
      const el = screen.getByText('Subtitle');
      expect(el).toHaveClass('card-subtitle');
      expect(el).toHaveAttribute('data-slot', 'card-subtitle');
    });

    it('applies card-text and renders a paragraph', () => {
      render(<CardText>Text</CardText>);
      const el = screen.getByText('Text');
      expect(el).toBeInstanceOf(HTMLParagraphElement);
      expect(el).toHaveClass('card-text');
      expect(el).toHaveAttribute('data-slot', 'card-text');
    });

    it('applies card-img-overlay', () => {
      render(<CardImageOverlay>Overlay</CardImageOverlay>);
      const el = screen.getByText('Overlay');
      expect(el).toHaveClass('card-img-overlay');
      expect(el).toHaveAttribute('data-slot', 'card-image-overlay');
    });

    it('applies card-group', () => {
      render(<CardGroup data-testid="group" />);
      const el = screen.getByTestId('group');
      expect(el).toHaveClass('card-group');
      expect(el).toHaveAttribute('data-slot', 'card-group');
    });
  });

  describe('Variants', () => {
    it('applies no variant classes by default', () => {
      render(<Card data-testid="card" />);
      expect(screen.getByTestId('card').className.trim()).toBe('card');
    });

    it('applies aside', () => {
      render(<Card aside data-testid="card" />);
      expect(screen.getByTestId('card')).toHaveClass('card', 'card-aside');
    });

    it('applies action', () => {
      render(<Card action data-testid="card" />);
      expect(screen.getByTestId('card')).toHaveClass('card', 'card-action');
    });

    it('combines aside and action', () => {
      render(<Card aside action data-testid="card" />);
      expect(screen.getByTestId('card')).toHaveClass('card', 'card-aside', 'card-action');
    });
  });

  describe('CardImage', () => {
    const positions = [
      { position: 'top', expected: 'card-img-top' },
      { position: 'bottom', expected: 'card-img-bottom' },
      { position: 'left', expected: 'card-img-left' },
      { position: 'right', expected: 'card-img-right' },
      { position: 'full', expected: 'card-img' },
    ] as const;

    it('renders an img with src and alt', () => {
      render(<CardImage src="/cover.png" alt="Cover image" />);
      const img = screen.getByRole('img', { name: /cover image/i });
      expect(img).toBeInstanceOf(HTMLImageElement);
      expect(img).toHaveAttribute('src', '/cover.png');
      expect(img).toHaveAttribute('alt', 'Cover image');
      expect(img).toHaveAttribute('data-slot', 'card-image');
    });

    it('defaults to the top position class', () => {
      render(<CardImage src="/cover.png" alt="Cover" />);
      expect(screen.getByRole('img', { name: /cover/i })).toHaveClass('card-img-top');
    });

    it('applies all position classes', () => {
      positions.forEach(({ position, expected }) => {
        const { unmount } = render(<CardImage position={position} src="/x.png" alt={position} />);
        expect(screen.getByRole('img', { name: position })).toHaveClass(expected);
        unmount();
      });
    });

    it('merges custom className with the position class', () => {
      render(<CardImage position="bottom" className="custom-img" src="/x.png" alt="Cover" />);
      expect(screen.getByRole('img', { name: /cover/i })).toHaveClass(
        'card-img-bottom',
        'custom-img'
      );
    });
  });

  describe('Interactions', () => {
    it('handles clicks on an action card', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Card action onClick={handleClick} data-testid="card">
          Clickable card
        </Card>
      );

      await user.click(screen.getByTestId('card'));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it('renders an interactive card as a button via asChild', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Card action asChild onClick={handleClick}>
          <button type="button">Card button</button>
        </Card>
      );

      const button = screen.getByRole('button', { name: /card button/i });
      expect(button).toHaveClass('card', 'card-action');
      await user.click(button);
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });

  describe('Class Merging', () => {
    it('always includes the base card class', () => {
      render(<Card data-testid="card" />);
      expect(screen.getByTestId('card')).toHaveClass('card');
    });

    it('merges custom className with variant classes', () => {
      render(<Card aside className="custom-class" data-testid="card" />);
      expect(screen.getByTestId('card')).toHaveClass('card', 'card-aside', 'custom-class');
    });

    it('merges custom className on every slot component', () => {
      render(
        <Card data-testid="card">
          <CardHeader className="c-header">Header</CardHeader>
          <CardBody className="c-body">Body</CardBody>
          <CardFooter className="c-footer">Footer</CardFooter>
          <CardTitle className="c-title">Title</CardTitle>
          <CardSubtitle className="c-subtitle">Subtitle</CardSubtitle>
          <CardText className="c-text">Text</CardText>
        </Card>
      );
      expect(screen.getByText('Header')).toHaveClass('card-header', 'c-header');
      expect(screen.getByText('Body')).toHaveClass('card-body', 'c-body');
      expect(screen.getByText('Footer')).toHaveClass('card-footer', 'c-footer');
      expect(screen.getByText('Title')).toHaveClass('card-title', 'c-title');
      expect(screen.getByText('Subtitle')).toHaveClass('card-subtitle', 'c-subtitle');
      expect(screen.getByText('Text')).toHaveClass('card-text', 'c-text');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the card element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Card</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toContain('card');
    });

    it('forwards ref to slot components', () => {
      const bodyRef = React.createRef<HTMLDivElement>();
      const textRef = React.createRef<HTMLParagraphElement>();
      render(
        <Card>
          <CardBody ref={bodyRef}>Body</CardBody>
          <CardText ref={textRef}>Text</CardText>
        </Card>
      );
      expect(bodyRef.current).toBeInstanceOf(HTMLDivElement);
      expect(textRef.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('forwards ref to the image element', () => {
      const ref = React.createRef<HTMLImageElement>();
      render(<CardImage ref={ref} src="/x.png" alt="Cover" />);
      expect(ref.current).toBeInstanceOf(HTMLImageElement);
    });
  });

  describe('asChild Prop', () => {
    it('renders the card as an anchor element', () => {
      render(
        <Card asChild action>
          <a href="/details">Card link</a>
        </Card>
      );
      const link = screen.getByRole('link', { name: /card link/i });
      expect(link).toBeInstanceOf(HTMLAnchorElement);
      expect(link).toHaveClass('card', 'card-action');
      expect(link).toHaveAttribute('href', '/details');
    });

    it('preserves the child element attributes and classes', () => {
      render(
        <Card asChild>
          <a href="/test" className="custom-link">
            Link
          </a>
        </Card>
      );
      const link = screen.getByRole('link', { name: /link/i });
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('card', 'custom-link');
    });

    it('renders slot components as custom elements', () => {
      render(
        <Card>
          <CardTitle asChild>
            <h5>Heading title</h5>
          </CardTitle>
          <CardText asChild>
            <span>Span text</span>
          </CardText>
        </Card>
      );
      const title = screen.getByRole('heading', { name: /heading title/i, level: 5 });
      expect(title).toHaveClass('card-title');
      const text = screen.getByText('Span text');
      expect(text.tagName).toBe('SPAN');
      expect(text).toHaveClass('card-text');
    });
  });

  describe('Display Name', () => {
    it.each([
      [Card, 'Card'],
      [CardHeader, 'CardHeader'],
      [CardBody, 'CardBody'],
      [CardFooter, 'CardFooter'],
      [CardTitle, 'CardTitle'],
      [CardSubtitle, 'CardSubtitle'],
      [CardText, 'CardText'],
      [CardImage, 'CardImage'],
      [CardImageOverlay, 'CardImageOverlay'],
      [CardGroup, 'CardGroup'],
    ])('%o has the correct display name', (component, name) => {
      expect((component as { displayName?: string }).displayName).toBe(name);
    });
  });

  describe('Accessibility', () => {
    it('supports aria-label on the card', () => {
      render(<Card aria-label="Product card">Content</Card>);
      expect(screen.getByLabelText('Product card')).toBeInTheDocument();
    });

    it('supports aria-labelledby wiring to the title', () => {
      render(
        <Card aria-labelledby="card-title" data-testid="card">
          <CardTitle id="card-title">My card</CardTitle>
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card).toHaveAttribute('aria-labelledby', 'card-title');
      expect(document.getElementById('card-title')).toHaveTextContent('My card');
    });

    it('is keyboard accessible when rendered as a button via asChild', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      render(
        <Card action asChild onClick={handleClick}>
          <button type="button">Card button</button>
        </Card>
      );

      const button = screen.getByRole('button', { name: /card button/i });
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });
  });
});

describe('cardVariants', () => {
  it('generates the base class by default', () => {
    expect(cardVariants().trim()).toBe('card');
  });

  it('generates variant classes', () => {
    expect(cardVariants({ aside: true })).toContain('card-aside');
    expect(cardVariants({ action: true })).toContain('card-action');
  });

  it('combines variants', () => {
    const classes = cardVariants({ aside: true, action: true });
    expect(classes).toContain('card');
    expect(classes).toContain('card-aside');
    expect(classes).toContain('card-action');
  });
});

describe('cardImageVariants', () => {
  it('generates the top position class by default', () => {
    expect(cardImageVariants()).toContain('card-img-top');
  });

  it('generates classes for every position', () => {
    expect(cardImageVariants({ position: 'top' })).toContain('card-img-top');
    expect(cardImageVariants({ position: 'bottom' })).toContain('card-img-bottom');
    expect(cardImageVariants({ position: 'left' })).toContain('card-img-left');
    expect(cardImageVariants({ position: 'right' })).toContain('card-img-right');
    expect(cardImageVariants({ position: 'full' }).trim()).toBe('card-img');
  });
});
