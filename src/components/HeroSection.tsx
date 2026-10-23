import React from 'react';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Award, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  onOpenChat: () => void;
  onOpenQuiz: () => void;
  onExploreCourses: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenChat,
  onOpenQuiz,
  onExploreCourses,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-linear-to-b from-blue-50/70 via-indigo-50/30 to-white">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-linear-to-tr from-blue-300/20 to-purple-300/20 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-200/20 blur-2xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-blue-800 text-xs sm:text-sm font-semibold shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping" />
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Tuyển sinh Khóa K28 - Giảm đến 30% & Đồng hành cùng AI Mentor</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Chinh Phục Kỹ Năng Số & Lập Trình Với{' '}
              <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Trợ Lý Cố Vấn AI
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Lộ trình đào tạo thực chiến từ con số 0 đến làm việc tại các tập đoàn công nghệ hàng đầu. 
              Được hướng dẫn bởi chuyên gia Big Tech và hỗ trợ giải đáp thắc mắc 24/7 với 
              <strong className="text-slate-800 font-semibold"> AI Gemini 3.8 Flash</strong>.
            </p>

            {/* Trust Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cam kết việc làm bằng hợp đồng</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                <Award className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Chứng chỉ nghề quốc tế chuẩn hóa</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Dự án thực tế chuẩn doanh nghiệp</span>
              </div>
            </div>

            {/* Actions CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                onClick={onOpenChat}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-linear-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95"
              >
                <Bot className="w-5 h-5" />
                <span>Tư Vấn Khóa Học Cùng AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-base px-6 py-3.5 rounded-xl shadow-xs transition-all hover:border-slate-400"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Quiz Tìm Khóa (30s)</span>
              </button>
            </div>

            {/* Bottom social proof rating */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Student" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Student" />
              </div>
              <div className="text-left">
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="ml-1 font-bold text-slate-800 text-xs">4.9/5</span>
                </div>
                <p>Hơn <strong>4.800+</strong> học viên tin chọn và có việc làm</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive AI Counselor Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative bg-white/95 rounded-2xl shadow-xl shadow-blue-500/10 border border-slate-200/90 overflow-hidden backdrop-blur-sm">
                
                {/* Header bar of preview widget */}
                <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-900 px-5 py-4 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-500 to-indigo-400 flex items-center justify-center font-bold text-white shadow-sm">
                        <Bot className="w-5 h-5" />
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold flex items-center gap-1.5">
                        EduBot AI Counselor
                        <span className="text-[10px] bg-blue-500/40 text-blue-200 px-1.5 py-0.2 rounded font-medium">Gemini 3.8 Flash</span>
                      </h4>
                      <p className="text-[11px] text-blue-200/80">Tư vấn khóa học & Lộ trình tự động 24/7</p>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-medium">
                    Sẵn sàng
                  </span>
                </div>

                {/* Simulated Chat Dialogue */}
                <div className="p-5 space-y-4 text-xs sm:text-sm bg-slate-50/60">
                  
                  {/* User bubble */}
                  <div className="flex items-start justify-end space-x-2">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-xs px-3.5 py-2.5 max-w-[85%] shadow-2xs">
                      Mình chưa biết code, muốn học để chuyển sang làm Web Developer & ứng dụng AI thì nên bắt đầu từ khóa nào?
                    </div>
                  </div>

                  {/* AI bubble */}
                  <div className="flex items-start space-x-2">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white border border-slate-200/80 text-slate-800 rounded-2xl rounded-tl-xs p-3.5 max-w-[90%] shadow-2xs space-y-2.5">
                      <p>
                        Chào bạn! Với mục tiêu từ số 0 chuyển ngành làm Web & AI, bạn hoàn toàn phù hợp với khóa <strong>Fullstack Web & AI Agent Developer</strong>:
                      </p>
                      
                      {/* Mini Recommended Course Card */}
                      <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-2.5 text-xs">
                        <div className="flex justify-between items-start font-bold text-blue-900">
                          <span>Fullstack Web & AI Agent Developer</span>
                          <span className="text-blue-700 font-extrabold">11.900.000đ</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1">
                          Lộ trình 5.5 tháng: React 19, Node.js, AI Gemini Agents, cam kết việc làm.
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-100 px-2 py-0.5 rounded">
                            Suất học bổng 28% còn 4 chỗ
                          </span>
                          <span className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer" onClick={onOpenChat}>
                            Xem lộ trình →
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 italic">
                        💡 EduBot có thể kiểm tra trình độ và gửi giáo trình chi tiết ngay cho bạn qua SĐT/Email!
                      </p>
                    </div>
                  </div>

                  {/* Quick interactive trigger inside card */}
                  <div className="pt-2">
                    <button
                      onClick={onOpenChat}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-linear-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 border border-indigo-200 rounded-xl text-indigo-700 font-bold text-xs transition-colors shadow-2xs"
                    >
                      <Bot className="w-4 h-4 text-indigo-600" />
                      <span>Bấm vào đây để trò chuyện trực tiếp với EduBot</span>
                    </button>
                  </div>

                </div>

                {/* Footer KPI bar */}
                <div className="border-t border-slate-200 bg-white px-5 py-3 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Đã tư vấn 620+ lượt hôm nay
                  </div>
                  <span className="text-[11px] text-slate-400">Phản hồi tức thì &lt; 1s</span>
                </div>

              </div>

              {/* Floating accent badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-6 bg-white p-3 rounded-xl border border-slate-200 shadow-lg items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">96.8% Học Viên</div>
                  <div className="text-xs text-slate-500">Có việc làm sau 3 tháng tốt nghiệp</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
