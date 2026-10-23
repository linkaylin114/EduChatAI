import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, LeadSource, AnalyticsMetrics, EmailNotificationLog } from '../types';
import { 
  Users, 
  Bot, 
  TrendingUp, 
  DollarSign, 
  Mail, 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  RefreshCw, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X, 
  FileSpreadsheet, 
  Eye, 
  Send, 
  Settings, 
  BarChart3, 
  Trash2,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToLanding: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToLanding }) => {
  const [activeTab, setActiveTab] = useState<'leads' | 'charts' | 'emails' | 'export'>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsMetrics | null>(null);
  const [notifications, setNotifications] = useState<EmailNotificationLog[]>([]);
  const [recipientEmail, setRecipientEmail] = useState('linkaylin411@gmail.com');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);
  const [selectedEmailPreview, setSelectedEmailPreview] = useState<EmailNotificationLog | null>(null);
  const [exportMonth, setExportMonth] = useState('2026-10');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState('');
  const [testEmailMsg, setTestEmailMsg] = useState('');

  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      // 1. Fetch Leads
      let url = '/api/leads?';
      if (statusFilter !== 'all') url += `status=${statusFilter}&`;
      if (sourceFilter !== 'all') url += `source=${sourceFilter}&`;
      if (monthFilter !== 'all') url += `month=${monthFilter}&`;
      if (searchQuery.trim()) url += `search=${encodeURIComponent(searchQuery.trim())}&`;

      const [resLeads, resAnalytics, resNotifs] = await Promise.all([
        fetch(url),
        fetch('/api/analytics'),
        fetch('/api/notifications')
      ]);

      if (resLeads.ok) setLeads(await resLeads.json());
      if (resAnalytics.ok) setAnalytics(await resAnalytics.json());
      if (resNotifs.ok) {
        const notifData = await resNotifs.json();
        setNotifications(notifData.logs || []);
        if (notifData.settings?.admissionsEmail) {
          setRecipientEmail(notifData.settings.admissionsEmail);
        }
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [statusFilter, sourceFilter, monthFilter, searchQuery]);

  // Handle lead status update
  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLeads(prev => prev.map(l => l.id === leadId ? updated : l));
        // Refresh analytics
        fetch('/api/analytics').then(r => r.json()).then(setAnalytics);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle lead note update
  const handleSaveNotes = async (leadId: string, notes: string) => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLeads(prev => prev.map(l => l.id === leadId ? updated : l));
        if (selectedLeadForDetail?.id === leadId) {
          setSelectedLeadForDetail(updated);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle lead delete
  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm('Bạn có chắc muốn xóa lead này khỏi danh sách?')) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== leadId));
        if (selectedLeadForDetail?.id === leadId) setSelectedLeadForDetail(null);
        fetch('/api/analytics').then(r => r.json()).then(setAnalytics);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Trigger Excel download
  const handleDownloadExcel = (monthParam?: string) => {
    setIsExporting(true);
    const targetUrl = monthParam && monthParam !== 'all' 
      ? `/api/export/excel?month=${monthParam}`
      : '/api/export/excel';
    
    // Trigger download
    const link = document.createElement('a');
    link.href = targetUrl;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsExporting(false);
      setExportSuccessMsg(`Đã tạo và tải file Excel ${monthParam && monthParam !== 'all' ? `kỳ ${monthParam}` : 'toàn bộ'} thành công!`);
      setTimeout(() => setExportSuccessMsg(''), 4000);
    }, 800);
  };

  // Test email trigger
  const handleTriggerTestEmail = async () => {
    setTestEmailMsg('Đang gửi email thông báo mẫu...');
    try {
      const res = await fetch('/api/notifications/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (res.ok) {
        setTestEmailMsg(`Đã gửi thông báo mẫu thành công tới ${recipientEmail}!`);
        // Refresh notifications
        const notifRes = await fetch('/api/notifications');
        if (notifRes.ok) {
          const notifData = await notifRes.json();
          setNotifications(notifData.logs || []);
        }
      } else {
        setTestEmailMsg('Gửi thất bại.');
      }
    } catch (err) {
      setTestEmailMsg('Lỗi gửi email.');
    }
    setTimeout(() => setTestEmailMsg(''), 5000);
  };

  const formatVND = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'new':
        return <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Mới nhận</span>;
      case 'contacted':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Đang tư vấn</span>;
      case 'testing':
        return <span className="bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Hẹn lịch test</span>;
      case 'enrolled':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Đã nhập học</span>;
      case 'cancelled':
        return <span className="bg-rose-100 text-rose-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">Đã hủy/Không hợp</span>;
      default:
        return null;
    }
  };

  const getSourceBadge = (source: LeadSource) => {
    switch (source) {
      case 'chatbot':
        return (
          <span className="inline-flex items-center gap-1 bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-md">
            <Bot className="w-3 h-3 text-blue-600" />
            AI Chatbot
          </span>
        );
      case 'quiz':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Quiz Tìm Khóa
          </span>
        );
      case 'course_detail':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-50 border border-purple-200 text-purple-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
            Trang Chi Tiết
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md">
            Landing Form
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 pb-16">
      
      {/* Top Banner Navigation */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToLanding}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
            >
              ← Về Trang Học Viên
            </button>
            <div className="h-4 w-px bg-slate-700 hidden sm:block" />
            <div>
              <h1 className="text-base sm:text-lg font-extrabold flex items-center gap-2">
                <span>Dashboard Quản Lý Tuyển Sinh & CRM</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Realtime Active
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Theo dõi chuyển đổi từ Trợ lý AI Gemini 3.8 Flash & Phễu tuyển sinh
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={fetchDashboardData}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Làm mới</span>
            </button>

            <button
              onClick={() => handleDownloadExcel()}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-lg shadow-xs transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Xuất File Excel</span>
            </button>
          </div>

        </div>

        {/* Tab Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 sm:space-x-4 border-t border-slate-800 overflow-x-auto text-xs sm:text-sm font-semibold">
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'leads'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Danh Sách Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('charts')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'charts'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Báo Cáo Phân Tích & Biểu Đồ</span>
          </button>

          <button
            onClick={() => setActiveTab('emails')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'emails'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Thông Báo Email ({notifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'border-blue-500 text-blue-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Xuất Định Kỳ Hàng Tháng</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Success Alert Banner for Excel / Email */}
        {exportSuccessMsg && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{exportSuccessMsg}</span>
            </div>
            <button onClick={() => setExportSuccessMsg('')}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {testEmailMsg && (
          <div className="bg-blue-50 border border-blue-300 text-blue-800 p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{testEmailMsg}</span>
            </div>
            <button onClick={() => setTestEmailMsg('')}>
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Top KPI Cards Row */}
        {analytics && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Total Leads */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Tổng Leads Tuyển Sinh</span>
                <span className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Users className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                {analytics.totalLeads}
              </div>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+24% so với tháng trước</span>
              </div>
            </div>

            {/* Card 2: Chatbot Leads & Conversion Rate */}
            <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-2xs space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between text-xs text-blue-900 font-semibold">
                <span>Leads Từ AI Chatbot</span>
                <span className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <Bot className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-blue-700">
                  {analytics.chatbotLeads}
                </span>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  CR: {analytics.chatbotConversionRate}%
                </span>
              </div>
              <div className="text-[11px] text-slate-500">
                Đóng góp {analytics.totalLeads > 0 ? Math.round((analytics.chatbotLeads / analytics.totalLeads) * 100) : 0}% tổng nguồn đăng ký
              </div>
            </div>

            {/* Card 3: Enrolled Students */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Học Viên Đã Nhập Học</span>
                <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">
                {analytics.enrolledLeads}
              </div>
              <div className="text-[11px] text-slate-500">
                Doanh thu: ~{formatVND(analytics.totalRevenuePotential)}
              </div>
            </div>

            {/* Card 4: Email Notifications */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                <span>Email Tự Động Đã Gửi</span>
                <span className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <Mail className="w-4 h-4" />
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900">
                {analytics.emailNotificationsSentCount}
              </div>
              <div className="text-[11px] text-slate-500 truncate" title={recipientEmail}>
                Tới: <strong>{recipientEmail}</strong>
              </div>
            </div>

          </div>
        )}

        {/* TAB 1: LEADS PIPELINE & TABLE */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                
                {/* Search */}
                <div className="relative lg:col-span-2">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm tên, SĐT, email, khóa học..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="new">Mới nhận</option>
                    <option value="contacted">Đang tư vấn</option>
                    <option value="testing">Hẹn lịch test</option>
                    <option value="enrolled">Đã nhập học</option>
                    <option value="cancelled">Hủy/Không hợp</option>
                  </select>
                </div>

                {/* Source Filter */}
                <div>
                  <select
                    value={sourceFilter}
                    onChange={e => setSourceFilter(e.target.value)}
                    className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                  >
                    <option value="all">Tất cả nguồn</option>
                    <option value="chatbot">🤖 Trợ lý AI Chatbot</option>
                    <option value="landing_form">📋 Form Landing Page</option>
                    <option value="quiz">🎯 Quiz Tìm Khóa</option>
                    <option value="course_detail">📄 Chi Tiết Khóa</option>
                  </select>
                </div>

                {/* Month Filter */}
                <div>
                  <select
                    value={monthFilter}
                    onChange={e => setMonthFilter(e.target.value)}
                    className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-700"
                  >
                    <option value="all">Tất cả các tháng</option>
                    <option value="2026-10">Tháng 10/2026 (Hiện tại)</option>
                    <option value="2026-09">Tháng 09/2026</option>
                    <option value="2026-08">Tháng 08/2026</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Leads Table Container */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>Khách Hàng Tiềm Năng & Lịch Sử Tư Vấn</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                    {leads.length} học viên
                  </span>
                </h3>

                <button
                  onClick={() => handleDownloadExcel(monthFilter)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Xuất bảng này ra Excel</span>
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs sm:text-sm">
                  Không tìm thấy khách hàng nào phù hợp với bộ lọc.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200/80 text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4">Học Viên</th>
                        <th className="py-3 px-4">Khóa Học Quan Tâm</th>
                        <th className="py-3 px-4">Nguồn</th>
                        <th className="py-3 px-4">Trạng Thái</th>
                        <th className="py-3 px-4">Thời Gian</th>
                        <th className="py-3 px-4 text-right">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          
                          {/* Student name and contact */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{lead.name}</div>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                              <a href={`tel:${lead.phone}`} className="text-blue-600 hover:underline font-semibold flex items-center gap-1">
                                <PhoneCall className="w-3 h-3 text-emerald-600" />
                                {lead.phone}
                              </a>
                              {lead.email && (
                                <span className="text-slate-400 truncate max-w-[140px]">• {lead.email}</span>
                              )}
                            </div>
                          </td>

                          {/* Course */}
                          <td className="py-3.5 px-4 font-medium text-slate-800 max-w-[200px]">
                            <div className="line-clamp-1">{lead.courseName}</div>
                          </td>

                          {/* Source */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {getSourceBadge(lead.source)}
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={lead.status}
                              onChange={e => handleUpdateStatus(lead.id, e.target.value as LeadStatus)}
                              className="text-xs font-semibold py-1 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            >
                              <option value="new">Mới nhận</option>
                              <option value="contacted">Đang tư vấn</option>
                              <option value="testing">Hẹn lịch test</option>
                              <option value="enrolled">Đã nhập học</option>
                              <option value="cancelled">Hủy/Không hợp</option>
                            </select>
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                            {new Date(lead.createdAt).toLocaleDateString('vi-VN')} {new Date(lead.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                            <button
                              onClick={() => setSelectedLeadForDetail(lead)}
                              title="Xem chi tiết & Hội thoại chat"
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors inline-flex items-center"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <a
                              href={`tel:${lead.phone}`}
                              title="Gọi điện cho học viên"
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors inline-flex items-center"
                            >
                              <PhoneCall className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              title="Xóa lead"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors inline-flex items-center"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: VISUAL TREND CHARTS & ANALYTICS */}
        {activeTab === 'charts' && analytics && (
          <div className="space-y-6">
            
            {/* Chart Grid Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Daily Trend Chart (Last 7 Days) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Xu Hướng Leads & Lượt Chatbot Theo Ngày
                    </h4>
                    <p className="text-xs text-slate-500">7 ngày gần nhất</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 font-semibold text-blue-600">
                      <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" /> Leads
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-indigo-400">
                      <span className="w-2.5 h-2.5 rounded-sm bg-indigo-300" /> Chatbot
                    </span>
                  </div>
                </div>

                {/* SVG Visual Bar Chart */}
                <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-100">
                  {analytics.dailyTrends.map((day, idx) => {
                    const maxVal = Math.max(...analytics.dailyTrends.map(d => Math.max(d.leads, d.chatSessions)), 15);
                    const leadHeight = Math.max((day.leads / maxVal) * 160, 6);
                    const chatHeight = Math.max((day.chatSessions / maxVal) * 160, 10);
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group relative">
                        {/* Tooltip */}
                        <div className="absolute -top-10 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                          {day.date}: {day.leads} leads / {day.chatSessions} chats
                        </div>

                        <div className="w-full flex items-end justify-center gap-1">
                          <div
                            style={{ height: `${chatHeight}px` }}
                            className="w-3 bg-indigo-200 rounded-t-sm transition-all group-hover:bg-indigo-300"
                          />
                          <div
                            style={{ height: `${leadHeight}px` }}
                            className="w-3 bg-blue-600 rounded-t-sm transition-all group-hover:bg-blue-700"
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-500">{day.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Monthly Growth Trend (Aug, Sep, Oct 2026) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Báo Cáo Tăng Trưởng Tuyển Sinh Theo Tháng
                    </h4>
                    <p className="text-xs text-slate-500">Tháng 8, Tháng 9, Tháng 10 / 2026</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Tăng trưởng ổn định
                  </span>
                </div>

                <div className="h-56 w-full flex items-end justify-around gap-6 pt-6 pb-2 px-6 border-b border-slate-100">
                  {analytics.monthlyTrends.map((m, idx) => {
                    const maxVal = Math.max(...analytics.monthlyTrends.map(x => x.leads), 10);
                    const leadsHeight = Math.max((m.leads / maxVal) * 160, 15);
                    const enrolledHeight = Math.max((m.enrolled / maxVal) * 160, 8);
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 group relative">
                        <div className="flex items-end gap-2">
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-slate-700 mb-1">{m.leads}</span>
                            <div
                              style={{ height: `${leadsHeight}px` }}
                              className="w-8 bg-blue-600 rounded-t-md group-hover:bg-blue-700 transition-all"
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-emerald-700 mb-1">{m.enrolled}</span>
                            <div
                              style={{ height: `${enrolledHeight}px` }}
                              className="w-8 bg-emerald-500 rounded-t-md group-hover:bg-emerald-600 transition-all"
                            />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-700">T{m.month}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-6 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-3 h-3 bg-blue-600 rounded-xs" /> Tổng Leads nhận
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-3 h-3 bg-emerald-500 rounded-xs" /> Học viên đã nhập học
                  </span>
                </div>
              </div>

            </div>

            {/* Chart Grid Row 2: Status Breakdown & Course Demand */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Status Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                <h4 className="text-sm font-bold text-slate-900">
                  Phân Bổ Phễu Trạng Thái Học Viên
                </h4>

                <div className="space-y-3">
                  {analytics.statusDistribution.map(item => {
                    const percent = analytics.totalLeads > 0 ? Math.round((item.count / analytics.totalLeads) * 100) : 0;
                    return (
                      <div key={item.status} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>{item.label}</span>
                          <span className="text-slate-500">{item.count} leads ({percent}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${percent}%`, backgroundColor: item.color }}
                            className="h-full rounded-full transition-all duration-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Course Popularity */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                <h4 className="text-sm font-bold text-slate-900">
                  Nhu Cầu Đăng Ký Theo Khóa Học
                </h4>

                <div className="space-y-3">
                  {analytics.popularCourses.map((c, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span className="truncate max-w-[260px]">{c.courseName}</span>
                        <span className="text-blue-700 font-bold">{c.count} lượt ({c.percentage}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${c.percentage}%` }}
                          className="h-full bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Conversion Funnel Banner */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
              <h4 className="text-sm font-bold text-blue-300 uppercase tracking-wider mb-4">
                Hiệu Quả Chuyển Đổi Phễu Tuyển Sinh AI (Real-time Funnel)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400">Lượt Truy Cập Landing</div>
                  <div className="text-2xl font-black text-white mt-1">{analytics.totalVisitors}</div>
                  <div className="text-[10px] text-slate-500 mt-1">100% Traffic</div>
                </div>
                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400">Tương Tác Chatbot AI</div>
                  <div className="text-2xl font-black text-indigo-400 mt-1">{analytics.totalConversations}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    {Math.round((analytics.totalConversations / analytics.totalVisitors) * 100)}% bắt đầu chat
                  </div>
                </div>
                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-400">Thu Thập Thông Tin Lead</div>
                  <div className="text-2xl font-black text-blue-400 mt-1">{analytics.totalLeads}</div>
                  <div className="text-[10px] text-blue-300 font-semibold mt-1">
                    CR: {analytics.chatbotConversionRate}% từ bot
                  </div>
                </div>
                <div className="p-4 bg-slate-800/80 rounded-xl border border-emerald-500/40 bg-emerald-950/20">
                  <div className="text-xs text-emerald-300">Chốt Nhập Học Thành Công</div>
                  <div className="text-2xl font-black text-emerald-400 mt-1">{analytics.enrolledLeads}</div>
                  <div className="text-[10px] text-emerald-300 font-bold mt-1">
                    {analytics.totalLeads > 0 ? Math.round((analytics.enrolledLeads / analytics.totalLeads) * 100) : 0}% đóng học phí
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: EMAIL NOTIFICATIONS LOG */}
        {activeTab === 'emails' && (
          <div className="space-y-4">
            
            {/* Settings Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Hệ Thống Gửi Thông Báo Tự Động Qua Email</span>
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mỗi khi có học viên mới để lại thông tin (từ Chatbot hoặc Form), hệ thống tự động gửi email thông báo chi tiết đến ban tuyển sinh.
                </p>
                <div className="mt-2 text-xs font-semibold text-slate-700">
                  Email nhận thông báo hiện tại: <span className="text-blue-700 font-bold underline">{recipientEmail}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerTestEmail}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 px-3.5 py-2 rounded-xl border border-blue-200 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi thử email mẫu ngay</span>
                </button>
              </div>
            </div>

            {/* Notifications Feed */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-900">
                Nhật Ký Email Đã Gửi Đi ({notifications.length})
              </div>

              {notifications.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Chưa có email thông báo nào được gửi.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {notifications.map(item => (
                    <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{item.subject}</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full">
                            Đã gửi thành công
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>Gửi tới: <strong>{item.recipient}</strong></span>
                          <span>•</span>
                          <span>{new Date(item.sentAt).toLocaleString('vi-VN')}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedEmailPreview(item)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 shrink-0"
                      >
                        Xem mẫu email
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: PERIODIC MONTHLY EXPORT CENTER */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            
            <div className="bg-linear-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-blue-100 mb-3">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-300" />
                  Excel Data & Monthly Scheduled Reporting
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  Xuất Báo Cáo Định Kỳ Theo Tháng & File Excel Chuẩn
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
                  Hỗ trợ xuất trọn bộ danh sách Leads và Báo cáo hiệu quả chuyển đổi sang định dạng Microsoft Excel (.xlsx) với 2 sheet được định dạng sẵn: Sheet 1 (Danh sách học viên) & Sheet 2 (Chỉ số KPI tuyển sinh).
                </p>
              </div>
            </div>

            {/* Monthly Export Generator Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Option A: Select Month and Export */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Xuất Báo Cáo Tuyển Sinh Theo Kỳ Tháng</span>
                </div>
                <p className="text-xs text-slate-600">
                  Chọn tháng bạn muốn xuất dữ liệu. File Excel tải về sẽ chứa đầy đủ thông tin học viên và phân tích KPI của kỳ đó.
                </p>

                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-semibold text-slate-700">Chọn kỳ báo cáo:</label>
                  <select
                    value={exportMonth}
                    onChange={e => setExportMonth(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="all">Toàn bộ thời gian (Tất cả các kỳ)</option>
                    <option value="2026-10">Kỳ Tháng 10/2026 (Kỳ hiện tại)</option>
                    <option value="2026-09">Kỳ Tháng 09/2026</option>
                    <option value="2026-08">Kỳ Tháng 08/2026</option>
                  </select>

                  <button
                    onClick={() => handleDownloadExcel(exportMonth)}
                    disabled={isExporting}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isExporting ? 'Đang tạo file Excel...' : `Tải Báo Cáo Excel (.xlsx)`}</span>
                  </button>
                </div>
              </div>

              {/* Option B: Scheduled Auto-Export Configuration */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <span>Cấu Hình Lịch Xuất Dữ Liệu Tự Động Định Kỳ</span>
                </div>
                <p className="text-xs text-slate-600">
                  Hệ thống hỗ trợ lập lịch tự động tạo báo cáo định kỳ hàng tháng và lưu trữ sẵn sàng để ban tuyển sinh tải về bất kỳ lúc nào.
                </p>

                <div className="space-y-3 pt-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <span className="font-bold block">Tự động xuất vào ngày đầu tháng:</span>
                      <span className="text-slate-500 text-[11px]">Ngày 01 hàng tháng lúc 08:00 AM</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      Đang Bật
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <span className="font-bold block">Định dạng file xuất chuẩn:</span>
                      <span className="text-slate-500 text-[11px]">Microsoft Excel Workbook (.xlsx)</span>
                    </div>
                    <span className="text-slate-600 font-semibold">2 Sheets (Leads + KPI)</span>
                  </div>

                  <button
                    onClick={() => {
                      handleDownloadExcel('2026-10');
                    }}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    Kích Hoạt Chạy Lịch Xuất Báo Cáo Ngay Bây Giờ
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* MODAL 1: LEAD DETAIL VIEW */}
      {selectedLeadForDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">{selectedLeadForDetail.name}</h3>
                <p className="text-xs text-slate-400">Mã học viên: {selectedLeadForDetail.id}</p>
              </div>
              <button
                onClick={() => setSelectedLeadForDetail(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block text-xs">Số điện thoại:</span>
                  <a href={`tel:${selectedLeadForDetail.phone}`} className="font-bold text-blue-600 hover:underline">
                    {selectedLeadForDetail.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Email:</span>
                  <span className="font-semibold">{selectedLeadForDetail.email || 'Chưa cung cấp'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Khóa học quan tâm:</span>
                  <span className="font-bold text-purple-700">{selectedLeadForDetail.courseName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs">Nguồn tiếp nhận:</span>
                  {getSourceBadge(selectedLeadForDetail.source)}
                </div>
              </div>

              {selectedLeadForDetail.chatSummary && (
                <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 text-xs">
                  <span className="font-bold text-blue-900 block mb-1">Tóm tắt tư vấn từ Chatbot:</span>
                  <p className="text-slate-700 italic">{selectedLeadForDetail.chatSummary}</p>
                </div>
              )}

              <div>
                <label className="font-bold text-slate-800 block mb-1">Ghi chú của chuyên viên tuyển sinh:</label>
                <textarea
                  rows={3}
                  defaultValue={selectedLeadForDetail.notes || ''}
                  onBlur={e => handleSaveNotes(selectedLeadForDetail.id, e.target.value)}
                  placeholder="Nhập ghi chú (VD: Học viên muốn đóng học phí vào ngày 20, cần tư vấn lịch tối...)"
                  className="w-full p-2.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
                <span className="text-[10px] text-slate-400">Tự động lưu khi bạn bấm ra ngoài ô nhập.</span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`tel:${selectedLeadForDetail.phone}`}
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Gọi Điện Ngay</span>
                </a>

                <button
                  onClick={() => setSelectedLeadForDetail(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EMAIL PREVIEW MODAL */}
      {selectedEmailPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold">Mẫu Email Thông Báo Tự Động Tiếp Nhận Lead</h3>
              </div>
              <button onClick={() => setSelectedEmailPreview(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-100 border-b border-slate-200 text-xs text-slate-600 space-y-1 shrink-0">
              <div><strong>Người gửi:</strong> admissions@eduvibe.edu.vn (EduVibe System)</div>
              <div><strong>Người nhận:</strong> {selectedEmailPreview.recipient}</div>
              <div><strong>Tiêu đề:</strong> {selectedEmailPreview.subject}</div>
            </div>

            <div className="p-4 overflow-y-auto flex-1">
              <div 
                dangerouslySetInnerHTML={{ __html: selectedEmailPreview.previewHtml }} 
                className="border border-slate-200 rounded-xl overflow-hidden"
              />
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedEmailPreview(null)}
                className="text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-xl"
              >
                Đóng xem trước
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
