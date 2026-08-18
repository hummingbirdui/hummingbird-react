'use client';

import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { File as FileIcon, X as XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatBytes } from '../../utils/format-bytes';

interface FileUploaderContextValue {
  files: File[];
  removeFile: (file: File) => void;
  open: () => void;
  getRootProps: ReturnType<typeof useDropzone>['getRootProps'];
  getInputProps: ReturnType<typeof useDropzone>['getInputProps'];
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  disabled: boolean;
}

const FileUploaderContext = React.createContext<FileUploaderContextValue | null>(null);

function useFileUploaderContext(part: string): FileUploaderContextValue {
  const context = React.useContext(FileUploaderContext);
  if (!context) {
    throw new Error(`FileUploader.${part} must be used within a FileUploader`);
  }
  return context;
}

const FileUploaderItemContext = React.createContext<File | null>(null);

function useFileUploaderItemContext(part: string): File {
  const file = React.useContext(FileUploaderItemContext);
  if (!file) {
    throw new Error(`FileUploader.${part} must be used within a FileUploader.Item`);
  }
  return file;
}

/** Creates an object URL for image files, revoked automatically on cleanup. */
function useObjectUrl(file: File | null): string | null {
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!file || !file.type.startsWith('image/')) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return url;
}

export interface FileUploaderProps
  extends Omit<React.ComponentProps<'div'>, 'onDrop' | 'onError'>,
    Pick<
      DropzoneOptions,
      | 'accept'
      | 'minSize'
      | 'maxSize'
      | 'maxFiles'
      | 'multiple'
      | 'disabled'
      | 'noClick'
      | 'noDrag'
      | 'noKeyboard'
      | 'validator'
      | 'onDrop'
      | 'onDropAccepted'
      | 'onDropRejected'
      | 'onError'
      | 'onFileDialogOpen'
      | 'onFileDialogCancel'
    > {
  /** The controlled list of selected files. Must be used with `onFilesChange`. */
  files?: File[];
  /** The initially selected files when uncontrolled. */
  defaultFiles?: File[];
  /** Event handler called when the list of selected files changes. */
  onFilesChange?: (files: File[]) => void;
}

function FileUploaderRoot({
  className,
  children,
  files: filesProp,
  defaultFiles,
  onFilesChange,
  accept,
  minSize,
  maxSize,
  maxFiles,
  multiple,
  disabled = false,
  noClick,
  noDrag,
  noKeyboard,
  validator,
  onDrop,
  onDropAccepted,
  onDropRejected,
  onError,
  onFileDialogOpen,
  onFileDialogCancel,
  ...props
}: FileUploaderProps) {
  const [internalFiles, setInternalFiles] = React.useState<File[]>(defaultFiles ?? []);
  const isControlled = filesProp !== undefined;
  const files = isControlled ? filesProp : internalFiles;

  const filesRef = React.useRef(files);
  filesRef.current = files;

  const setFiles = React.useCallback(
    (next: File[]) => {
      if (!isControlled) setInternalFiles(next);
      onFilesChange?.(next);
    },
    [isControlled, onFilesChange]
  );

  const single = maxFiles === 1 || multiple === false;

  const handleDropAccepted = React.useCallback<NonNullable<DropzoneOptions['onDropAccepted']>>(
    (accepted, event) => {
      const current = filesRef.current;
      let next: File[];
      if (single) {
        next = accepted.slice(-1);
      } else if (typeof maxFiles === 'number' && maxFiles > 0) {
        next = [...current, ...accepted].slice(0, maxFiles);
      } else {
        next = [...current, ...accepted];
      }
      setFiles(next);
      onDropAccepted?.(accepted, event);
    },
    [single, maxFiles, setFiles, onDropAccepted]
  );

  const dropzone = useDropzone({
    accept,
    minSize,
    maxSize,
    maxFiles,
    multiple: multiple ?? maxFiles !== 1,
    disabled,
    noClick,
    noDrag,
    noKeyboard,
    validator,
    onDrop,
    onDropAccepted: handleDropAccepted,
    onDropRejected,
    onError,
    onFileDialogOpen,
    onFileDialogCancel,
  });

  const removeFile = React.useCallback(
    (file: File) => setFiles(filesRef.current.filter((f) => f !== file)),
    [setFiles]
  );

  const context = React.useMemo<FileUploaderContextValue>(
    () => ({
      files,
      removeFile,
      open: dropzone.open,
      getRootProps: dropzone.getRootProps,
      getInputProps: dropzone.getInputProps,
      isDragActive: dropzone.isDragActive,
      isDragAccept: dropzone.isDragAccept,
      isDragReject: dropzone.isDragReject,
      disabled,
    }),
    [
      files,
      removeFile,
      dropzone.open,
      dropzone.getRootProps,
      dropzone.getInputProps,
      dropzone.isDragActive,
      dropzone.isDragAccept,
      dropzone.isDragReject,
      disabled,
    ]
  );

  return (
    <FileUploaderContext.Provider value={context}>
      <div data-slot="file-uploader" className={className} {...props}>
        {children}
      </div>
    </FileUploaderContext.Provider>
  );
}
FileUploaderRoot.displayName = 'FileUploader';

