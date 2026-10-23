import React from 'react';
import { 
  Bot, 
  Briefcase, 
  Award, 
  Code2, 
  Users2, 
  Headphones, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export const WhyEduVibe: React.FC = () => {
  const features = [
    {
      icon: Bot,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      title: 'Trợ Lý AI Mentor 24/7',
      desc: 'Giải đáp thắc mắc, sửa lỗi code bug, chấm bài tập và giải thích ngữ pháp tức thì bất kể ngày đêm với công nghệ Gemini 3.8 Flash.'
    },
    {
      icon: Briefcase,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      title: 'Cam Kết Việc Làm Bằng Hợp Đồng',
      desc: 'Hoàn lại 100% học phí nếu không nhận được offer việc làm sau 6 tháng tốt nghiệp theo đúng điều khoản cam kết đào tạo.'
    },
    {
      icon: Code2,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      title: '100% Dự Án Thực Chiến Doanh Nghiệp',
      desc: 'Học viên không chỉ học lý thuyết mà tự tay xây dựng các sản phẩm thực tế để đưa vào Portfolio và CV tuyển dụng.'
    },
    {
      icon: Users2,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      title: 'Giảng Viên Đến Từ Big Tech & Unicorn',
      desc: 'Đội ngũ chuyên gia từ Google, Shopee, FPT Software, MoMo, Tiki với trên 8 năm kinh nghiệm thực chiến dày dặn.'
    },
    {
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      title: 'Chứng Chỉ Nghề Chuẩn Quốc Tế',
      desc: 'Chứng nhận hoàn thành khóa học có mã định danh xác thực trực tuyến, được các doanh nghiệp đối tác đánh giá cao.'
    },
    {
      icon: Headphones,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      title: 'Hỗ Trợ Tuyển Sinh & Kèm 1:1',
      desc: 'Trợ giảng hỗ trợ trực tiếp từng buổi học, review mã nguồn chi tiết và định hướng nghề nghiệp 1:1 trước khi ra trường.'
    }
  ];

  return (
    <section id="why" className="py-16 md:py-24 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/70 px-3 py-1 rounded-full">
            Giá Trị Khác Biệt
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tại Sao Hơn 4.800+ Học Viên Chọn EduVibe?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Mô hình đào tạo tiên phong kết hợp giữa Chuyên gia thực chiến hàng đầu và Sức mạnh Trí tuệ Nhân tạo thế hệ mới.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all duration-200 space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Banner stat bar */}
        <div className="mt-14 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-blue-500/15">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-4xl font-black">4.800+</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">Học viên tốt nghiệp</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black">96.8%</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">Tỷ lệ có việc làm</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black">150+</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">Doanh nghiệp đối tác</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-black">18.5M</div>
              <div className="text-xs sm:text-sm text-blue-100 mt-1 font-medium">Mức lương khởi điểm TB</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
