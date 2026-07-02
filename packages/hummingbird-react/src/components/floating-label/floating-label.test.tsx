import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FloatingLabel } from './floating-label';
import { FormControl, Textarea } from '../form-control';
import { Select } from '../select';

describe('FloatingLabel', () => {
  describe('Rendering', () => {
    it('renders a wrapper div with the control and the label', () => {
      render(
        <FloatingLabel label="Email address" htmlFor="email">
          <FormControl id="email" type="email" />
        </FloatingLabel>
      );
      const input = screen.getByLabelText('Email address');
      expect(input).toBeInTheDocument();
      expect(input).toBeInstanceOf(HTMLInputElement);
      expect(screen.getByText('Email address')).toBeInTheDocument();
    });

    it('renders with data-slot attribute', () => {
      const { container } = render(
        <FloatingLabel label="Name">
          <FormControl />
        </FloatingLabel>
      );
      const wrapper = container.querySelector('[data-slot="floating-label"]');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toBeInstanceOf(HTMLDivElement);
    });

    it('renders the label after the control (CSS-required order)', () => {
      const { container } = render(
        <FloatingLabel label="Name" htmlFor="name">
          <FormControl id="name" />
        </FloatingLabel>
      );
      const wrapper = container.querySelector('[data-slot="floating-label"]');
      const children = Array.from(wrapper?.children ?? []);
      expect(children).toHaveLength(2);
      expect(children[0]?.tagName).toBe('INPUT');
      expect(children[1]?.tagName).toBe('LABEL');
    });

    it('renders the label as a FormLabel with form-label class', () => {
      render(
        <FloatingLabel label="Name">
          <FormControl />
        </FloatingLabel>
      );
      const label = screen.getByText('Name');
      expect(label.tagName).toBe('LABEL');
      expect(label).toHaveClass('form-label');
      expect(label).toHaveAttribute('data-slot', 'form-label');
    });

    it('supports React node label content', () => {
      render(
        <FloatingLabel
          label={
            <>
              Email <span>(required)</span>
            </>
          }
        >
          <FormControl />
        </FloatingLabel>
      );
      expect(screen.getByText('(required)')).toBeInTheDocument();
    });
  });

  describe('Placeholder Handling', () => {
    it('injects a blank placeholder when the control has none', () => {
      render(
        <FloatingLabel label="Name" htmlFor="name">
          <FormControl id="name" />
        </FloatingLabel>
      );
      const input = screen.getByLabelText('Name');
      expect(input).toHaveAttribute('placeholder', ' ');
    });

    it('preserves an existing placeholder on the control', () => {
      render(
        <FloatingLabel label="Name" htmlFor="name">
          <FormControl id="name" placeholder="Jane Doe" />
        </FloatingLabel>
      );
      const input = screen.getByLabelText('Name');
      expect(input).toHaveAttribute('placeholder', 'Jane Doe');
    });

    it('injects a blank placeholder into a Textarea child', () => {
      render(
        <FloatingLabel label="Comments" htmlFor="comments">
          <Textarea id="comments" />
        </FloatingLabel>
      );
      const textarea = screen.getByLabelText('Comments');
      expect(textarea).toBeInstanceOf(HTMLTextAreaElement);
      expect(textarea).toHaveAttribute('placeholder', ' ');
    });
  });

  describe('Control Integration', () => {
    it('works with FormControl and keeps its classes', () => {
      render(
        <FloatingLabel label="Email" htmlFor="email">
          <FormControl id="email" variant="fill" size="lg" />
        </FloatingLabel>
      );
      const input = screen.getByLabelText('Email');
      expect(input).toHaveClass('form-control-fill', 'form-control-lg');
    });

    it('works with Textarea and keeps its classes', () => {
      render(
        <FloatingLabel label="Message" htmlFor="message">
          <Textarea id="message" />
        </FloatingLabel>
      );
      const textarea = screen.getByLabelText('Message');
      expect(textarea).toHaveClass('form-control');
    });

    it('works with Select and keeps its classes', () => {
      render(
        <FloatingLabel label="Choose" htmlFor="choose">
          <Select id="choose">
            <option value="1">One</option>
            <option value="2">Two</option>
          </Select>
        </FloatingLabel>
      );
      const select = screen.getByLabelText('Choose');
      expect(select).toBeInstanceOf(HTMLSelectElement);
      expect(select).toHaveClass('form-select');
    });

    it('accepts typed input in the wrapped control', async () => {
      const user = userEvent.setup();
      render(
        <FloatingLabel label="Name" htmlFor="name">
          <FormControl id="name" />
        </FloatingLabel>
      );
      const input = screen.getByLabelText('Name');
      await user.type(input, 'Hummingbird');
      expect(input).toHaveValue('Hummingbird');
    });
  });

  describe('Class Merging', () => {
    it('always includes base form-floating class', () => {
      const { container } = render(
        <FloatingLabel label="Name">
          <FormControl />
        </FloatingLabel>
      );
      const wrapper = container.querySelector('[data-slot="floating-label"]');
      expect(wrapper).toHaveClass('form-floating');
    });

    it('merges custom className with the base class', () => {
      const { container } = render(
        <FloatingLabel label="Name" className="custom-class mb-3">
          <FormControl />
        </FloatingLabel>
      );
      const wrapper = container.querySelector('[data-slot="floating-label"]');
      expect(wrapper).toHaveClass('form-floating', 'custom-class', 'mb-3');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the wrapper div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <FloatingLabel label="Name" ref={ref}>
          <FormControl />
        </FloatingLabel>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.className).toContain('form-floating');
    });

    it('forwards ref on the wrapped control', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(
        <FloatingLabel label="Name" htmlFor="name">
          <FormControl id="name" ref={ref} />
        </FloatingLabel>
      );
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.id).toBe('name');
    });
  });

  describe('Display Name', () => {
    it('has correct display name', () => {
      expect(FloatingLabel.displayName).toBe('FloatingLabel');
    });
  });

  describe('Accessibility', () => {
    it('wires the label to the control via htmlFor and id', () => {
      render(
        <FloatingLabel label="Email address" htmlFor="floating-email">
          <FormControl id="floating-email" type="email" />
        </FloatingLabel>
      );
      const label = screen.getByText('Email address');
      const input = screen.getByLabelText('Email address');
      expect(label).toHaveAttribute('for', 'floating-email');
      expect(input).toHaveAttribute('id', 'floating-email');
    });

    it('clicking the label focuses the control', async () => {
      const user = userEvent.setup();
      render(
        <FloatingLabel label="Name" htmlFor="name">
          <FormControl id="name" />
        </FloatingLabel>
      );
      await user.click(screen.getByText('Name'));
      expect(screen.getByLabelText('Name')).toHaveFocus();
    });

    it('renders the label without a for attribute when htmlFor is omitted', () => {
      render(
        <FloatingLabel label="Name">
          <FormControl />
        </FloatingLabel>
      );
      const label = screen.getByText('Name');
      expect(label).not.toHaveAttribute('for');
    });
  });
});
