import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import { Search, Plus, BookOpen, Pencil, Trash2 } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';

export interface IBook {
    id: number;
    title: string;
    author: string;
    year: number;
    description: string;
}

export function BookList() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const [bookToDelete, setBookToDelete] = useState<number | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        const timer = setTimeout(() => {
            fetchBooks(abortController.signal);
        }, 400);

        return () => {
            clearTimeout(timer);
            abortController.abort();
        };
    }, [search]);

    async function fetchBooks(signal?: AbortSignal) {
        setLoading(true);
        try {
            const response = await api.get('/books', {
                params: search ? { title: search } : {},
                signal
            });

            if (response.data.content) {
                setBooks(response.data.content);
            } else if (Array.isArray(response.data)) {
                setBooks(response.data);
            } else {
                setBooks([]);
            }
        } catch (error: any) {
            if (error.name === 'CanceledError' || error.message?.includes('canceled')) {
                return;
            }
            console.error("Erro ao buscar livros:", error);
        } finally {
            if (!signal?.aborted) {
                setLoading(false);
            }
        }
    }

    function confirmDelete(id: number) {
        setBookToDelete(id);
    }

    async function handleDeleteConfirm() {
        if (!bookToDelete) return;

        setIsDeleting(true);
        try {
            await api.delete(`/books/${bookToDelete}`);
            setBooks(prev => prev.filter(b => b.id !== bookToDelete));
            setBookToDelete(null);
        } catch (error) {
            console.error("Erro ao excluir livro:", error);
        } finally {
            setIsDeleting(false);
        }
    }

    // Gradientes de capa dinâmicos baseados no hash do título
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
        <div className="p-6 sm:p-10 lg:p-12 w-full h-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
                <div>
                    <p className="text-[11px] font-bold text-cyan-500/60 tracking-[0.2em] uppercase mb-2">
                        Biblioteca
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                        Meus Livros
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Gerencie e explore sua coleção pessoal.
                    </p>
                </div>

                <Link
                    to="/books/new"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-lg shadow-cyan-500/15 hover:shadow-cyan-500/25 active:scale-[0.97] whitespace-nowrap"
                >
                    <Plus className="w-4 h-4" />
                    Adicionar Livro
                </Link>
            </div>

            <div className="relative mb-10 max-w-lg">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-slate-500" />
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar livro pelo título..."
                    className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all duration-200"
                />
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="animate-pulse rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.04]">
                            <div className="h-44 bg-white/[0.04]" />
                            <div className="p-5 space-y-3">
                                <div className="h-4 bg-white/[0.06] rounded-full w-3/4" />
                                <div className="h-3 bg-white/[0.04] rounded-full w-1/2" />
                                <div className="h-3 bg-white/[0.03] rounded-full w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : books.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 bg-white/[0.03] border border-white/[0.06] rounded-2xl flex items-center justify-center mb-6">
                        <BookOpen className="w-9 h-9 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                        {search ? 'Nenhum resultado' : 'Biblioteca vazia'}
                    </h3>
                    <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                        {search
                            ? `Não encontramos livros com "${search}".`
                            : 'Sua estante está esperando. Adicione seu primeiro livro para começar!'}
                    </p>
                    {!search && (
                        <Link
                            to="/books/new"
                            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-full transition-all duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            Adicionar primeiro livro
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30"
                        >
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
                                        onClick={(e) => { e.preventDefault(); confirmDelete(book.id); }}
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
                    ))}
                </div>
            )}

            <ConfirmModal
                isOpen={bookToDelete !== null}
                title="Excluir Livro"
                message="Tem certeza que deseja excluir este livro permanentemente da sua biblioteca? Esta ação não pode ser desfeita."
                isLoading={isDeleting}
                onConfirm={handleDeleteConfirm}
                onCancel={() => !isDeleting && setBookToDelete(null)}
            />
        </div>
    );
}