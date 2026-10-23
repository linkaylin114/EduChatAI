import React, { useState } from 'react';
import { 
  GraduationCap, 
  Bot, 
  LayoutDashboard, 
  PhoneCall, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  currentView: 'landing' | 'admin';
  setCurrentView: (view: 'landing' | 'admin') => void;
  onOpenChat: () => void;
  newLeadsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenChat,
  newLeadsCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                  EduVibe
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                  AI ACADEMY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Học Viện Công Nghệ & Kỹ Năng Số</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#courses" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-slate-400" />
              Khóa Học Nổi Bật
            </a>
            <a href="#quiz" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Quiz Tìm Khóa (30s)
            </a>
            <a href="#why" className="hover:text-blue-600 transition-colors">
              Tại Sao Chọn EduVibe
            </a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors">
              Học Viên Đánh Giá
            </a>
            <a href="#consultation" className="hover:text-blue-600 transition-colors">
              Đăng Ký Tư Vấn
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Admissions Hotline */}
            <a 
              href="tel:19008899" 
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors"
              title="Hotline tuyển sinh 24/7"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>1900 8899</span>
            </a>

            {/* AI Advisor Chat Button */}
            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3.5 py-2 rounded-lg shadow-sm shadow-blue-500/25 transition-all transform active:scale-95"
            >
              <Bot className="w-4 h-4" />
              <span>Tư Vấn AI</span>
            </button>

            {/* View Switcher: Landing vs CRM Dashboard */}
            <button
              onClick={() => setCurrentView(currentView === 'landing' ? 'admin' : 'landing')}
              className={`relative inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-lg border transition-all ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50/70'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{currentView === 'admin' ? 'Về Landing Page' : 'Dashboard Tuyển Sinh'}</span>
              {newLeadsCount > 0 && currentView === 'landing' && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-red-500 text-white animate-pulse">
                  {newLeadsCount} mới
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center sm:hidden space-x-2">
            <button
              onClick={() => setCurrentView(currentView === 'landing' ? 'admin' : 'landing')}
              className="p-2 text-indigo-600 bg-indigo-50 rounded-lg text-xs font-bold flex items-center gap-1"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{currentView === 'admin' ? 'Trang Chủ' : 'CRM'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2.5 text-sm font-medium text-slate-700">
            <a 
              href="#courses" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between"
            >
              <span>Khóa Học Nổi Bật</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a 
              href="#quiz" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-3 py-2 rounded-lg hover:bg-slate-50 flex items-center justify-between text-amber-700 font-semibold"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Quiz Tìm Khóa Phù Hợp (30s)
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a 
              href="#why" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Tại Sao Chọn EduVibe
            </a>
            <a 
              href="#testimonials" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Học Viên Đánh Giá
            </a>
            <a 
              href="#consultation" 
              onClick={() => setMobileMenuOpen(false)} 
              className="px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              Đăng Ký Tư Vấn
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 rounded-lg text-sm"
            >
              <Bot className="w-4 h-4" />
              <span>Mở Trợ Lý Tuyển Sinh AI</span>
            </button>
            <a
              href="tel:19008899"
              className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-semibold py-2.5 rounded-lg text-sm"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Gọi Tuyển Sinh: 1900 8899</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
