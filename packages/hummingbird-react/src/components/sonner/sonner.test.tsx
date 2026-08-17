import * as React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, act, cleanup } from '@testing-library/react';
import { Toaster, toast } from './sonner';

afterEach(() => {
  act(() => {
    toast.dismiss();
  });
  cleanup();
});

describe('Toaster', () => {
  describe('Rendering', () => {
    it('renders the notifications region', () => {
      render(<Toaster />);
      expect(
        screen.getByLabelText(/notifications/i, { selector: 'section' })
      ).toBeInTheDocument();
    });

    it('applies the Hummingbird token overrides as style variables', async () => {
      render(<Toaster />);
      act(() => {
        toast('Styled toast');
      });
      await screen.findByText('Styled toast');
      const list = document.querySelector('[data-sonner-toaster]') as HTMLElement;
      expect(list).toBeInTheDocument();
      expect(list.style.getPropertyValue('--normal-bg')).toBe(
        'var(--background-color-subtle)'
      );
      expect(list.style.getPropertyValue('--normal-text')).toBe(
        'var(--text-color-default)'
      );
      expect(list.style.getPropertyValue('--normal-border')).toBe(
        'var(--border-color-default)'
      );
      expect(list.style.getPropertyValue('--border-radius')).toBe(
        'var(--radius-lg)'
      );
    });

    it('allows consumer style variables to override the defaults', async () => {
      render(
        <Toaster style={{ '--normal-bg': 'red' } as React.CSSProperties} />
      );
      act(() => {
        toast('Override toast');
      });
      await screen.findByText('Override toast');
      const list = document.querySelector('[data-sonner-toaster]') as HTMLElement;
      expect(list.style.getPropertyValue('--normal-bg')).toBe('red');
      expect(list.style.getPropertyValue('--border-radius')).toBe(
        'var(--radius-lg)'
      );
    });

    it('forwards props to the sonner toaster', async () => {
      render(<Toaster position="bottom-center" className="custom-toaster" />);
      act(() => {
        toast('Forwarded toast');
      });
      await screen.findByText('Forwarded toast');
      const list = document.querySelector('[data-sonner-toaster]') as HTMLElement;
      expect(list).toHaveAttribute('data-x-position', 'center');
      expect(list).toHaveAttribute('data-y-position', 'bottom');
      expect(list).toHaveClass('custom-toaster');
    });
  });

  describe('toast function', () => {
    it('renders a toast fired with toast()', async () => {
      render(<Toaster />);
      act(() => {
        toast('Event has been created');
      });
      expect(await screen.findByText('Event has been created')).toBeInTheDocument();
    });

    it('renders a description', async () => {
      render(<Toaster />);
      act(() => {
        toast('Event has been created', {
          description: 'Sunday, December 03, 2023 at 9:00 AM',
        });
      });
      expect(
        await screen.findByText('Sunday, December 03, 2023 at 9:00 AM')
      ).toBeInTheDocument();
    });

    it('renders typed toasts with their data-type', async () => {
      render(<Toaster />);
      act(() => {
        toast.success('Changes saved');
      });
      await screen.findByText('Changes saved');
      expect(document.querySelector('[data-sonner-toast]')).toHaveAttribute(
        'data-type',
        'success'
      );
    });

    it('renders fully custom markup with toast.custom', async () => {
      render(<Toaster />);
      act(() => {
        toast.custom(() => (
          <div className="toast show">
            <div className="toast-body">Custom toast markup</div>
          </div>
        ));
      });
      expect(await screen.findByText('Custom toast markup')).toBeInTheDocument();
    });
  });

  describe('Display Name', () => {
    it('has the correct display name', () => {
      expect(Toaster.displayName).toBe('Toaster');
    });
  });
});
