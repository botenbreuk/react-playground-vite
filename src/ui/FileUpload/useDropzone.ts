import { DragEvent, DragEventHandler, MouseEventHandler, useRef, useState } from 'react';

type RootProps<T = HTMLDivElement> = {
  onClick: MouseEventHandler<T>;
  onDragOver: DragEventHandler<T>;
  onDragLeave: DragEventHandler<T>;
  onDrop: DragEventHandler<T>;
};

export function useDropzone<T = HTMLDivElement>(options: {
  onDrop: (files: FileList) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  function handleClick() {
    inputRef.current?.click();
  }

  function handleDragOver(e: DragEvent<T>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: DragEvent<T>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e: DragEvent<T>) {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer?.files) {
      options.onDrop(e.dataTransfer.files);
    }
  }

  const rootProps: RootProps<T> = {
    onClick: handleClick,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop
  };

  return { inputRef, rootProps, isDragOver };
}
