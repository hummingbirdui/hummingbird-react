import Accordion from '@/components/svg-images/Accordion';
import AdvancedRange from '@/components/svg-images/AdvancedRange';
import AdvancedSelect from '@/components/svg-images/AdvancedSelect';
import Alert from '@/components/svg-images/Alert';
import Avatar from '@/components/svg-images/Avatar';
import Badge from '@/components/svg-images/Badge';
import Breadcrumb from '@/components/svg-images/Breadcrumb';
import ButtonGroup from '@/components/svg-images/ButtonGroup';
import Card from '@/components/svg-images/Card';
import Carousel from '@/components/svg-images/Carousel';
import Checkbox from '@/components/svg-images/Checkbox';
import CloseButton from '@/components/svg-images/CloseButton';
import Collapse from '@/components/svg-images/Collapse';
import CustomScrollbar from '@/components/svg-images/CustomScrollbar';
import Divider from '@/components/svg-images/Divider';
import Dropdown from '@/components/svg-images/Dropdown';
import Dtp from '@/components/svg-images/Dtp';
import FileInput from '@/components/svg-images/FileInput';
import FloatingLabels from '@/components/svg-images/FloatingLabels';
import FormControls from '@/components/svg-images/FormControls';
import InputGroup from '@/components/svg-images/InputGroup';
import Link from '@/components/svg-images/Link';
import ListGroup from '@/components/svg-images/ListGroup';
import Loader from '@/components/svg-images/Loader';
import Modal from '@/components/svg-images/Modal';
import Navbar from '@/components/svg-images/Navbar';
import NavsTabs from '@/components/svg-images/NavsTabs';
import Offcanvas from '@/components/svg-images/Offcanvas';
import Pagination from '@/components/svg-images/Pagination';
import Placeholder from '@/components/svg-images/Placeholder';
import Popover from '@/components/svg-images/Popover';
import Progress from '@/components/svg-images/Progress';
import Radio from '@/components/svg-images/Radio';
import Range from '@/components/svg-images/Range';
import Scrollspy from '@/components/svg-images/Scrollspy';
import Select from '@/components/svg-images/Select';
import Switch from '@/components/svg-images/Switch';
import Table from '@/components/svg-images/Table';
import Toast from '@/components/svg-images/Toast';
import Tooltip from '@/components/svg-images/Tooltip';
import Uploader from '@/components/svg-images/Uploader';
import Validation from '@/components/svg-images/Validation';
import Video from '@/components/svg-images/Video';

import Button from '@/components/svg-images/Button';
export interface Component {
  title: string;
  count: number;
  url: string;
  imgComponent: any;
}

export interface Section {
  section: string;
  items: Component[];
}

export const general: Component[] = [
  {
    title: 'Buttons',
    url: '/docs/components/buttons',
    count: 15,
    imgComponent: Button,
  },
  {
    title: 'Button Group',
    url: '/docs/components/button-group',
    count: 12,
    imgComponent: ButtonGroup,
  },
  {
    title: 'Close Button',
    url: '/docs/components/close-button',
    count: 3,
    imgComponent: CloseButton,
  },
  {
    title: 'Link',
    url: '/docs/components/link',
    count: 3,
    imgComponent: Link,
  },
];

export const dataDisplay: Component[] = [
  {
    title: 'Avatars',
    url: '/docs/components/avatars',
    count: 10,
    imgComponent: Avatar,
  },
  {
    title: 'Badges',
    url: '/docs/components/badges',
    count: 10,
    imgComponent: Badge,
  },
  {
    title: 'Card',
    url: '/docs/components/card',
    count: 10,
    imgComponent: Card,
  },
  {
    title: 'List Group',
    url: '/docs/components/list-group',
    count: 10,
    imgComponent: ListGroup,
  },
  {
    title: 'Tables',
    url: '/docs/components/tables',
    count: 13,
    imgComponent: Table,
  },
  {
    title: 'Tooltips',
    url: '/docs/components/tooltips',
    count: 4,
    imgComponent: Tooltip,
  },
  {
    title: 'Video',
    url: '/docs/components/video',
    count: 6,
    imgComponent: Video,
  },
];

