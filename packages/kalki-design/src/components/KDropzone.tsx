import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { UploadSimple, File, X } from '@phosphor-icons/react';
import styles from '../styles/kdropzone.module.css';

export interface DropzoneFile {
  file: File;
  id: string;
}

export interface DropzoneProps {
  onFilesAdded?: (files: File[]) => void;
  files?: DropzoneFile[];
  onFileRemove?: (id: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${units[i]}`;
}

let idCounter = 0;
function uid() {
  return `dz-${++idCounter}-${Date.now()}`;
}

const KDropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      onFilesAdded,
      files = [],
      onFileRemove,
      multiple = true,
      accept,
      maxSize,
      disabled = false,
      label = 'Click or drag files to upload',
      description,
      className,
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dragCounter = useRef(0);

    const validateFiles = useCallback(
      (fileList: File[]): File[] => {
        setError(null);
        return fileList.filter((f) => {
          if (maxSize && f.size > maxSize) {
            setError(`File "${f.name}" exceeds ${formatSize(maxSize)} limit`);
            return false;
          }
          return true;
        });
      },
      [maxSize]
    );

    const handleFiles = useCallback(
      (fileList: FileList | null) => {
        if (!fileList) return;
        const arr = Array.from(fileList);
        const valid = validateFiles(arr);
        if (valid.length > 0) onFilesAdded?.(valid);
      },
      [onFilesAdded, validateFiles]
    );

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current++;
      if (dragCounter.current === 1) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current--;
      if (dragCounter.current === 0) setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragging(false);
      if (!disabled) handleFiles(e.dataTransfer.files);
    };

    const handleClick = () => {
      if (!disabled) inputRef.current?.click();
    };

    const zoneClasses = [
      styles.zone,
      isDragging && styles.dragging,
      disabled && styles.disabled,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={`${styles.dropzone} ${className || ''}`}>
        <div
          className={zoneClasses}
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled || undefined}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <input
            ref={inputRef}
            type="file"
            className={styles.input}
            multiple={multiple}
            accept={accept}
            onChange={(e) => handleFiles(e.target.files)}
            disabled={disabled}
            tabIndex={-1}
          />
          <UploadSimple size={24} weight="regular" className={styles.uploadIcon} />
          <span className={styles.label}>{label}</span>
          {description && <span className={styles.description}>{description}</span>}
        </div>

        {error && <span className={styles.error}>{error}</span>}

        {files.length > 0 && (
          <ul className={styles.fileList}>
            {files.map((f) => (
              <li key={f.id} className={styles.fileItem}>
                <File size={16} weight="regular" className={styles.fileIcon} />
                <span className={styles.fileName}>{f.file.name}</span>
                <span className={styles.fileSize}>{formatSize(f.file.size)}</span>
                {onFileRemove && (
                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => onFileRemove(f.id)}
                    aria-label={`Remove ${f.file.name}`}
                  >
                    <X size={12} weight="bold" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

KDropzone.displayName = 'KDropzone';
export { uid as dropzoneUid };
export default KDropzone;
