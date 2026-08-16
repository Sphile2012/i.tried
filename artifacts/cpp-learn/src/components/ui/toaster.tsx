import { useToast } from '@/hooks/use-toast';

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm'>
      {toasts.map((t) => (
        <div
          key={t.id}
          onClick={() => dismiss(t.id)}
          className={`cursor-pointer rounded-lg border p-4 shadow-lg transition-all ${
            t.variant === 'destructive'
              ? 'border-red-800 bg-red-950/90 text-red-100'
              : 'border-slate-800 bg-slate-900/90 text-white'
          }`}
        >
          {t.title && <div className='font-medium text-sm mb-1'>{t.title}</div>}
          {t.description && <div className='text-sm opacity-90'>{t.description}</div>}
        </div>
      ))}
    </div>
  );
}
