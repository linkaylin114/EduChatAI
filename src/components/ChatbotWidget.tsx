import React, { useState, useEffect, useRef } from 'react';
import { Course, ChatMessage } from '../types';
import { COURSES } from '../data/coursesData';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Minimize2, 
  RotateCcw, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap,
  MessageSquare,
  ChevronDown
} from 'lucide-react';

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialCourse?: Course | null;
  onSelectCourse: (course: Course) => void;
  onLeadCaptured: (name: string, courseName: string) => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  isOpen,
  onClose,
  onOpen,
  initialCourse,
  onSelectCourse,
  onLeadCaptured,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: 'Chào bạn! Mình là EduBot - Cố vấn Học tập & Tuyển sinh AI của Học viện EduVibe 🎓.\n\nMình có thể giúp bạn tìm khóa học phù hợp với định hướng nghề nghiệp, kiểm tra học phí, ưu đãi học bổng tháng 10 và xếp lịch test năng lực miễn phí.\n\nBạn đang quan tâm đến lĩnh vực nào (Lập trình Web/AI, Data Science, IELTS, UI/UX hay Digital Marketing)?',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [showInlineLeadForm, setShowInlineLeadForm] = useState(false);

  // Mini lead form states inside chat
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [isSubmittingInlineLead, setIsSubmittingInlineLead] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [isOpen, messages]);

  // When initialCourse changes (e.g. user clicked "Tư vấn khóa này qua AI")
  useEffect(() => {
    if (initialCourse && isOpen) {
      const coursePrompt = `Tôi muốn được tư vấn chi tiết về khóa học "${initialCourse.title}". Khóa này học những gì, thời gian bao lâu và có ưu đãi học bổng gì không?`;
      handleSendMessage(coursePrompt);
    }
  }, [initialCourse]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newMessages.slice(-6).map(m => ({ role: m.role, content: m.content })),
          currentLeadDraft: {
            name: studentName,
            email: studentEmail
          }
        }),
      });

      if (!res.ok) {
        throw new Error('Lỗi phản hồi từ server');
      }

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Cảm ơn bạn đã liên hệ! EduBot rất sẵn lòng hỗ trợ bạn.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        recommendedCourseIds: data.recommendedCourseIds || [],
        leadCaptured: data.leadCaptured,
      };

      setMessages(prev => [...prev, botMsg]);

      // If lead was automatically captured from text (e.g. user gave phone number)
      if (data.leadCaptured && data.createdLead) {
        onLeadCaptured(data.createdLead.name, data.createdLead.courseName);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'assistant',
          content: 'Xin lỗi bạn, kết nối tạm thời gián đoạn. Bạn có thể để lại số điện thoại tại đây hoặc gọi ngay Hotline 1900 8899 để chuyên viên liên hệ hỗ trợ bạn nhé!',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: 'Cuộc trò chuyện đã được làm mới. Bạn cần EduBot tư vấn về khóa học hay lộ trình nào hôm nay?',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  const handleInlineLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentPhone.trim()) return;

    setIsSubmittingInlineLead(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: studentName.trim(),
          phone: studentPhone.trim(),
          email: studentEmail.trim(),
          courseId: initialCourse?.id || 'fullstack-ai',
          courseName: initialCourse?.title || 'Khóa học được tư vấn qua AI Chatbot',
          source: 'chatbot',
          notes: 'Khách hàng điền thông tin qua form trực tiếp bên trong cửa sổ Chatbot AI.'
        })
      });

      if (res.ok) {
        setShowInlineLeadForm(false);
        onLeadCaptured(studentName, initialCourse?.title || 'Khóa học tư vấn');
        setMessages(prev => [
          ...prev,
          {
            id: `bot-confirm-${Date.now()}`,
            role: 'assistant',
            content: `Tuyệt vời! EduBot đã lưu thông tin của bạn (${studentName} - ${studentPhone}). Hệ thống đã chuyển yêu cầu đến bộ phận Tuyển sinh và gửi email xác nhận. Chuyên viên sẽ liên hệ lại với bạn trong ít phút để gửi tài liệu và ưu đãi học bổng nhé! 🎉`,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          }
        ]);
        setStudentName('');
        setStudentPhone('');
        setStudentEmail('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingInlineLead(false);
    }
  };

  return (
    <>
      {/* Floating launcher button (shown when closed) */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
          {/* Unread greeting preview tooltip */}
          <div 
            onClick={onOpen}
            className="hidden sm:flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/90 text-xs text-slate-800 font-semibold cursor-pointer hover:bg-slate-50 transition-all animate-bounce"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span>Cần tư vấn lộ trình học? Nhắn với EduBot nhé! 🎓</span>
          </div>

          <button
            onClick={onOpen}
            className="relative w-14 h-14 rounded-full bg-linear-to-tr from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center shadow-xl shadow-blue-500/30 transition-transform active:scale-95 group"
            aria-label="Open AI counselor chat"
          >
            <Bot className="w-7 h-7" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
          </button>
        </div>
      )}

      {/* Chat Window / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 z-50 sm:w-[420px] sm:h-[620px] flex flex-col bg-white sm:rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-blue-900 px-4 py-3.5 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  EduBot - Cố Vấn Tuyển Sinh AI
                </h3>
                <p className="text-[11px] text-blue-200/90 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Gemini 3.8 Flash • Phản hồi 24/7
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleResetChat}
                title="Làm mới cuộc trò chuyện"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                title="Đóng / Thu nhỏ"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronDown className="w-5 h-5 hidden sm:block" />
                <X className="w-5 h-5 sm:hidden" />
              </button>
            </div>
          </div>

          {/* Quick Suggestions Chips Bar */}
          <div className="bg-slate-50 border-b border-slate-200/80 px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0 text-[11px]">
            <span className="text-slate-400 font-semibold shrink-0">Gợi ý:</span>
            {[
              'Lập trình Web & AI cho người mới',
              'Khóa Data Science học bao lâu?',
              'Học phí & ưu đãi tháng 10',
              'Chính sách cam kết việc làm',
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(chip)}
                className="whitespace-nowrap bg-white border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-700 px-2.5 py-1 rounded-full font-medium transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap shadow-2xs ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Render Recommended Course Cards if provided */}
                  {msg.recommendedCourseIds && msg.recommendedCourseIds.length > 0 && (
                    <div className="space-y-2 pt-1 text-left">
                      {msg.recommendedCourseIds.map(cId => {
                        const course = COURSES.find(c => c.id === cId);
                        if (!course) return null;
                        return (
                          <div
                            key={cId}
                            className="bg-white border border-blue-200 rounded-xl p-3 shadow-xs hover:border-blue-400 transition-all text-xs"
                          >
                            <div className="flex justify-between items-start font-bold text-slate-900">
                              <span className="line-clamp-1">{course.title}</span>
                              <span className="text-blue-600 font-extrabold shrink-0 ml-2">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                              {course.shortDesc}
                            </p>
                            <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100">
                              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                                Khai giảng: {course.nextBatch}
                              </span>
                              <button
                                onClick={() => {
                                  onSelectCourse(course);
                                  onClose();
                                }}
                                className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <span>Xem giáo trình</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Show captured lead confirmation badge */}
                  {msg.leadCaptured && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs text-emerald-800 flex items-center gap-2 text-left">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Đã tự động lưu thông tin ({msg.leadCaptured.phone}). Tuyển sinh sẽ liên hệ sớm!
                      </span>
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 px-1 inline-block">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Inline Quick Lead Capture Accordion / Toggle */}
          {showInlineLeadForm ? (
            <div className="p-3 bg-blue-50/90 border-t border-blue-200 shrink-0 animate-in slide-in-from-bottom duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                  Để Lại Thông Tin - Tuyển Sinh Gọi Lại
                </span>
                <button 
                  onClick={() => setShowInlineLeadForm(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Đóng
                </button>
              </div>
              <form onSubmit={handleInlineLeadSubmit} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Họ tên của bạn"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại"
                    value={studentPhone}
                    onChange={e => setStudentPhone(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email nhận giáo trình (tùy chọn)"
                    value={studentEmail}
                    onChange={e => setStudentEmail(e.target.value)}
                    className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingInlineLead}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors"
                  >
                    {isSubmittingInlineLead ? 'Đang gửi...' : 'Gửi liên hệ'}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="px-3 py-1.5 bg-blue-50/50 border-t border-slate-200/80 flex items-center justify-between text-[11px] shrink-0">
              <span className="text-slate-500">Muốn tuyển sinh liên hệ qua SĐT?</span>
              <button
                onClick={() => setShowInlineLeadForm(true)}
                className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Để lại SĐT tư vấn</span>
              </button>
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Nhập câu hỏi hoặc SĐT để nhận tư vấn..."
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 bg-slate-100 rounded-xl border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center justify-center shrink-0 shadow-xs disabled:opacity-40 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[10px] text-center text-slate-400 mt-1">
              EduBot sử dụng Gemini 3.8 Flash • Tư vấn & lưu thông tin học viên tự động
            </div>
          </div>

        </div>
      )}
    </>
  );
};
