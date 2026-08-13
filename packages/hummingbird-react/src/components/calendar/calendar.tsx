'use client';

import * as React from 'react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { DayPicker, getDefaultClassNames, type DayButton, type Locale } from 'react-day-picker';

import { Button, buttonVariants } from '../button';
import { cn } from '../../utils/cn';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'text',
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('calendar', className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn(defaultClassNames.root),
        months: cn('calendar-months', defaultClassNames.months),
        month: cn('calendar-month', defaultClassNames.month),
        nav: cn('calendar-nav', defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'calendar-nav-button',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'calendar-nav-button',
          defaultClassNames.button_next
        ),
        month_caption: cn('calendar-caption', defaultClassNames.month_caption),
        dropdowns: cn('calendar-dropdowns', defaultClassNames.dropdowns),
        dropdown_root: cn('calendar-dropdown-root', defaultClassNames.dropdown_root),
        dropdown: cn('calendar-dropdown', defaultClassNames.dropdown),
        caption_label: cn(
          'calendar-caption-label',
          captionLayout !== 'label' && 'calendar-caption-dropdown',
          defaultClassNames.caption_label
        ),
        month_grid: cn('calendar-grid', defaultClassNames.month_grid),
        weekdays: cn('calendar-weekdays', defaultClassNames.weekdays),
        weekday: cn('calendar-weekday', defaultClassNames.weekday),
        week: cn('calendar-week-view', defaultClassNames.week),
        week_number_header: cn('calendar-week-number-header', defaultClassNames.week_number_header),
        week_number: cn('calendar-week-number', defaultClassNames.week_number),
        day: cn('calendar-day-view', defaultClassNames.day),
        range_start: cn('calendar-range-start', defaultClassNames.range_start),
        range_middle: cn('calendar-range-middle', defaultClassNames.range_middle),
        range_end: cn('calendar-range-end', defaultClassNames.range_end),
        today: cn('calendar-today', defaultClassNames.today),
        outside: cn('calendar-outside', defaultClassNames.outside),
        disabled: cn('calendar-disabled', defaultClassNames.disabled),
        hidden: cn('calendar-hidden', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn(className)} {...props} />;
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn(className)} {...props} />;
          }

          return <ChevronDownIcon className={cn(className)} {...props} />;
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div>{children}</div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';
function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  // the native HTML `color` attribute conflicts with Button's `color` variant prop
  color: _color,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="text"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn('calendar-day-button', defaultClassNames.day, className)}
      {...props}
    />
  );
}
CalendarDayButton.displayName = 'CalendarDayButton';
export { Calendar, CalendarDayButton };
