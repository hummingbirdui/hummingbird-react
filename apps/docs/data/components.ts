export interface Component {
  title: string;
  count: number;
  url: string;
  image: { light: string; dark: string };
}

export interface Section {
  section: string;
  items: Component[];
}

export const general: Component[] = [
  {
    title: 'Button',
    url: '/docs/components/buttons',
    count: 11,
    image: { light: '/images/components/button.svg', dark: '/images/components/button-dark.svg' },
  },
  {
    title: 'Button Group',
    url: '/docs/components/button-group',
    count: 12,
    image: { light: '/images/components/button-group.svg', dark: '/images/components/button-group-dark.svg' },
  },
  {
    title: 'Link',
    url: '/docs/components/link',
    count: 3,
    image: { light: '/images/components/link.svg', dark: '/images/components/link-dark.svg' },
  },
];

export const dataDisplay: Component[] = [
  {
    title: 'Avatar',
    url: '/docs/components/avatar',
    count: 7,
    image: { light: '/images/components/avatar.svg', dark: '/images/components/avatar-dark.svg' },
  },
  {
    title: 'Badge',
    url: '/docs/components/badge',
    count: 10,
    image: { light: '/images/components/badge.svg', dark: '/images/components/badge-dark.svg' },
  },
  {
    title: 'Card',
    url: '/docs/components/card',
    count: 6,
    image: { light: '/images/components/card.svg', dark: '/images/components/card-dark.svg' },
  },
  {
    title: 'List Group',
    url: '/docs/components/list-group',
    count: 10,
    image: { light: '/images/components/list-group.svg', dark: '/images/components/list-group-dark.svg' },
  },
  {
    title: 'Table',
    url: '/docs/components/table',
    count: 13,
    image: { light: '/images/components/table.svg', dark: '/images/components/table-dark.svg' },
  },
  {
    title: 'Tooltip',
    url: '/docs/components/tooltip',
    count: 4,
    image: { light: '/images/components/tooltip.svg', dark: '/images/components/tooltip-dark.svg' },
  },
];

export const dataEntry: Component[] = [
  {
    title: 'Checkbox',
    url: '/docs/forms/checkbox',
    count: 6,
    image: { light: '/images/components/checkbox.svg', dark: '/images/components/checkbox-dark.svg' },
  },
  {
    title: 'File Input',
    url: '/docs/components/file-input',
    count: 7,
    image: { light: '/images/components/file-input.svg', dark: '/images/components/file-input-dark.svg' },
  },
  {
    title: 'Floating labels',
    url: '/docs/components/floating-labels',
    count: 8,
    image: { light: '/images/components/floating-labels.svg', dark: '/images/components/floating-labels-dark.svg' },
  },
  {
    title: 'Form controls',
    url: '/docs/components/form-control',
    count: 8,
    image: { light: '/images/components/form-controls.svg', dark: '/images/components/form-controls-dark.svg' },
  },
  {
    title: 'Input Group',
    url: '/docs/components/input-group',
    count: 12,
    image: { light: '/images/components/input-group.svg', dark: '/images/components/input-group-dark.svg' },
  },
  {
    title: 'Radio',
    url: '/docs/components/radio',
    count: 6,
    image: { light: '/images/components/radio.svg', dark: '/images/components/radio-dark.svg' },
  },
  {
    title: 'Range',
    url: '/docs/components/range',
    count: 6,
    image: { light: '/images/components/range.svg', dark: '/images/components/range-dark.svg' },
  },
  {
    title: 'Select',
    url: '/docs/components/select',
    count: 6,
    image: { light: '/images/components/select.svg', dark: '/images/components/select-dark.svg' },
  },
  {
    title: 'Switch',
    url: '/docs/components/switch',
    count: 4,
    image: { light: '/images/components/switch.svg', dark: '/images/components/switch-dark.svg' },
  },
];

export const feedback: Component[] = [
  {
    title: 'Alert',
    url: '/docs/components/alert',
    count: 6,
    image: { light: '/images/components/alert.svg', dark: '/images/components/alert-dark.svg' },
  },
  {
    title: 'Modal',
    url: '/docs/components/modal',
    count: 8,
    image: { light: '/images/components/modal.svg', dark: '/images/components/modal-dark.svg' },
  },
];

export const navigation: Component[] = [
  {
    title: 'Accordion',
    url: '/docs/components/accordion',
    count: 2,
    image: { light: '/images/components/accordion.svg', dark: '/images/components/accordion-dark.svg' },
  },
  {
    title: 'Breadcrumb',
    url: '/docs/components/breadcrumb',
    count: 5,
    image: { light: '/images/components/breadcrumb.svg', dark: '/images/components/breadcrumb-dark.svg' },
  },
  // {
  //   title: 'Carousel',
  //   url: '/docs/components/carousel',
  //   count: 9,
  //   image: { light: '/images/components/carousel.svg', dark: '/images/components/carousel-dark.svg' },
  // },
  {
    title: 'Collapse',
    url: '/docs/components/collapsible',
    count: 3,
    image: { light: '/images/components/collapse.svg', dark: '/images/components/collapse-dark.svg' },
  },
  {
    title: 'Dropdown',
    url: '/docs/components/dropdowns',
    count: 15,
    image: { light: '/images/components/dropdown.svg', dark: '/images/components/dropdown-dark.svg' },
  },
  {
    title: 'Navs & Tabs',
    url: '/docs/components/navs-tabs',
    count: 7,
    image: { light: '/images/components/navs-tabs.svg', dark: '/images/components/navs-tabs-dark.svg' },
  },
  {
    title: 'Navbar',
    url: '/docs/components/navbar',
    count: 11,
    image: { light: '/images/components/navbar.svg', dark: '/images/components/navbar-dark.svg' },
  },
  {
    title: 'Offcanvas',
    url: '/docs/components/offcanvas',
    count: 7,
    image: { light: '/images/components/offcanvas.svg', dark: '/images/components/offcanvas-dark.svg' },
  },
];

export const components = [...dataDisplay, ...dataEntry, ...feedback, ...navigation].sort((a, b) =>
  a.title.localeCompare(b.title),
);