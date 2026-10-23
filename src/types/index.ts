export type LeadSource = 'chatbot' | 'landing_form' | 'quiz' | 'course_detail';

export type LeadStatus = 'new' | 'contacted' | 'testing' | 'enrolled' | 'cancelled';

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  badge?: string;
  description: string;
  shortDesc: string;
  duration: string;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao' | 'Mọi trình độ';
  originalPrice: number;
  price: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  thumbnail: string;
  modules: string[];
  skills: string[];
  schedule: string;
  nextBatch: string;
  instructor: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  };
}

export interface EmailNotificationLog {
  id: string;
  leadId: string;
  recipient: string;
  subject: string;
  sentAt: string;
  status: 'sent' | 'pending' | 'failed';
  previewHtml: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  courseId: string;
  courseName: string;
  source: LeadSource;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  chatSummary?: string;
  emailNotificationSent: boolean;
  emailNotificationLog?: EmailNotificationLog;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  recommendedCourseIds?: string[];
  leadCaptured?: {
    name?: string;
    phone?: string;
    email?: string;
    courseName?: string;
  };
}

export interface AnalyticsMetrics {
  totalVisitors: number;
  totalConversations: number;
  totalChatMessages: number;
  totalLeads: number;
  chatbotLeads: number;
  formLeads: number;
  quizLeads: number;
  enrolledLeads: number;
  chatbotConversionRate: number; // percentage
  overallConversionRate: number; // percentage
  totalRevenuePotential: number; // in VND
  emailNotificationsSentCount: number;
  popularCourses: { courseId: string; courseName: string; count: number; percentage: number }[];
  statusDistribution: { status: LeadStatus; label: string; count: number; color: string }[];
  dailyTrends: { date: string; leads: number; chatSessions: number }[];
  monthlyTrends: { month: string; leads: number; chatbotLeads: number; enrolled: number }[];
}

export interface NotificationSettings {
  admissionsEmail: string;
  enableInstantEmail: boolean;
  enableSoundAlert: boolean;
  autoMonthlyExportEnabled: boolean;
  exportScheduleDay: number; // e.g. 1 (1st day of month)
}
