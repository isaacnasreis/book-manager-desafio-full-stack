import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Loader2, ArrowLeft, BookOpen, Save } from 'lucide-react';

const bookSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    author: z.string().min(1, "O autor é obrigatório"),
    year: z.number().min(1000, "Ano inválido").max(new Date().getFullYear(), "O ano não pode ser no futuro"),
    description: z.string().optional()
});

type BookFormInputs = z.infer<typeof bookSchema>;

export function BookForm() {
    const { id } = useParams<{ id: string }>();
    const isEditing = Boolean(id);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(isEditing);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<BookFormInputs>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            year: new Date().getFullYear()
        }
    });

    useEffect(() => {
        if (isEditing) {
            fetchBook();
        } else {
            reset({ title: '', author: '', year: new Date().getFullYear(), description: '' });
            setIsFetching(false);
        }
    }, [id, isEditing]);

    async function fetchBook() {
        try {
            const response = await api.get(`/books/${id}`);
            reset(response.data);
        } catch {
            setSubmitError("Não foi possível carregar os dados do livro.");
        } finally {
            setIsFetching(false);
        }
    }

    async function onSubmit(data: BookFormInputs) {
        setSubmitError(null);
        setIsLoading(true);
        try {
            if (isEditing) {
                await api.put(`/books/${id}`, data);
            } else {
                await api.post('/books/create', data);
            }
            navigate('/books');
        } catch {
            setSubmitError("Erro ao salvar o livro. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    }

    if (isFetching) {
        return (
            <div className="p-6 sm:p-10 lg:p-12 w-full h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
            </div>
        );
    }

    return (
        <div className="p-6 sm:p-10 lg:p-12 w-full h-full max-w-4xl mx-auto">
            <div className="mb-8">
                <Link 
                    to="/books"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Voltar para a biblioteca
                </Link>

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold text-cyan-500/60 tracking-[0.2em] uppercase mb-1">
                            {isEditing ? 'Edição' : 'Novo Cadastro'}
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            {isEditing ? 'Editar Livro' : 'Adicionar Livro'}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-2xl shadow-black/50">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest ml-1" htmlFor="title">
                                Título do Livro
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Ex: O Senhor dos Anéis"
                                disabled={isLoading}
                                {...register('title')}
                                className="w-full px-4 py-3 bg-[#0A1220] border border-white/5 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all duration-200 disabled:opacity-50"
                            />
                            {errors.title && (
                                <span className="text-red-400 text-xs ml-1 block">{errors.title.message}</span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest ml-1" htmlFor="author">
                                Autor
                            </label>
                            <input
                                id="author"
                                type="text"
                                placeholder="Ex: J.R.R. Tolkien"
                                disabled={isLoading}
                                {...register('author')}
                                className="w-full px-4 py-3 bg-[#0A1220] border border-white/5 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all duration-200 disabled:opacity-50"
                            />
                            {errors.author && (
                                <span className="text-red-400 text-xs ml-1 block">{errors.author.message}</span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest ml-1" htmlFor="year">
                                Ano de Publicação
                            </label>
                            <input
                                id="year"
                                type="number"
                                placeholder="Ex: 1954"
                                disabled={isLoading}
                                {...register('year', { valueAsNumber: true })}
                                className="w-full px-4 py-3 bg-[#0A1220] border border-white/5 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all duration-200 disabled:opacity-50"
                            />
                            {errors.year && (
                                <span className="text-red-400 text-xs ml-1 block">{errors.year.message}</span>
                            )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest ml-1" htmlFor="description">
                                Descrição ou Sinopse
                            </label>
                            <textarea
                                id="description"
                                placeholder="Sobre o que é este livro?"
                                rows={4}
                                disabled={isLoading}
                                {...register('description')}
                                className="w-full px-4 py-3 bg-[#0A1220] border border-white/5 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/40 focus:bg-white/[0.05] transition-all duration-200 disabled:opacity-50 resize-none"
                            />
                            {errors.description && (
                                <span className="text-red-400 text-xs ml-1 block">{errors.description.message}</span>
                            )}
                        </div>
                    </div>

                    {submitError && (
                        <div className="text-red-400 text-sm bg-red-500/10 py-3 px-4 rounded-xl border border-red-500/20">
                            {submitError}
                        </div>
                    )}

                    <div className="pt-6 flex items-center justify-end gap-3 border-t border-white/5">
                        <Link
                            to="/books"
                            className="px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all disabled:opacity-50"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all disabled:opacity-50 active:scale-[0.98] cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Salvar Livro
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}