import React, { useState, useEffect } from 'react';
import { Course } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseFinderQuiz } from './components/CourseFinderQuiz';
import { WhyEduVibe } from './components/WhyEduVibe';
import { Testimonials } from './components/Testimonials';
import { QuickLeadForm } from './components/QuickLeadForm';
import { Footer } from './components/Footer';
import { CourseDetailModal } from './components/CourseDetailModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { AdminDashboard } from './components/AdminDashboard';
import { CheckCircle2, Bell, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'admin'>('landing');
  const [selectedCourseForModal, setSelectedCourseForModal] = useState<Course | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTargetCourse, setChatTargetCourse] = useState<Course | null>(null);
  
  // Realtime notification toast
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);
  const [newLeadsCount, setNewLeadsCount] = useState(1);

  const showToast = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleLeadSuccess = (name: string, courseName: string) => {
    showToast(
      'Tiếp nhận đăng ký thành công!',
      `Học viên ${name} vừa được lưu vào hệ thống. Email tự động đã được gửi tới Ban Tuyển sinh.`
    );
    setNewLeadsCount(prev => prev + 1);
  };

  const handleConsultCourseViaAI = (course: Course) => {
    setChatTargetCourse(course);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* Realtime Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 max-w-sm bg-white border border-blue-200 rounded-2xl shadow-2xl p-4 flex items-start gap-3 animate-in slide-in-from-right duration-300">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h5 className="text-xs font-bold text-slate-900">{toastMessage.title}</h5>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{toastMessage.desc}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-slate-600 text-xs p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main View Router */}
      {currentView === 'landing' ? (
        <>
          <Header
            currentView={currentView}
            setCurrentView={setCurrentView}
            onOpenChat={() => {
              setChatTargetCourse(null);
              setIsChatOpen(true);
            }}
            newLeadsCount={newLeadsCount}
          />

          <main className="flex-1">
            {/* 1. Hero with AI counselor showcase */}
            <HeroSection
              onOpenChat={() => {
                setChatTargetCourse(null);
                setIsChatOpen(true);
              }}
              onOpenQuiz={() => {
                document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreCourses={() => {
                document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Course Catalog */}
            <CourseCatalog
              onSelectCourse={course => setSelectedCourseForModal(course)}
              onConsultCourseViaAI={handleConsultCourseViaAI}
            />

            {/* 3. Interactive Quiz Course Matcher */}
            <CourseFinderQuiz
              onSelectCourse={course => setSelectedCourseForModal(course)}
              onOpenChatWithCourse={handleConsultCourseViaAI}
              onLeadSuccess={handleLeadSuccess}
            />

            {/* 4. Why EduVibe Value Propositions */}
            <WhyEduVibe />

            {/* 5. Student Testimonials */}
            <Testimonials />

            {/* 6. Quick Consultation / Enrollment Lead Form */}
            <QuickLeadForm onLeadSuccess={handleLeadSuccess} />
          </main>

          <Footer />

          {/* Sticky Mobile Bottom Consultation Bar for High Conversion */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 flex items-center gap-2 shadow-lg">
            <button
              onClick={() => {
                setChatTargetCourse(null);
                setIsChatOpen(true);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tư Vấn Khóa Học AI</span>
            </button>
            <a
              href="#consultation"
              className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 text-white font-bold text-xs py-2.5 rounded-xl"
            >
              <span>Đăng Ký Tư Vấn</span>
            </a>
          </div>
        </>
      ) : (
        <AdminDashboard onBackToLanding={() => setCurrentView('landing')} />
      )}

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourseForModal}
        onClose={() => setSelectedCourseForModal(null)}
        onConsultViaAI={handleConsultCourseViaAI}
        onLeadSuccess={handleLeadSuccess}
      />

      {/* Floating AI Chatbot Widget (Always accessible) */}
      <ChatbotWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpen={() => setIsChatOpen(true)}
        initialCourse={chatTargetCourse}
        onSelectCourse={course => setSelectedCourseForModal(course)}
        onLeadCaptured={handleLeadSuccess}
      />

    </div>
  );
}
