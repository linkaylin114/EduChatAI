import React from 'react';
import { Star, Quote, Building2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Lê Hoàng Minh',
      role: 'Frontend Engineer tại Shopee',
      course: 'Fullstack Web & AI Agent Developer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: 'Mình xuất thân từ ngành Cơ khí, chưa từng học code. Sau 5 tháng theo học tại EduVibe, với sự hỗ trợ sửa code ngày đêm của EduBot và giảng viên nhiệt tình, mình đã pass vòng phỏng vấn Frontend tại Shopee với mức lương khởi điểm 19 triệu.'
    },
    {
      name: 'Phạm Thùy Dương',
      role: 'Data Analyst tại MoMo',
      course: 'Data Science & Machine Learning Bootcamp',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: 'Khóa Data Science dạy rất thực chiến, tập trung sâu vào bài toán kinh doanh thực tế chứ không chỉ lý thuyết toán khô khan. Đồ án xây dựng Dashboard dự báo retention giúp mình gây ấn tượng mạnh với Lead phỏng vấn.'
    },
    {
      name: 'Nguyễn Tiến Đạt',
      role: 'IELTS 8.0 & Software Engineer tại FPT',
      course: 'IELTS Master 7.5+ & Tiếng Anh Toàn Cầu',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: 'Kỹ năng Speaking và Writing của mình lên band vù vù nhờ việc luyện phản xạ với AI và sửa bài 1:1 với thầy Marcus. Đặc biệt phần luyện phỏng vấn tiếng Anh đã giúp mình tự tin apply vào dự án onsite Nhật Bản.'
    }
  ];

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Câu Chuyện Thành Công
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Học Viên Nói Gì Về Trải Nghiệm Học Tại EduVibe?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Hàng nghìn học viên đã chuyển ngành thành công và đạt được mức thu nhập mơ ước.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <Quote className="w-8 h-8 text-blue-200 absolute top-4 right-4" />
              
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{r.content}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{r.name}</h4>
                  <p className="text-xs text-blue-600 font-semibold">{r.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{r.course}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
