import { useCallback, useEffect, useRef } from 'react';

type UseDialogOptions = {
  show: boolean;
  cancelFn?: () => void;
};

export function useDialog(options: UseDialogOptions) {
  const { show = false, cancelFn } = options;

  const ref = useRef<HTMLDialogElement>(null);

  const onCancel = useCallback(() => {
    ref.current?.close();
    if (cancelFn) cancelFn();
  }, [cancelFn]);

  const outsideClick = useCallback(
    (event: MouseEvent) => {
      const dialogDimensions = ref.current?.getBoundingClientRect();
      if (
        event.clientX < (dialogDimensions?.left || 0) ||
        event.clientX > (dialogDimensions?.right || 0) ||
        event.clientY < (dialogDimensions?.top || 0) ||
        event.clientY > (dialogDimensions?.bottom || 0)
      ) {
        onCancel();
      }
    },
    [onCancel]
  );

  useEffect(() => {
    if (show) {
      ref.current?.showModal();

      // This is needed, because a dialog automatically sets a focus on the first input it finds.
      // autoFocus false on a element does not work.
      ref.current?.querySelectorAll('input').forEach(e => e.blur());
      ref.current?.querySelectorAll('select').forEach(e => e.blur());
      ref.current?.querySelectorAll('textarea').forEach(e => e.blur());
    } else {
      ref.current?.close();
    }
  }, [show]);

  useEffect(() => {
    const current = ref.current;
    current?.addEventListener('click', outsideClick);

    return () => {
      current?.removeEventListener('click', outsideClick);
    };
  }, [outsideClick]);

  return { ref, onCancel };
}
