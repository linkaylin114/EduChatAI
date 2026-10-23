import React, { useState } from 'react';
import { COURSES } from '../data/coursesData';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  User, 
  Mail, 
  BookOpen, 
  ShieldCheck, 
  BellRing,
  Clock
} from 'lucide-react';

interface QuickLeadFormProps {
  onLeadSuccess: (name: string, courseName: string) => void;
}

export const QuickLeadForm: React.FC<QuickLeadFormProps> = ({ onLeadSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES[0].id);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Vui lòng điền Họ tên và Số điện thoại.');
      return;
    }

    const matchedCourse = COURSES.find(c => c.id === selectedCourseId) || COURSES[0];
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          courseId: matchedCourse.id,
          courseName: matchedCourse.title,
          source: 'landing_form',
          notes: notes.trim() || 'Đăng ký tư vấn lộ trình học từ form cuối trang landing page.'
        })
      });

      if (!res.ok) {
        throw new Error('Có lỗi xảy ra khi lưu thông tin.');
      }

      setIsSuccess(true);
      onLeadSuccess(name, matchedCourse.title);
    } catch (err: any) {
      setErrorMessage(err.message || 'Không thể kết nối đến máy chủ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="py-16 md:py-24 bg-linear-to-b from-white to-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left promo banner */}
            <div className="lg:col-span-5 bg-linear-to-br from-blue-700 via-indigo-700 to-purple-800 p-8 text-white flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-xs text-blue-100 mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Ưu Đãi Tuyển Sinh Tháng 10
                </span>
                <h3 className="text-2xl font-black leading-snug">
                  Đăng Ký Tư Vấn 1:1 Cùng Cố Vấn Tuyển Sinh
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-3 leading-relaxed">
                  Nhận ngay lộ trình chi tiết từng tuần, bài test đánh giá năng lực miễn phí và mã giảm giá 30% học phí.
                </p>

                <div className="mt-6 space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Phản hồi & gọi lại trong vòng 15 phút</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Tư vấn định hướng nghề nghiệp miễn phí</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span>Hệ thống tự động gửi email thông báo tiếp nhận</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/20 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-[11px] text-blue-200 uppercase font-semibold">Hotline Tuyển sinh</div>
                    <div className="text-base font-bold">1900 8899 (Miễn cước)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7 p-6 sm:p-8">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Gửi Thông Tin Thành Công!</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm">
                    Cảm ơn bạn <strong>{name}</strong>! Chuyên viên học viện EduVibe đã tiếp nhận thông tin và sẽ liên hệ qua số <strong>{phone}</strong> trong ít phút.
                  </p>
                  <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded-xl flex items-center gap-2">
                    <BellRing className="w-4 h-4 text-blue-600" />
                    <span>Email thông báo tự động đã được chuyển tới bộ phận tuyển sinh.</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setNotes('');
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline pt-2"
                  >
                    Đăng ký cho học viên khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">Thông Tin Đăng Ký</h4>
                    <p className="text-xs text-slate-500">Vui lòng điền thông tin chính xác để nhận tài liệu học tập.</p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên của bạn *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn An"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số điện thoại (Zalo) *
                      </label>
                      <div className="relative">
                        <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="0912 345 678"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email nhận tài liệu
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          placeholder="an.nguyen@gmail.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Khóa học quan tâm *
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={selectedCourseId}
                        onChange={e => setSelectedCourseId(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                      >
                        {COURSES.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.title} ({course.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nhu cầu hoặc câu hỏi cụ thể (tùy chọn)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ví dụ: Em muốn học chuyển ngành, tư vấn lịch học tối 2-4-6..."
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-linear-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Đang kết nối hệ thống tuyển sinh...' : 'Nhận Tư Vấn & Giữ Suất Học Bổng'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