const fileUploaderDropzoneVariants = cva('file-uploader', {
  variants: {
    variant: {
      default: '',
      avatar: 'file-uploader-avatar',
      box: 'file-uploader-box',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface FileUploaderDropzoneProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof fileUploaderDropzoneVariants> {}

function FileUploaderDropzone({
  className,
  variant,
  children,
  ...props
}: FileUploaderDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, disabled, files } =
    useFileUploaderContext('Dropzone');

  const avatarFile = variant === 'avatar' ? (files[0] ?? null) : null;
  const avatarUrl = useObjectUrl(avatarFile);
  const filled = variant === 'avatar' && files.length > 0;

  return (
    <div
      {...getRootProps({
        ...props,
        className: cn(fileUploaderDropzoneVariants({ variant }), className),
      })}
      data-slot="file-uploader-dropzone"
      data-drag-active={isDragActive ? '' : undefined}
      data-drag-reject={isDragReject ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-filled={filled ? '' : undefined}
    >
      <input {...getInputProps()} />
      {avatarUrl ? (
        <img
          className="file-uploader-avatar-image"
          src={avatarUrl}
          alt={avatarFile?.name ?? 'Selected file'}
        />
      ) : null}
      {children}
    </div>
  );
}
FileUploaderDropzone.displayName = 'FileUploader.Dropzone';

function FileUploaderMessage({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="file-uploader-message"
      className={cn('file-uploader-message', className)}
      {...props}
    />
  );
}
FileUploaderMessage.displayName = 'FileUploader.Message';

interface FileUploaderPreviewBaseProps extends Omit<React.ComponentProps<'div'>, 'children'> {
  /** Custom rendering for each selected file. Defaults to image, info, and remove parts. */
  renderItem?: (file: File, index: number) => React.ReactNode;
  /** Extra content rendered after the file previews (e.g. a box dropzone). */
  children?: React.ReactNode;
}

function defaultRenderItem(file: File, index: number) {
  return (
    <FileUploaderItem key={`${file.name}-${file.lastModified}-${index}`} file={file}>
      <FileUploaderItemImage />
      <FileUploaderItemInfo />
      <FileUploaderItemRemove />
    </FileUploaderItem>
  );
}

function defaultRenderThumbnail(file: File, index: number) {
  return (
    <FileUploaderItem key={`${file.name}-${file.lastModified}-${index}`} file={file}>
      <FileUploaderItemImage />
      <FileUploaderItemRemove />
    </FileUploaderItem>
  );
}

export interface FileUploaderListProps extends FileUploaderPreviewBaseProps {}

function FileUploaderList({ className, renderItem, children, ...props }: FileUploaderListProps) {
  const { files } = useFileUploaderContext('List');
  return (
    <div
      data-slot="file-uploader-list"
      className={cn('file-uploader-list', className)}
      {...props}
    >
      {files.map((file, index) => (renderItem ?? defaultRenderItem)(file, index))}
      {children}
    </div>
  );
}
FileUploaderList.displayName = 'FileUploader.List';

export interface FileUploaderThumbnailsProps extends FileUploaderPreviewBaseProps {
  /** Renders the dropbox layout, where a box dropzone sits inline with the thumbnails. */
  dropbox?: boolean;
}

function FileUploaderThumbnails({
  className,
  renderItem,
  dropbox = false,
  children,
  ...props
}: FileUploaderThumbnailsProps) {
  const { files } = useFileUploaderContext('Thumbnails');
  return (
    <div
      data-slot="file-uploader-thumbnails"
      className={cn('file-uploader-thumbnails', dropbox && 'file-uploader-dropbox', className)}
      {...props}
    >
      {files.map((file, index) => (renderItem ?? defaultRenderThumbnail)(file, index))}
      {children}
    </div>
  );
}
FileUploaderThumbnails.displayName = 'FileUploader.Thumbnails';

export interface FileUploaderItemProps extends React.ComponentProps<'div'> {
  /** The file this item represents. */
  file: File;
}

function FileUploaderItem({ className, file, children, ...props }: FileUploaderItemProps) {
  return (
    <FileUploaderItemContext.Provider value={file}>
      <div
        data-slot="file-uploader-item"
        className={cn('file-uploader-item', className)}
        {...props}
      >
        {children}
      </div>
    </FileUploaderItemContext.Provider>
  );
}
FileUploaderItem.displayName = 'FileUploader.Item';

function FileUploaderItemImage({ className, children, ...props }: React.ComponentProps<'div'>) {
  const file = useFileUploaderItemContext('ItemImage');
  const url = useObjectUrl(file);
  return (
    <div
      data-slot="file-uploader-item-image"
      className={cn('file-uploader-item-image', className)}
      {...props}
    >
      {children ??
        (url ? (
          <img src={url} alt={file.name} />
        ) : (
          <FileIcon className="size-6 text-muted" aria-hidden="true" />
        ))}
    </div>
  );
}
FileUploaderItemImage.displayName = 'FileUploader.ItemImage';

function FileUploaderItemInfo({ className, children, ...props }: React.ComponentProps<'div'>) {
  const file = useFileUploaderItemContext('ItemInfo');
  return (
    <div
      data-slot="file-uploader-item-info"
      className={cn('file-uploader-item-info', className)}
      {...props}
    >
      {children ?? (
        <>
          <span className="truncate">{file.name}</span>
          <span className="text-xs text-muted">{formatBytes(file.size)}</span>
        </>
      )}
    </div>
  );
}
FileUploaderItemInfo.displayName = 'FileUploader.ItemInfo';

export interface FileUploaderItemRemoveProps extends React.ComponentProps<'button'> {
  /** Render as a child element (e.g. a Button). Uses Radix Slot. */
  asChild?: boolean;
}

function FileUploaderItemRemove({
  className,
  asChild = false,
  onClick,
  children,
  ...props
}: FileUploaderItemRemoveProps) {
  const file = useFileUploaderItemContext('ItemRemove');
  const { removeFile } = useFileUploaderContext('ItemRemove');
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="file-uploader-item-remove"
      aria-label={`Remove ${file.name}`}
      {...(asChild ? {} : { type: 'button' as const })}
      className={cn('file-uploader-item-remove', className)}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) removeFile(file);
      }}
      {...props}
    >
      {asChild ? children : (children ?? <XIcon aria-hidden="true" />)}
    </Comp>
  );
}
FileUploaderItemRemove.displayName = 'FileUploader.ItemRemove';

