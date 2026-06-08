import { Outlet, Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { BookMarked, LogOut } from 'lucide-react';

export function Layout() {
  const { signOut } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    { name: 'Meus Livros', path: '/books', icon: BookMarked },
  ];

  return (
    <div className="h-screen w-full flex bg-[#050B14] text-slate-100 overflow-hidden font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 flex-shrink-0 bg-white/[0.02] backdrop-blur-2xl border-r border-white/5 flex flex-col justify-between">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Book Manager</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase mb-4 px-3">
              Menu Principal
            </p>
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                      ? 'bg-cyan-500/10 text-cyan-400'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                    }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User / Logout */}
        <div className="p-6 border-t border-white/5">
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group cursor-pointer"
          >
            <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400" />
            <span className="font-medium text-sm">Sair da conta</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 w-full h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
