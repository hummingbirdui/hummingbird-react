import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUploader, fileUploaderDropzoneVariants } from './file-uploader';
import { formatBytes } from '../../utils/format-bytes';

function makeFile(name: string, size = 1024, type = 'text/plain'): File {
  const file = new File(['a'.repeat(size)], name, { type });
  return file;
}

function makeDataTransfer(files: File[]) {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  };
}

function renderUploader(
  rootProps: Partial<FileUploader.Props> = {},
  previews: React.ReactNode = <FileUploader.List data-testid="list" />
) {
  return render(
    <FileUploader {...rootProps}>
      <FileUploader.Dropzone data-testid="dropzone">
        <FileUploader.Message>
          <p>Drop files here or browse from device</p>
        </FileUploader.Message>
      </FileUploader.Dropzone>
      {previews}
    </FileUploader>
  );
}

async function dropFiles(dropzone: HTMLElement, files: File[]) {
  fireEvent.drop(dropzone, makeDataTransfer(files));
  await waitFor(() => {
    expect(document.querySelectorAll('[data-slot="file-uploader-item"]').length).toBeGreaterThan(0);
  });
}

describe('FileUploader', () => {
  describe('Rendering', () => {
    it('renders the dropzone with the file-uploader class and a hidden file input', () => {
      renderUploader();
      const dropzone = screen.getByTestId('dropzone');
      expect(dropzone).toHaveClass('file-uploader');
      const input = dropzone.querySelector('input[type="file"]');
      expect(input).toBeInTheDocument();
    });

    it('renders the message content', () => {
      renderUploader();
      const message = document.querySelector('[data-slot="file-uploader-message"]');
      expect(message).toHaveClass('file-uploader-message');
      expect(screen.getByText(/drop files here/i)).toBeInTheDocument();
    });

    it('passes accept and multiple to the input', () => {
      renderUploader({ accept: { 'image/*': [] } });
      const input = screen.getByTestId('dropzone').querySelector('input')!;
      expect(input).toHaveAttribute('accept', 'image/*');
      expect(input).toHaveAttribute('multiple');
    });

    it('is single-file when maxFiles is 1', () => {
      renderUploader({ maxFiles: 1 });
      const input = screen.getByTestId('dropzone').querySelector('input')!;
      expect(input).not.toHaveAttribute('multiple');
    });
  });

  describe('Variants', () => {
    it('applies the avatar variant class', () => {
      render(
        <FileUploader>
          <FileUploader.Dropzone data-testid="dropzone" variant="avatar" />
        </FileUploader>
      );
      expect(screen.getByTestId('dropzone')).toHaveClass('file-uploader', 'file-uploader-avatar');
    });

    it('applies the box variant class', () => {
      render(
        <FileUploader>
          <FileUploader.Dropzone data-testid="dropzone" variant="box" />
        </FileUploader>
      );
      expect(screen.getByTestId('dropzone')).toHaveClass('file-uploader', 'file-uploader-box');
    });

    it('applies the dropbox modifier on thumbnails', () => {
      render(
        <FileUploader>
          <FileUploader.Thumbnails data-testid="thumbs" dropbox />
        </FileUploader>
      );
      expect(screen.getByTestId('thumbs')).toHaveClass(
        'file-uploader-thumbnails',
        'file-uploader-dropbox'
      );
    });
  });

  describe('Dropping files', () => {
    it('adds dropped files to the list with name and size', async () => {
      renderUploader();
      await dropFiles(screen.getByTestId('dropzone'), [makeFile('report.pdf', 2048)]);
      expect(screen.getByText('report.pdf')).toBeInTheDocument();
      expect(screen.getByText(formatBytes(2048))).toBeInTheDocument();
    });

    it('appends files across multiple drops', async () => {
      renderUploader();
      const dropzone = screen.getByTestId('dropzone');
      await dropFiles(dropzone, [makeFile('one.txt')]);
      await dropFiles(dropzone, [makeFile('two.txt')]);
      await waitFor(() => {
        expect(document.querySelectorAll('[data-slot="file-uploader-item"]')).toHaveLength(2);
      });
    });

    it('replaces the file when maxFiles is 1', async () => {
      renderUploader({ maxFiles: 1 });
      const dropzone = screen.getByTestId('dropzone');
      await dropFiles(dropzone, [makeFile('first.txt')]);
      await dropFiles(dropzone, [makeFile('second.txt')]);
      await waitFor(() => {
        expect(screen.queryByText('first.txt')).not.toBeInTheDocument();
        expect(screen.getByText('second.txt')).toBeInTheDocument();
      });
      expect(document.querySelectorAll('[data-slot="file-uploader-item"]')).toHaveLength(1);
    });

    it('caps the list at maxFiles across drops', async () => {
      renderUploader({ maxFiles: 2 });
      const dropzone = screen.getByTestId('dropzone');
      await dropFiles(dropzone, [makeFile('one.txt'), makeFile('two.txt')]);
      fireEvent.drop(dropzone, makeDataTransfer([makeFile('three.txt')]));
      await waitFor(() => {
        expect(document.querySelectorAll('[data-slot="file-uploader-item"]')).toHaveLength(2);
      });
      expect(screen.queryByText('three.txt')).not.toBeInTheDocument();
    });

    it('calls onFilesChange with the new list', async () => {
      const onFilesChange = vi.fn();
      renderUploader({ onFilesChange });
      await dropFiles(screen.getByTestId('dropzone'), [makeFile('doc.txt')]);
      expect(onFilesChange).toHaveBeenCalledTimes(1);
      expect(onFilesChange.mock.calls[0][0].map((f: File) => f.name)).toEqual(['doc.txt']);
    });

    it('supports a controlled files list', async () => {
      const files = [makeFile('controlled.txt')];
      render(
        <FileUploader files={files} onFilesChange={() => {}}>
          <FileUploader.Dropzone data-testid="dropzone" />
          <FileUploader.List />
        </FileUploader>
      );
      expect(screen.getByText('controlled.txt')).toBeInTheDocument();
    });

    it('rejects files that fail accept and calls onDropRejected', async () => {
      const onDropRejected = vi.fn();
      renderUploader({ accept: { 'image/*': [] }, onDropRejected });
      fireEvent.drop(screen.getByTestId('dropzone'), makeDataTransfer([makeFile('notes.txt')]));
      await waitFor(() => {
        expect(onDropRejected).toHaveBeenCalledTimes(1);
      });
      expect(document.querySelectorAll('[data-slot="file-uploader-item"]')).toHaveLength(0);
    });
  });

  describe('Removing files', () => {
    it('removes a file with the default remove button', async () => {
      const user = userEvent.setup();
      renderUploader();
      await dropFiles(screen.getByTestId('dropzone'), [makeFile('junk.txt')]);
      await user.click(screen.getByRole('button', { name: /remove junk\.txt/i }));
      await waitFor(() => {
        expect(screen.queryByText('junk.txt')).not.toBeInTheDocument();
      });
    });
  });

  describe('Disabled', () => {
    it('sets data-disabled and removes the dropzone from the tab order', () => {
      renderUploader({ disabled: true });
      const dropzone = screen.getByTestId('dropzone');
      expect(dropzone).toHaveAttribute('data-disabled');
      expect(dropzone).not.toHaveAttribute('tabindex');
    });
  });

  describe('Drag state', () => {
    it('sets data-drag-active while dragging over', async () => {
      renderUploader();
      const dropzone = screen.getByTestId('dropzone');
      fireEvent.dragEnter(dropzone, makeDataTransfer([makeFile('img.png', 100, 'image/png')]));
      await waitFor(() => {
        expect(dropzone).toHaveAttribute('data-drag-active');
      });
      fireEvent.dragLeave(dropzone, makeDataTransfer([]));
      await waitFor(() => {
        expect(dropzone).not.toHaveAttribute('data-drag-active');
      });
    });
  });

  describe('Custom rendering', () => {
    it('uses renderItem for custom previews', async () => {
      renderUploader(
        {},
        <FileUploader.List
          renderItem={(file) => (
            <div key={file.name} data-testid="custom-item">
              {file.name.toUpperCase()}
            </div>
          )}
        />
      );
      fireEvent.drop(screen.getByTestId('dropzone'), makeDataTransfer([makeFile('lower.txt')]));
      await waitFor(() => {
        expect(screen.getByTestId('custom-item')).toHaveTextContent('LOWER.TXT');
      });
    });

    it('renders extra children after thumbnails for the dropbox layout', () => {
      render(
        <FileUploader>
          <FileUploader.Thumbnails dropbox>
            <FileUploader.Dropzone data-testid="box" variant="box" />
          </FileUploader.Thumbnails>
        </FileUploader>
      );
      expect(screen.getByTestId('box')).toHaveClass('file-uploader-box');
    });
  });

  describe('Class Merging', () => {
    it('merges custom classNames on the parts', () => {
      render(
        <FileUploader className="custom-root">
          <FileUploader.Dropzone data-testid="dropzone" className="custom-zone" />
          <FileUploader.List data-testid="list" className="custom-list" />
        </FileUploader>
      );
      expect(document.querySelector('[data-slot="file-uploader"]')).toHaveClass('custom-root');
      expect(screen.getByTestId('dropzone')).toHaveClass('file-uploader', 'custom-zone');
      expect(screen.getByTestId('list')).toHaveClass('file-uploader-list', 'custom-list');
    });
  });

  describe('Display Name', () => {
    it('has the correct display names', () => {
      expect(FileUploader.displayName).toBe('FileUploader');
      expect(FileUploader.Dropzone.displayName).toBe('FileUploader.Dropzone');
      expect(FileUploader.Message.displayName).toBe('FileUploader.Message');
      expect(FileUploader.List.displayName).toBe('FileUploader.List');
      expect(FileUploader.Thumbnails.displayName).toBe('FileUploader.Thumbnails');
      expect(FileUploader.Item.displayName).toBe('FileUploader.Item');
      expect(FileUploader.ItemImage.displayName).toBe('FileUploader.ItemImage');
      expect(FileUploader.ItemInfo.displayName).toBe('FileUploader.ItemInfo');
      expect(FileUploader.ItemRemove.displayName).toBe('FileUploader.ItemRemove');
    });
  });
});

describe('fileUploaderDropzoneVariants', () => {
  it('returns the base class by default', () => {
    const classes = fileUploaderDropzoneVariants();
    expect(classes).toContain('file-uploader');
    expect(classes).not.toContain('file-uploader-avatar');
  });

  it('adds the variant classes', () => {
    expect(fileUploaderDropzoneVariants({ variant: 'avatar' })).toContain('file-uploader-avatar');
    expect(fileUploaderDropzoneVariants({ variant: 'box' })).toContain('file-uploader-box');
  });
});

describe('formatBytes', () => {
  it('formats byte counts', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1536)).toBe('1.5 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
  });
});
