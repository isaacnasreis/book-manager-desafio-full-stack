import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { isAxiosError } from 'axios';
import floatingBooks from '../assets/floating-books.png';
import { api } from '../services/api';

const registerSchema = z.object({
    email: z.string().min(1, "E-mail é obrigatório").email("Formato de e-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha")
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

export function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerSchema)
    });

    const navigate = useNavigate();
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister(data: RegisterFormInputs) {
        setAuthError(null);
        setIsLoading(true);
        try {
            await api.post('/auth/register', {
                email: data.email,
                password: data.password
            });
            navigate('/login', { 
                state: { message: "Conta criada com sucesso! Faça login para continuar." } 
            });
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 400) {
                 setAuthError("Este e-mail já está em uso.");
            } else {
                 setAuthError("Erro ao criar conta. Tente novamente mais tarde.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="h-screen w-full bg-[#050B14] text-white overflow-hidden relative">
            {/* IMAGEM DE FUNDO */}
            <img
                src={floatingBooks}
                alt="Livros flutuantes"
                className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
            />

            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050B14]/40 via-transparent to-[#050B14] z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/50 to-transparent z-[2]" />

            {/* Glow atmosférico */}
            <div className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] bg-cyan-800/20 rounded-full blur-[150px] pointer-events-none z-[3]" />

            <div className="relative z-10 h-full flex flex-col lg:flex-row items-center">

                {/* LADO ESQUERDO — Texto */}
                <div className="w-full lg:w-1/2 xl:w-[55%] h-full flex items-end justify-start p-8 pb-12 sm:p-12 sm:pb-16 xl:p-16 xl:pb-20">
                    <div className="max-w-lg">
                        <h2 className="text-4xl sm:text-5xl xl:text-[3.5rem] font-bold leading-[1.1] tracking-tight">
                            Comece Sua
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                                Nova Jornada
                            </span>
                        </h2>
                        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
                            Crie sua conta e tenha um espaço exclusivo para gerenciar seus livros, autores e histórias favoritas.
                        </p>
                    </div>
                </div>

                {/* LADO DIREITO — Formulário de Registro */}
                <div className="w-full lg:w-1/2 xl:w-[45%] h-full flex items-center justify-center px-6 sm:px-12 lg:px-16 overflow-y-auto">
                    <div className="w-full max-w-sm py-8">
                        <div className="mb-8">
                            <p className="text-xs font-bold text-cyan-500/70 tracking-[0.2em] uppercase mb-4">
                                Book Manager
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                                Criar Conta
                            </h1>
                            <p className="mt-2 text-slate-500 text-sm">
                                Preencha os dados abaixo para se cadastrar.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest ml-1" htmlFor="email">
                                    E-mail
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="exemplo@email.com"
                                    disabled={isLoading}
                                    {...register('email')}
                                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                {errors.email && (
                                    <span className="text-red-400 text-xs ml-1 block">{errors.email.message}</span>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest ml-1" htmlFor="password">
                                    Senha
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Mínimo 6 caracteres"
                                    disabled={isLoading}
                                    {...register('password')}
                                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                {errors.password && (
                                    <span className="text-red-400 text-xs ml-1 block">{errors.password.message}</span>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest ml-1" htmlFor="confirmPassword">
                                    Confirmar Senha
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    {...register('confirmPassword')}
                                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                {errors.confirmPassword && (
                                    <span className="text-red-400 text-xs ml-1 block">{errors.confirmPassword.message}</span>
                                )}
                            </div>

                            {authError && (
                                <div className="text-red-400 text-sm text-center bg-red-500/10 py-2.5 rounded-xl border border-red-500/20">
                                    {authError}
                                </div>
                            )}

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold py-3.5 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200 active:scale-[0.97] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Criando conta...</span>
                                        </>
                                    ) : (
                                        <>
                                            Criar Conta
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-center text-slate-500 text-sm">
                            Já tem uma conta?{' '}
                            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                                Faça login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
