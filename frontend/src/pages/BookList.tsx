import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, Plus, BookOpen } from 'lucide-react';
import { ConfirmModal } from '../components/ConfirmModal';
import { BookCard } from '../components/BookCard';
import { BookSkeleton } from '../components/BookSkeleton';
import { EmptyState } from '../components/EmptyState';
import { Pagination } from '../components/Pagination';
import type { IBook } from '../types/book';

export function BookList() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(12);
    const [sortOrder, setSortOrder] = useState('id,desc');
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

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
    }, [search, currentPage, pageSize, sortOrder]);

    // Quando a busca ou ordenação muda, resetamos a página para 0
    useEffect(() => {
        setCurrentPage(0);
    }, [search, sortOrder]);

    async function fetchBooks(signal?: AbortSignal) {
        setLoading(true);
        try {
            const response = await api.get('/books', {
                params: {
                    ...(search ? { title: search } : {}),
                    page: currentPage,
                    size: pageSize,
                    sort: sortOrder
                },
                signal
            });

            if (response.data.content) {
                setBooks(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
            } else if (Array.isArray(response.data)) {
                // Fallback de segurança se não retornar Page
                setBooks(response.data);
                setTotalPages(1);
                setTotalElements(response.data.length);
            } else {
                setBooks([]);
                setTotalPages(0);
                setTotalElements(0);
            }
        } catch (error: unknown) {
            if (error instanceof Error && error.name === 'CanceledError') {
                return;
            }
            // Em caso de erro (não cancelado), limpamos os dados
            setBooks([]);
            setTotalPages(0);
            setTotalElements(0);
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
            
            // Se deletou o último item da página atual, e não é a primeira página, volta uma página
            if (books.length === 1 && currentPage > 0) {
                setCurrentPage(prev => prev - 1);
            } else {
                // Senão, apenas recarrega os dados da página atual
                fetchBooks();
            }
            
            setBookToDelete(null);
            toast.success('Livro excluído com sucesso!');
        } catch {
            toast.error('Erro ao excluir o livro.');
        } finally {
            setIsDeleting(false);
        }
    }

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(0); // Volta para a página 0 quando muda o tamanho
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

            <div className="flex flex-col sm:flex-row gap-4 mb-10 max-w-2xl">
                <div className="relative flex-1">
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
                
                <div className="sm:w-56">
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full py-3 px-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all duration-200 cursor-pointer appearance-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 1rem center',
                            backgroundSize: '1em'
                        }}
                    >
                        <option value="id,desc" className="bg-slate-900 text-white">Mais Recentes</option>
                        <option value="id,asc" className="bg-slate-900 text-white">Mais Antigos</option>
                        <option value="title,asc" className="bg-slate-900 text-white">Título (A-Z)</option>
                        <option value="title,desc" className="bg-slate-900 text-white">Título (Z-A)</option>
                        <option value="year,desc" className="bg-slate-900 text-white">Ano (Maior-Menor)</option>
                        <option value="year,asc" className="bg-slate-900 text-white">Ano (Menor-Maior)</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {Array.from({ length: pageSize }).map((_, i) => (
                        <BookSkeleton key={i} />
                    ))}
                </div>
            ) : books.length === 0 ? (
                <EmptyState
                    icon={<BookOpen className="w-9 h-9 text-slate-600" />}
                    title={search ? 'Nenhum resultado' : 'Biblioteca vazia'}
                    description={search
                        ? `Não encontramos livros com "${search}".`
                        : 'Sua estante está esperando. Adicione seu primeiro livro para começar!'}
                    action={!search ? (
                        <Link
                            to="/books/new"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-full transition-all duration-200"
                        >
                            <Plus className="w-4 h-4" />
                            Adicionar primeiro livro
                        </Link>
                    ) : undefined}
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onDelete={confirmDelete}
                            />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalElements={totalElements}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        disabled={loading}
                    />
                </>
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