const FileUploader = /* @__PURE__ */ Object.assign(FileUploaderRoot, {
  Dropzone: FileUploaderDropzone,
  Message: FileUploaderMessage,
  List: FileUploaderList,
  Thumbnails: FileUploaderThumbnails,
  Item: FileUploaderItem,
  ItemImage: FileUploaderItemImage,
  ItemInfo: FileUploaderItemInfo,
  ItemRemove: FileUploaderItemRemove,
});

namespace FileUploader {
  export type Props = React.ComponentProps<typeof FileUploaderRoot>;
  export type DropzoneProps = React.ComponentProps<typeof FileUploaderDropzone>;
  export type MessageProps = React.ComponentProps<typeof FileUploaderMessage>;
  export type ListProps = React.ComponentProps<typeof FileUploaderList>;
  export type ThumbnailsProps = React.ComponentProps<typeof FileUploaderThumbnails>;
  export type ItemProps = React.ComponentProps<typeof FileUploaderItem>;
  export type ItemImageProps = React.ComponentProps<typeof FileUploaderItemImage>;
  export type ItemInfoProps = React.ComponentProps<typeof FileUploaderItemInfo>;
  export type ItemRemoveProps = React.ComponentProps<typeof FileUploaderItemRemove>;
}

export { FileUploader, fileUploaderDropzoneVariants };
