import React, { useState } from 'react';
import { Course } from '../types';
import { COURSES, CATEGORIES } from '../data/coursesData';
import { 
  Star, 
  Clock, 
  Users, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Bot, 
  Calendar,
  CheckCircle,
  Tag
} from 'lucide-react';

interface CourseCatalogProps {
  onSelectCourse: (course: Course) => void;
  onConsultCourseViaAI: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onSelectCourse,
  onConsultCourseViaAI,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'Tất cả' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  return (
    <section id="courses" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-200/60">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Chương Trình Đào Tạo Chuẩn Doanh Nghiệp 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Các Khóa Học Xu Hướng & Thu Nhập Cao
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Giáo trình cập nhật công nghệ mới nhất, đồng hành cùng đội ngũ giảng viên kỳ cựu và trợ lý AI 24/7.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search & Level Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm khóa học, kỹ năng (React, Python, IELTS, Figma...)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-medium whitespace-nowrap">Trình độ:</span>
              <select
                value={selectedLevel}
                onChange={e => setSelectedLevel(e.target.value)}
                className="bg-white border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="all">Tất cả trình độ</option>
                <option value="Mọi trình độ">Mọi trình độ (Từ số 0)</option>
                <option value="Cơ bản">Cơ bản</option>
                <option value="Trung cấp">Trung cấp</option>
              </select>
              <span className="text-xs text-slate-400 ml-2 hidden md:inline">
                (Hiển thị {filteredCourses.length} khóa học)
              </span>
            </div>

          </div>

        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">Không tìm thấy khóa học nào phù hợp với từ khóa "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Tất cả'); setSelectedLevel('all'); }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200 hover:border-blue-400/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                
                {/* Course Thumbnail & Badges */}
                <div className="relative aspect-video overflow-hidden bg-slate-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                    {course.category}
                  </span>

                  {/* Highlights Badge */}
                  {course.badge && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-sm">
                      {course.badge}
                    </span>
                  )}

                  {/* Batch announcement bottom overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                    <span className="flex items-center gap-1 font-medium bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                      <Calendar className="w-3.5 h-3.5 text-blue-300" />
                      Khai giảng: {course.nextBatch}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-amber-300 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                      <Star className="w-3.5 h-3.5 fill-amber-300" />
                      {course.rating} ({course.reviewsCount})
                    </span>
                  </div>
                </div>

                {/* Course Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2.5">
                    
                    {/* Meta info row */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {course.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {course.studentsCount} học viên
                      </span>
                      <span>•</span>
                      <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px] font-semibold">
                        {course.level}
                      </span>
                    </div>

                    {/* Course Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {course.shortDesc}
                    </p>

                    {/* Skills pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.skills.slice(0, 4).map(skill => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 4 && (
                        <span className="text-[10px] font-medium bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-md">
                          +{course.skills.length - 4}
                        </span>
                      )}
                    </div>

                  </div>

                  {/* Pricing and Action row */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    
                    {/* Price with Discount */}
                    <div className="flex items-baseline justify-between">
                      <div>
                        <div className="text-xl font-extrabold text-blue-700">
                          {formatVND(course.price)}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span className="line-through">{formatVND(course.originalPrice)}</span>
                          <span className="text-[11px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded">
                            -{course.discountPercent}%
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                          Học bổng còn 5 suất
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
                      >
                        <span>Chi tiết khóa</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onConsultCourseViaAI(course)}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all"
                      >
                        <Bot className="w-3.5 h-3.5 text-blue-600" />
                        <span>Tư vấn qua AI</span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
