import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
    disabled?: boolean;
}

export function Pagination({
    currentPage,
    totalPages,
    totalElements,
    pageSize,
    onPageChange,
    onPageSizeChange,
    disabled = false
}: PaginationProps) {
    if (totalElements === 0) return null;

    const generatePages = () => {
        const pages: (number | string)[] = [];
        if (totalPages <= 5) {
            for (let i = 0; i < totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pages.push(0, 1, 2, '...', totalPages - 1);
            } else if (currentPage >= totalPages - 3) {
                pages.push(0, '...', totalPages - 3, totalPages - 2, totalPages - 1);
            } else {
                pages.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1);
            }
        }
        return pages;
    };

    const startItem = currentPage * pageSize + 1;
    const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 py-4 border-t border-white/[0.05]">
            <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>
                    Mostrando <span className="font-medium text-slate-200">{startItem}</span> a <span className="font-medium text-slate-200">{endItem}</span> de <span className="font-medium text-slate-200">{totalElements}</span> livros
                </span>

                <div className="hidden sm:flex items-center gap-2">
                    <span className="text-slate-500">|</span>
                    <label htmlFor="pageSize" className="sr-only">Itens por página</label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        disabled={disabled}
                        className="bg-white/[0.03] border border-white/[0.05] rounded-lg px-2 py-1 text-slate-300 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50 cursor-pointer"
                    >
                        <option value={4} className="bg-slate-900 text-white">4 por página</option>
                        <option value={8} className="bg-slate-900 text-white">8 por página</option>
                        <option value={12} className="bg-slate-900 text-white">12 por página</option>
                        <option value={24} className="bg-slate-900 text-white">24 por página</option>
                        <option value={48} className="bg-slate-900 text-white">48 por página</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 0 || disabled}
                    className="p-2 rounded-xl border border-white/[0.05] bg-white/[0.02] text-slate-300 hover:bg-white/[0.05] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                    aria-label="Página anterior"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                {generatePages().map((page, index) => {
                    if (page === '...') {
                        return (
                            <div key={`ellipsis-${index}`} className="px-2 text-slate-500 flex items-center justify-center">
                                <MoreHorizontal className="w-4 h-4" />
                            </div>
                        );
                    }

                    const pageNumber = page as number;
                    const isActive = pageNumber === currentPage;

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            disabled={disabled}
                            className={`min-w-[36px] h-9 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center cursor-pointer
                                ${isActive
                                    ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-transparent'
                                    : 'border border-white/[0.05] bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:text-white'
                                }
                                disabled:opacity-50 disabled:pointer-events-none`}
                        >
                            {pageNumber + 1}
                        </button>
                    );
                })}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1 || disabled}
                    className="p-2 rounded-xl border border-white/[0.05] bg-white/[0.02] text-slate-300 hover:bg-white/[0.05] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all duration-200 cursor-pointer"
                    aria-label="Próxima página"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
