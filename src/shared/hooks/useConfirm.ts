import { useState, useCallback } from 'react';

export interface ConfirmState {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => Promise<void> | void;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState | null>(null);

  const confirm = useCallback(
    ({
      title,
      description,
      confirmLabel,
      cancelLabel,
      variant,
      onConfirm,
    }: Omit<ConfirmState, 'isOpen'>) => {
      const newState: ConfirmState = {
        isOpen: true,
        title,
        description,
        onConfirm: async () => {
          await onConfirm();
          setState(null);
        },
      };
      if (confirmLabel !== undefined) newState.confirmLabel = confirmLabel;
      if (cancelLabel !== undefined) newState.cancelLabel = cancelLabel;
      if (variant !== undefined) newState.variant = variant;

      setState(newState);
    },
    [],
  );

  const closeConfirm = useCallback(() => {
    setState(null);
  }, []);

  return {
    confirmState: state,
    confirm,
    closeConfirm,
  };
}
