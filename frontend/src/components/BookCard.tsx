import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import type { IBook } from '../types/book';

interface BookCardProps {
    book: IBook;
    onDelete: (id: number) => void;
}

export function BookCard({ book, onDelete }: BookCardProps) {
    const getCoverGradient = (title: string) => {
        const gradients = [
            'from-cyan-600 via-blue-700 to-indigo-800',
            'from-violet-600 via-purple-700 to-indigo-900',
            'from-teal-500 via-emerald-600 to-cyan-800',
            'from-rose-600 via-pink-700 to-purple-900',
            'from-amber-500 via-orange-600 to-red-800',
            'from-sky-500 via-blue-600 to-violet-800',
        ];
        let hash = 0;
        for (let i = 0; i < title.length; i++) {
            hash = title.charCodeAt(i) + ((hash << 5) - hash);
        }
        return gradients[Math.abs(hash) % gradients.length];
    };

    const getInitials = (title: string) => {
        return title
            .split(' ')
            .filter(w => w.length > 2)
            .slice(0, 2)
            .map(w => w[0])
            .join('')
            .toUpperCase() || title[0]?.toUpperCase() || '?';
    };

    return (
        <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30">
            <div className={`relative h-44 w-full bg-gradient-to-br ${getCoverGradient(book.title)} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-24 h-24 border border-white/30 rounded-full" />
                    <div className="absolute bottom-6 left-6 w-16 h-16 border border-white/20 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full" />
                </div>

                <span className="text-5xl font-black text-white/20 select-none tracking-widest">
                    {getInitials(book.title)}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                        {book.title}
                    </h3>
                </div>

                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Link
                        to={`/books/${book.id}/edit`}
                        className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 transition-all"
                        title="Editar"
                    >
                        <Pencil className="w-3.5 h-3.5" />
                    </Link>
                    <button
                        onClick={(e) => { e.preventDefault(); onDelete(book.id); }}
                        className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
                        title="Excluir"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <p className="text-cyan-400/80 text-sm font-medium">{book.author}</p>
                <p className="text-slate-600 text-xs mt-0.5 font-semibold tracking-wide">{book.year}</p>
                {book.description && (
                    <p className="text-slate-500 text-[13px] leading-relaxed mt-3 line-clamp-2">
                        {book.description}
                    </p>
                )}
            </div>
        </div>
    );
}
