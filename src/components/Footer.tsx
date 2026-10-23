import React from 'react';
import { GraduationCap, PhoneCall, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white">EduVibe AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Học viện Công nghệ & Kỹ năng số ứng dụng Trí tuệ Nhân tạo thế hệ mới. Đào tạo thực chiến từ con số 0 đến làm việc tại các tập đoàn công nghệ lớn.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Cam kết việc làm bằng văn bản</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Khóa Học Nổi Bật</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#courses" className="hover:text-white transition-colors">Fullstack Web & AI Agent Developer</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Data Science & Machine Learning</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">IELTS Master 7.5+ & Tiếng Anh Tech</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">UI/UX & Product Design Chuyên Nghiệp</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Digital Marketing & Growth AI</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Lập trình Mobile Flutter & React Native</a></li>
            </ul>
          </div>

          {/* Admissions & Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Bộ Phận Tuyển Sinh</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:19008899" className="hover:text-white font-bold text-white">1900 8899 (Hotline 24/7)</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>tuyensinh@eduvibe.edu.vn</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Cơ sở 1: Tòa nhà TechHub, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>Cơ sở 2: Số 285 Cách Mạng Tháng 8, Quận 10, TP.HCM</span>
              </li>
            </ul>
          </div>

          {/* AI Advisor Badge */}
          <div className="space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Hỗ Trợ Tự Động</span>
            <h5 className="text-sm font-bold text-white">Trợ Lý AI EduBot 24/7</h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tích hợp công nghệ Gemini 3.8 Flash tư vấn lộ trình học, xếp lớp kiểm tra đầu vào và giữ suất học bổng tự động.
            </p>
            <div className="text-[11px] text-slate-500 pt-1">
              Hệ thống tự động thông báo email tức thì tới bộ phận tuyển sinh.
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © 2026 Học viện Công nghệ EduVibe. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Chính sách bảo mật</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Điều khoản học tập</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Quy chế cam kết việc làm</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