export const dataEntry: Component[] = [
  {
    title: 'Advanced Range',
    url: '/docs/forms/advanced-forms/advanced-range',
    count: 9,
    imgComponent: AdvancedRange,
  },
  {
    title: 'Advanced Select',
    url: '/docs/forms/advanced-forms/advanced-select',
    count: 7,
    imgComponent: AdvancedSelect,
  },
  {
    title: 'Checkbox',
    url: '/docs/forms/checkbox',
    count: 6,
    imgComponent: Checkbox,
  },
  {
    title: 'Date & Time Pickers',
    url: '/docs/forms/advanced-forms/date-time-picker',
    count: 10,
    imgComponent: Dtp,
  },
  {
    title: 'File Input',
    url: '/docs/forms/file-input',
    count: 7,
    imgComponent: FileInput,
  },
  {
    title: 'Floating labels',
    url: '/docs/forms/floating-labels',
    count: 8,
    imgComponent: FloatingLabels,
  },
  {
    title: 'Form Controls',
    url: '/docs/forms/form-control',
    count: 8,
    imgComponent: FormControls,
  },
  {
    title: 'Form Validation',
    url: '/docs/forms/validation',
    count: 5,
    imgComponent: Validation,
  },
  {
    title: 'Input Group',
    url: '/docs/forms/input-group',
    count: 12,
    imgComponent: InputGroup,
  },
  {
    title: 'Radio',
    url: '/docs/forms/radio',
    count: 6,
    imgComponent: Radio,
  },
  {
    title: 'Range',
    url: '/docs/forms/range',
    count: 6,
    imgComponent: Range,
  },
  {
    title: 'Select',
    url: '/docs/forms/select',
    count: 6,
    imgComponent: Select,
  },
  {
    title: 'Switch',
    url: '/docs/forms/switch',
    count: 4,
    imgComponent: Switch,
  },
  {
    title: 'File Uploader',
    url: '/docs/forms/advanced-forms/file-uploader',
    count: 5,
    imgComponent: Uploader,
  },
];

export const feedback: Component[] = [
  {
    title: 'Alerts',
    url: '/docs/components/alerts',
    count: 6,
    imgComponent: Alert,
  },
  {
    title: 'Modal',
    url: '/docs/components/modal',
    count: 7,
    imgComponent: Modal,
  },
  {
    title: 'Placeholders',
    url: '/docs/components/placeholders',
    count: 6,
    imgComponent: Placeholder,
  },
  {
    title: 'Popovers',
    url: '/docs/components/popovers',
    count: 7,
    imgComponent: Popover,
  },
  {
    title: 'Progress',
    url: '/docs/components/progress',
    count: 9,
    imgComponent: Progress,
  },
  {
    title: 'Loaders',
    url: '/docs/components/loaders',
    count: 5,
    imgComponent: Loader,
  },
  {
    title: 'Toasts',
    url: '/docs/components/toasts',
    count: 8,
    imgComponent: Toast,
  },
];

export const navigation: Component[] = [
  {
    title: 'Accordion',
    url: '/docs/components/accordion',
    count: 2,
    imgComponent: Accordion,
  },
  {
    title: 'Breadcrumb',
    url: '/docs/components/breadcrumb',
    count: 5,
    imgComponent: Breadcrumb,
  },
  {
    title: 'Carousel',
    url: '/docs/components/carousel',
    count: 9,
    imgComponent: Carousel,
  },
  {
    title: 'Collapse',
    url: '/docs/components/collapse',
    count: 3,
    imgComponent: Collapse,
  },
  {
    title: 'Dropdowns',
    url: '/docs/components/dropdowns',
    count: 15,
    imgComponent: Dropdown,
  },
  {
    title: 'Navs & Tabs',
    url: '/docs/components/navs-tabs',
    count: 7,
    imgComponent: NavsTabs,
  },
  {
    title: 'Navbar',
    url: '/docs/components/navbar',
    count: 11,
    imgComponent: Navbar,
  },
  {
    title: 'Offcanvas',
    url: '/docs/components/offcanvas',
    count: 7,
    imgComponent: Offcanvas,
  },
  {
    title: 'Pagination',
    url: '/docs/components/pagination',
    count: 10,
    imgComponent: Pagination,
  },
  {
    title: 'Scrollspy',
    url: '/docs/components/scrollspy',
    count: 4,
    imgComponent: Scrollspy,
  },
];

export const layout: Component[] = [
  {
    title: 'Custom Scrollbar',
    url: '/docs/components/custom-scrollbar',
    count: 4,
    imgComponent: CustomScrollbar,
  },
  {
    title: 'Divider',
    url: '/docs/components/divider',
    count: 5,
    imgComponent: Divider,
  },
];

export const components: Component[] = [
  {
    title: 'Accordion',
    url: '/docs/components/accordion',
    count: 2,
    imgComponent: Accordion,
  },
  {
    title: 'Alerts',
    url: '/docs/components/alerts',
    count: 6,
    imgComponent: Alert,
  },
  {
    title: 'Avatars',
    url: '/docs/components/avatars',
    count: 10,
    imgComponent: Avatar,
  },
  {
    title: 'Buttons',
    url: '/docs/components/buttons',
    count: 15,
    imgComponent: Button,
  },
  {
    title: 'Carousel',
    url: '/docs/components/carousel',
    count: 9,
    imgComponent: Carousel,
  },
  {
    title: 'Checkbox',
    url: '/docs/forms/checkbox',
    count: 6,
    imgComponent: Checkbox,
  },
  {
    title: 'Dropdowns',
    url: '/docs/components/dropdowns',
    count: 15,
    imgComponent: Dropdown,
  },
  {
    title: 'Form Controls',
    url: '/docs/forms/form-control',
    count: 8,
    imgComponent: FormControls,
  },
  {
    title: 'Range',
    url: '/docs/forms/range',
    count: 6,
    imgComponent: Range,
  },
];