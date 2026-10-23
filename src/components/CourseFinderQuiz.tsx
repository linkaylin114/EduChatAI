import React, { useState } from 'react';
import { COURSES } from '../data/coursesData';
import { Course } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle, 
  Bot, 
  BookOpen, 
  Send, 
  Check, 
  Calendar 
} from 'lucide-react';

interface CourseFinderQuizProps {
  onSelectCourse: (course: Course) => void;
  onOpenChatWithCourse: (course: Course) => void;
  onLeadSuccess: (name: string, courseName: string) => void;
}

export const CourseFinderQuiz: React.FC<CourseFinderQuizProps> = ({
  onSelectCourse,
  onOpenChatWithCourse,
  onLeadSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');
  const [schedule, setSchedule] = useState('');
  
  // Lead submission in quiz
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Determine best matching course based on selections
  const getMatchedCourse = (): Course => {
    if (goal === 'data') {
      return COURSES.find(c => c.id === 'data-ai-bootcamp') || COURSES[1];
    }
    if (goal === 'ielts') {
      return COURSES.find(c => c.id === 'ielts-global-tech') || COURSES[2];
    }
    if (goal === 'uiux') {
      return COURSES.find(c => c.id === 'ui-ux-design-pro') || COURSES[3];
    }
    if (goal === 'marketing') {
      return COURSES.find(c => c.id === 'digital-marketing-ai') || COURSES[4];
    }
    if (goal === 'mobile') {
      return COURSES.find(c => c.id === 'mobile-app-flutter') || COURSES[5];
    }
    return COURSES[0]; // Fullstack Web & AI
  };

  const handleReset = () => {
    setStep(1);
    setGoal('');
    setLevel('');
    setSchedule('');
    setIsSubmitted(false);
  };

  const handleQuickEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const matched = getMatchedCourse();
    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          courseId: matched.id,
          courseName: matched.title,
          source: 'quiz',
          notes: `Đăng ký từ bài Quiz Tìm Khóa Học: Mục tiêu: ${goal}, Trình độ: ${level}, Lịch học: ${schedule}`
        })
      });
      setIsSubmitted(true);
      onLeadSuccess(name, matched.title);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const matchedCourse = getMatchedCourse();

  return (
    <section id="quiz" className="py-16 md:py-24 bg-linear-to-b from-slate-900 to-indigo-950 text-white relative overflow-hidden">
      {/* Background ambient lights */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-3 border border-blue-400/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Course Matcher (Chính xác 98%)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Tìm Khóa Học Phù Hợp Nhất Với Bạn Trong 30 Giây
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Trả lời 3 câu hỏi nhanh để thuật toán AI gợi ý lộ trình tối ưu và mức học bổng áp dụng ngay hôm nay.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-400">
                {step <= 3 ? `BƯỚC ${step} TRÊN 3` : 'KẾT QUẢ PHÂN TÍCH'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step >= i ? 'w-8 bg-blue-500' : 'w-3 bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {step > 1 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
            )}
          </div>

          {/* STEP 1: GOAL */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                1. Mục tiêu nghề nghiệp lớn nhất của bạn trong 6 tháng tới là gì?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'fullstack', label: 'Lập trình Web Fullstack & Ứng dụng AI', desc: 'React, Next.js, Node.js, AI Agents' },
                  { id: 'data', label: 'Data Science & Machine Learning', desc: 'Phân tích dữ liệu kinh doanh, Python, BI' },
                  { id: 'ielts', label: 'Bứt phá IELTS 7.5+ & Tiếng Anh Toàn Cầu', desc: '4 kỹ năng, phỏng vấn ứng tuyển Global' },
                  { id: 'uiux', label: 'Thiết kế Sản phẩm UI/UX Chuyên Nghiệp', desc: 'Figma, Design System, UX Research' },
                  { id: 'marketing', label: 'Digital Marketing & AI Growth Hacking', desc: 'Chạy ads đa kênh, viral content với AI' },
                  { id: 'mobile', label: 'Lập trình Di Động Đa Nền Tảng', desc: 'Flutter & React Native phát hành App Store' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setGoal(opt.id);
                      setStep(2);
                    }}
                    className="p-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:border-blue-500 hover:bg-slate-700/60 text-left transition-all group flex flex-col justify-between"
                  >
                    <span className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                      {opt.label}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      {opt.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CURRENT LEVEL */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                2. Trình độ và kinh nghiệm hiện tại của bạn trong lĩnh vực này?
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'beginner', label: 'Hoàn toàn mới bắt đầu (Từ con số 0)', desc: 'Cần lộ trình hướng dẫn chi tiết từng bước căn bản.' },
                  { id: 'basic', label: 'Đã có kiến thức nền tảng / Tự học sơ cấp', desc: 'Muốn hệ thống hóa kiến thức và làm dự án thực chiến chuẩn chỉnh.' },
                  { id: 'working', label: 'Đã đi làm 1-2 năm, muốn nâng cấp kỹ năng mới', desc: 'Tập trung vào kiến trúc nâng cao, tối ưu và ứng dụng AI vào công việc.' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setLevel(opt.id);
                      setStep(3);
                    }}
                    className="w-full p-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:border-blue-500 hover:bg-slate-700/60 text-left transition-all group"
                  >
                    <div className="font-bold text-sm text-white group-hover:text-blue-300">
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4">
                3. Khung thời gian bạn có thể dành cho việc học mỗi tuần?
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'evening', label: 'Buổi tối trong tuần (19:30 - 21:30)', desc: 'Phù hợp người đi làm, sinh viên bận ban ngày.' },
                  { id: 'weekend', label: 'Cuối tuần Thứ 7 & Chủ Nhật', desc: 'Học tập trung 2 buổi cuối tuần.' },
                  { id: 'flexible', label: 'Linh hoạt kết hợp Video bài giảng + Mentor hỗ trợ 1:1', desc: 'Tự chủ thời gian học mọi lúc mọi nơi.' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSchedule(opt.id);
                      setStep(4); // Show result
                    }}
                    className="w-full p-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:border-blue-500 hover:bg-slate-700/60 text-left transition-all group"
                  >
                    <div className="font-bold text-sm text-white group-hover:text-blue-300">
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RESULT SCREEN */}
          {step === 4 && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              <div className="bg-linear-to-r from-blue-900/60 to-indigo-900/60 border border-blue-500/40 rounded-2xl p-5 sm:p-6">
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Độ Phù Hợp: 98%
                  </span>
                  <span className="text-xs text-slate-300">
                    Khai giảng: <strong className="text-white">{matchedCourse.nextBatch}</strong>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {matchedCourse.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {matchedCourse.shortDesc}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {matchedCourse.skills.slice(0, 5).map(skill => (
                    <span key={skill} className="text-xs bg-slate-800 text-blue-300 px-2.5 py-1 rounded-md font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Quick actions for course */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => onSelectCourse(matchedCourse)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Xem toàn bộ giáo trình</span>
                  </button>

                  <button
                    onClick={() => onOpenChatWithCourse(matchedCourse)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition-all"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Hỏi EduBot về học bổng khóa này</span>
                  </button>
                </div>

              </div>

              {/* Form to capture student lead from quiz */}
              <div className="bg-slate-900/80 border border-slate-700 p-5 rounded-2xl">
                <h4 className="text-sm font-bold text-white mb-1">
                  Đăng Ký Nhận Giáo Trình Chi Tiết & Giữ Suất Ưu Đãi 30%
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Chuyên viên học viện sẽ gửi file PDF bài giảng và liên hệ xếp lịch kiểm tra trình độ miễn phí.
                </p>

                {isSubmitted ? (
                  <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-xl p-4 text-center">
                    <Check className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                    <p className="text-xs font-bold text-emerald-200">
                      Đã ghi nhận đăng ký! Hệ thống đã gửi email thông báo tự động tới ban tuyển sinh.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickEnroll} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Họ và tên của bạn"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="px-3.5 py-2.5 bg-slate-800 text-white text-xs sm:text-sm rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại nhận tư vấn"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="px-3.5 py-2.5 bg-slate-800 text-white text-xs sm:text-sm rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-1.5 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Đang gửi...' : 'Nhận Tư Vấn Ngay'}</span>
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
