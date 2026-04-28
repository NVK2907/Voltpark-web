import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';
import { Button } from '@/shared/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ title, message, onRetry, className }: ErrorStateProps) {
  const { t } = useTranslation();

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mb-4 rounded-full bg-destructive/10 p-4 text-destructive">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title || t('common.error')}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        {message || 'Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.'}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          {t('common.retry')}
        </Button>
      )}
    </div>
  );
}
