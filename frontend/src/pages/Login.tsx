import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Loader2, CheckCircle2 } from 'lucide-react';
import floatingBooks from '../assets/floating-books.png';

const loginSchema = z.object({
    email: z.string().min(1, "E-mail é obrigatório").email("Formato de e-mail inválido"),
    password: z.string().min(1, "Senha é obrigatória")
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema)
    });

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    const successMessage = location.state?.message;

    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(data: LoginFormInputs) {
        setAuthError(null);
        setIsLoading(true);
        try {
            await signIn(data.email, data.password);
            navigate('/books', { replace: true, state: {} });
        } catch {
            setAuthError("E-mail ou senha incorretos.");
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
                            Descubra Histórias
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                                Que Você Ama
                            </span>
                        </h2>
                        <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed max-w-md">
                            Sua jornada começa aqui. Gerencie, organize e explore sua biblioteca pessoal.
                        </p>
                    </div>
                </div>

                {/* LADO DIREITO — Formulário de Login */}
                <div className="w-full lg:w-1/2 xl:w-[45%] h-full flex items-center justify-center px-6 sm:px-12 lg:px-16">
                    <div className="w-full max-w-sm">
                        <div className="mb-8">
                            <p className="text-xs font-bold text-cyan-500/70 tracking-[0.2em] uppercase mb-4">
                                Book Manager
                            </p>
                            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                                Bem-vindo de volta
                            </h1>
                            <p className="mt-2 text-slate-500 text-sm">
                                Faça login para acessar sua biblioteca.
                            </p>
                        </div>

                        {successMessage && !authError && (
                            <div className="mb-6 flex items-center gap-3 text-emerald-400 text-sm bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                <span>{successMessage}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    {...register('password')}
                                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.08] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                {errors.password && (
                                    <span className="text-red-400 text-xs ml-1 block">{errors.password.message}</span>
                                )}
                            </div>

                            {authError && (
                                <div className="text-red-400 text-sm text-center bg-red-500/10 py-2.5 rounded-xl border border-red-500/20">
                                    {authError}
                                </div>
                            )}

                            <div className="pt-3">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold py-3.5 rounded-full shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-200 active:scale-[0.97] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            <span>Entrando...</span>
                                        </>
                                    ) : (
                                        <>
                                            Entrar
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 mb-8 sm:mb-0 text-center text-slate-500 text-sm">
                            Não tem uma conta?{' '}
                            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
                                Cadastre-se
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}