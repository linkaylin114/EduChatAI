import React, { useState } from 'react';
import { Course } from '../types';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Send, 
  Check, 
  PhoneCall, 
  Mail, 
  User, 
  Bot 
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onConsultViaAI: (course: Course) => void;
  onLeadSuccess: (leadName: string, courseName: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onConsultViaAI,
  onLeadSuccess,
}) => {
  if (!course) return null;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ Họ tên và Số điện thoại.');
      return;
    }

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
          courseId: course.id,
          courseName: course.title,
          source: 'course_detail',
          notes: notes.trim() || `Đăng ký tư vấn trực tiếp từ trang chi tiết khóa học ${course.title}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Có lỗi xảy ra khi gửi thông tin.');
      }

      setIsSubmitted(true);
      onLeadSuccess(name, course.title);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi kết nối máy chủ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="relative bg-linear-to-r from-slate-900 via-indigo-950 to-blue-900 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold bg-blue-500/30 text-blue-200 px-2.5 py-0.5 rounded border border-blue-400/30">
              {course.category}
            </span>
            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              {course.rating} ({course.reviewsCount} học viên đánh giá)
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
            {course.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-blue-200/90 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Lịch học: {course.schedule}
            </span>
            <span className="flex items-center gap-1 text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              Khai giảng: {course.nextBatch}
            </span>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          
          {/* Overview & Pricing Box */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-blue-50/70 p-4 rounded-xl border border-blue-200">
            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Học phí ưu đãi tháng 10</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-blue-700">{formatVND(course.price)}</span>
                <span className="text-sm line-through text-slate-400">{formatVND(course.originalPrice)}</span>
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                  Tiết kiệm {course.discountPercent}%
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onConsultViaAI(course);
              }}
              className="inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all"
            >
              <Bot className="w-4 h-4" />
              <span>Hỏi EduBot về khóa này</span>
            </button>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-2">Giới thiệu chương trình</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Syllabus Modules */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>Lộ trình chi tiết các học phần</span>
              <span className="text-xs text-blue-600 font-semibold">{course.modules.length} modules</span>
            </h4>
            <div className="space-y-2">
              {course.modules.map((mod, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs sm:text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">{mod}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor profile */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Giảng viên phụ trách</span>
              <h5 className="text-sm font-bold text-slate-900">{course.instructor.name}</h5>
              <p className="text-xs text-slate-600">{course.instructor.role} • <strong>{course.instructor.company}</strong></p>
            </div>
          </div>

          {/* Consultation / Enrollment Form */}
          <div className="border-t border-slate-200 pt-6">
            <div className="text-center mb-4">
              <h4 className="text-base font-extrabold text-slate-900">
                Đăng Ký Tư Vấn & Giữ Suất Học Bổng Khóa Học
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Để lại thông tin, chuyên viên tuyển sinh EduVibe sẽ liên hệ lại trong vòng 15 phút.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center space-y-2 animate-in fade-in">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="text-sm font-bold text-emerald-900">Đăng ký thành công!</h5>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Cảm ơn bạn <strong>{name}</strong>! Thông tin của bạn đã được chuyển tới bộ phận tuyển sinh và hệ thống đã gửi email thông báo xác nhận tự động.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                  >
                    Đóng cửa sổ này
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Số điện thoại *</label>
                    <div className="relative">
                      <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="0912 345 678"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email nhận giáo trình (tùy chọn)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="ban@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mục tiêu học hoặc câu hỏi (nếu có)</label>
                  <textarea
                    rows={2}
                    placeholder="Ví dụ: Em muốn học tối để chuyển ngành, cần tư vấn chính sách trả góp..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-linear-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Đang gửi thông tin...' : 'Gửi Đăng Ký Tư Vấn Ngay'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
