import { Loader2, AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isLoading = false }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={!isLoading ? onCancel : undefined}
      />

      <div className="relative bg-[#0A1220] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl shadow-black/50 overflow-hidden transform transition-all">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="text-slate-500 cursor-pointer hover:text-slate-300 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2.5 cursor-pointer text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center cursor-pointer gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-red-500/80 hover:bg-red-500 border border-red-500/50 rounded-xl shadow-lg shadow-red-500/20 transition-all disabled:opacity-50 active:scale-[0.98]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              'Confirmar Exclusão'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
