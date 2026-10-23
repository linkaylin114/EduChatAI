import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'fullstack-ai',
    title: 'Fullstack Web & AI Agent Developer',
    slug: 'fullstack-web-ai-agent',
    category: 'Lập trình & AI',
    badge: 'Bán chạy nhất 2026',
    shortDesc: 'Làm chủ React 19, Next.js 15, Node.js và tích hợp AI Gemini Agents vào hệ thống thực tế.',
    description: 'Chương trình đào tạo toàn diện từ nền tảng lập trình web hiện đại đến xây dựng các ứng dụng tích hợp Trí tuệ Nhân tạo thế hệ mới (AI Agents, LLM APIs, Vector Search). Học viên được hướng dẫn xây dựng 4 dự án thực chiến chuẩn doanh nghiệp.',
    duration: '5.5 tháng (120 giờ)',
    level: 'Mọi trình độ',
    originalPrice: 16500000,
    price: 11900000,
    discountPercent: 28,
    rating: 4.95,
    reviewsCount: 342,
    studentsCount: 1480,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    modules: [
      'Nền tảng Modern JavaScript (ES2024+), TypeScript & Git',
      'Frontend Master: React 19, Tailwind CSS, State Management',
      'Backend & Database: Node.js, Express, PostgreSQL, REST & GraphQL',
      'AI Engineering: Tích hợp Gemini API, Prompt Engineering, RAG & Agents',
      'Đồ án tốt nghiệp: Triển khai Fullstack AI SaaS lên Cloud (Docker, CI/CD)'
    ],
    skills: ['React 19', 'Next.js', 'Node.js', 'TypeScript', 'Gemini AI API', 'PostgreSQL', 'Docker'],
    schedule: 'Tối Thứ 2 - 4 - 6 (19:30 - 21:30) hoặc Cuối tuần T7 - CN',
    nextBatch: '25/10/2026',
    instructor: {
      name: 'Trần Minh Đức',
      role: 'Principal Tech Lead & AI Architect',
      company: 'Ex-Shopee, FPT Software',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'data-ai-bootcamp',
    title: 'Data Science & Machine Learning Bootcamp',
    slug: 'data-science-machine-learning',
    category: 'Dữ liệu & AI',
    badge: 'Cơ hội việc làm cao',
    shortDesc: 'Từ phân tích dữ liệu kinh doanh đến xây dựng mô hình AI dự báo và thị giác máy tính.',
    description: 'Trang bị trọn gói tư duy phân tích dữ liệu, Python chuyên sâu, xử lý dữ liệu lớn với Pandas/Numpy, trực quan hóa Dashboard kinh doanh (PowerBI, Tableau) và huấn luyện mô hình Machine Learning / Deep Learning thực tế.',
    duration: '4.5 tháng (100 giờ)',
    level: 'Cơ bản',
    originalPrice: 15000000,
    price: 10500000,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 275,
    studentsCount: 960,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    modules: [
      'Python for Data Science, Pandas, Numpy & Data Wrangling',
      'Thống kê ứng dụng & Trực quan hóa dữ liệu kinh doanh',
      'Xây dựng Dashboard tự động với Power BI và Python Streamlit',
      'Machine Learning: Hồi quy, Phân loại, Clustering & Model Tuning',
      'Deep Learning & NLP ứng dụng phân tích hành vi khách hàng'
    ],
    skills: ['Python', 'Pandas', 'Machine Learning', 'Power BI', 'SQL', 'NLP', 'Data Analytics'],
    schedule: 'Tối Thứ 3 - 5 - 7 (19:30 - 21:30)',
    nextBatch: '28/10/2026',
    instructor: {
      name: 'Nguyễn Thị Hải Yến',
      role: 'Head of Data Analytics',
      company: 'Tiki & VinAI Research',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'ielts-global-tech',
    title: 'IELTS Master 7.5+ & Tiếng Anh Công Nghệ Toàn Cầu',
    slug: 'ielts-tieng-anh-cong-nghe',
    category: 'Ngoại ngữ & Kỹ năng',
    badge: 'Cam kết đầu ra 7.0+',
    shortDesc: 'Luyện thi IELTS tăng tốc kết hợp tiếng Anh phỏng vấn xin việc cho các tập đoàn đa quốc gia.',
    description: 'Phương pháp học hiện đại tối ưu 4 kỹ năng Nghe - Nói - Đọc - Viết với sự hỗ trợ sửa bài chi tiết từ AI và Giảng viên 8.5 IELTS. Luyện phỏng vấn chuyên sâu cho ngành Tech, Finance và học bổng du học.',
    duration: '3.5 tháng (80 giờ)',
    level: 'Mọi trình độ',
    originalPrice: 12500000,
    price: 8900000,
    discountPercent: 29,
    rating: 4.92,
    reviewsCount: 410,
    studentsCount: 1850,
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    modules: [
      'Chiến thuật Listening & Reading bứt phá band 7.5 - 8.5',
      'Speaking phản xạ tự nhiên & Phỏng vấn ứng tuyển công ty Global',
      'Writing Task 1 & Task 2: Cấu trúc lập luận chặt chẽ và từ vựng Academic',
      'Sửa bài 1:1 hàng tuần với cựu Giám khảo IELTS',
      'Thi thử Mock Test chuẩn phòng thi máy tính quốc tế'
    ],
    skills: ['IELTS 7.5+', 'Tech English', 'Interview Coaching', 'Academic Writing', 'Public Speaking'],
    schedule: 'Tối Thứ 2 - 4 - 6 hoặc Sáng T7 - CN (09:00 - 11:30)',
    nextBatch: '20/10/2026',
    instructor: {
      name: 'Marcus Daniel & ThS. Lê Hoàng',
      role: 'IELTS 8.5 Overall & Senior Trainer',
      company: 'British Council Alumni & Fulbright',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'ui-ux-design-pro',
    title: 'UI/UX & Product Design Chuyên Nghiệp',
    slug: 'ui-ux-product-design-pro',
    category: 'Thiết kế & Sáng tạo',
    badge: 'Thực chiến dự án',
    shortDesc: 'Làm chủ Figma, UX Research, Design System và xây dựng Portfolio đỉnh cao thu hút nhà tuyển dụng.',
    description: 'Chương trình thiết kế sản phẩm số thực chiến từ việc thấu cảm người dùng (User Research), vẽ sơ đồ luồng (User Journey), wireframe đến thiết kế giao diện UI bóng bẩy trên Figma và tạo prototype tương tác cao.',
    duration: '3.5 tháng (75 giờ)',
    level: 'Cơ bản',
    originalPrice: 11500000,
    price: 7900000,
    discountPercent: 31,
    rating: 4.88,
    reviewsCount: 198,
    studentsCount: 820,
    thumbnail: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80',
    modules: [
      'Tư duy thiết kế trải nghiệm người dùng (UX Thinking & Research)',
      'Figma Masterclass: Auto-layout, Components, Variants & Variables',
      'Xây dựng Design System quy chuẩn cho doanh nghiệp',
      'Micro-interactions & Prototyping nâng cao',
      'Hoàn thiện Portfolio chuẩn quốc tế trên Behance & Dribbble'
    ],
    skills: ['Figma', 'UX Research', 'Design Systems', 'Wireframing', 'Prototyping', 'Usability Testing'],
    schedule: 'Tối Thứ 3 - 5 (19:30 - 21:30) & Chiều Chủ Nhật',
    nextBatch: '24/10/2026',
    instructor: {
      name: 'Vũ Thanh Hằng',
      role: 'Lead Product Designer',
      company: 'MoMo & VNG Games',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'digital-marketing-ai',
    title: 'Digital Marketing & AI Growth Hacking',
    slug: 'digital-marketing-growth-ai',
    category: 'Marketing & Kinh doanh',
    badge: 'Ứng dụng AI mới nhất',
    shortDesc: 'Tối ưu hiệu quả quảng cáo đa kênh Facebook/Google/TikTok Ads kết hợp tự động hóa nội dung với AI.',
    description: 'Khóa học dành cho Marketer và Chủ doanh nghiệp muốn đột phá doanh số: Lập chiến lược Performance Marketing, chạy ads tối ưu chi phí, SEO lên top Google và ứng dụng các công cụ AI để sản xuất nội dung viral thần tốc.',
    duration: '3 tháng (65 giờ)',
    level: 'Mọi trình độ',
    originalPrice: 9800000,
    price: 6800000,
    discountPercent: 30,
    rating: 4.86,
    reviewsCount: 165,
    studentsCount: 710,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    modules: [
      'Chiến lược Digital Marketing đa kênh & Xác định chân dung khách hàng',
      'Facebook & TikTok Ads Master: Tối ưu chi phí CPL / CPA',
      'Google Ads (Search, Performance Max) & SEO bền vững',
      'Sáng tạo nội dung với Gemini & AI Tools (Video, Copywriting, Visual)',
      'Đo lường chuyển đổi với Google Analytics 4 (GA4) & CRM Funnel'
    ],
    skills: ['Facebook Ads', 'Google Ads', 'TikTok Ads', 'GA4', 'AI Content Creation', 'Growth Hacking'],
    schedule: 'Tối Thứ 2 - 4 (19:30 - 21:30) & Sáng Thứ 7',
    nextBatch: '26/10/2026',
    instructor: {
      name: 'Đặng Tuấn Anh',
      role: 'Chief Marketing Officer (CMO)',
      company: 'GrowthX Media & TopCV',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    }
  },
  {
    id: 'mobile-app-flutter',
    title: 'Lập trình Mobile Đa Nền Tảng với Flutter & React Native',
    slug: 'mobile-developer-flutter-react-native',
    category: 'Lập trình & AI',
    badge: 'Nhu cầu tuyển dụng cao',
    shortDesc: 'Xây dựng ứng dụng di động iOS & Android từ một cơ sở mã nguồn duy nhất, đẩy app lên App Store/CH Play.',
    description: 'Học viên sẽ tự tay phát triển các ứng dụng di động thương mại thực tế: Tích hợp thanh toán trực tuyến, thông báo đẩy (Push Notifications), định vị bản đồ và đồng bộ dữ liệu thời gian thực.',
    duration: '4 tháng (90 giờ)',
    level: 'Trung cấp',
    originalPrice: 14000000,
    price: 9900000,
    discountPercent: 29,
    rating: 4.89,
    reviewsCount: 142,
    studentsCount: 630,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    modules: [
      'Dart & Flutter Core: Kiến trúc Widget, State Management (Bloc / Riverpod)',
      'React Native & Expo: Kết nối Native APIs và hiệu năng mượt mà',
      'Tích hợp Backend API, Xác thực OAuth & Thanh toán (MoMo, ZaloPay, Stripe)',
      'Offline Storage, Push Notification & Background Sync',
      'Tối ưu hóa hiệu năng và quy trình phát hành App Store & Google Play'
    ],
    skills: ['Flutter', 'Dart', 'React Native', 'Mobile UI', 'REST API', 'App Store Deployment'],
    schedule: 'Tối Thứ 3 - 5 - 7 (19:30 - 21:30)',
    nextBatch: '30/10/2026',
    instructor: {
      name: 'Phạm Quang Minh',
      role: 'Mobile Tech Lead',
      company: 'Grab & VNPay',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80'
    }
  }
];

export const CATEGORIES = [
  'Tất cả',
  'Lập trình & AI',
  'Dữ liệu & AI',
  'Ngoại ngữ & Kỹ năng',
  'Thiết kế & Sáng tạo',
  'Marketing & Kinh doanh'
];
