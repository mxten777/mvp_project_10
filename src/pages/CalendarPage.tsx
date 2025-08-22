import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPage: React.FC = () => {
  // 임시 데이터
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // 달력 데이터 생성 (간단한 예시)
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  // 복용 기록 데이터 (임시)
  const medicineRecords: Record<string, { taken: number; total: number; status: string }> = {
    '2025-08-01': { taken: 3, total: 3, status: 'complete' },
    '2025-08-02': { taken: 2, total: 3, status: 'partial' },
    '2025-08-03': { taken: 0, total: 3, status: 'missed' },
    '2025-08-04': { taken: 3, total: 3, status: 'complete' },
  };

  const getDateStatus = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return medicineRecords[dateStr];
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // 빈 칸 추가 (이전 달)
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 bg-gray-50"></div>
      );
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const record = getDateStatus(day);
      const isToday = day === currentDate.getDate();
      
      days.push(
        <div
          key={day}
          className={`h-24 p-2 border border-gray-200 ${
            isToday ? 'bg-primary-50 border-primary-200' : 'bg-white'
          } hover:bg-gray-50 cursor-pointer`}
        >
          <div className="flex justify-between items-start h-full">
            <span className={`text-sm font-medium ${
              isToday ? 'text-primary-600' : 'text-gray-900'
            }`}>
              {day}
            </span>
            {record && (
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                {record.taken}/{record.total}
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">복용 캘린더</h1>
          <p className="text-gray-600">월별 약물 복용 기록을 확인하세요</p>
        </div>
      </div>

      {/* 캘린더 */}
      <div className="bg-white rounded-lg shadow">
        {/* 캘린더 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              {currentYear}년 {monthNames[currentMonth]}
            </h2>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
            <div key={day} className="p-4 text-center text-sm font-medium text-gray-700 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7">
          {renderCalendarDays()}
        </div>
      </div>

      {/* 범례 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">복용 상태 범례</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
            <span className="text-sm text-gray-700">완전 복용 (모든 약물 복용)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
            <span className="text-sm text-gray-700">부분 복용 (일부 약물만 복용)</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
            <span className="text-sm text-gray-700">미복용 (약물 복용 안함)</span>
          </div>
        </div>
      </div>

      {/* 월간 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">이번 달 복용률</h3>
          <p className="text-3xl font-bold text-green-600">87%</p>
          <p className="text-sm text-gray-600">목표: 90%</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">연속 복용 일수</h3>
          <p className="text-3xl font-bold text-blue-600">5일</p>
          <p className="text-sm text-gray-600">최고 기록: 12일</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">놓친 복용</h3>
          <p className="text-3xl font-bold text-red-600">3회</p>
          <p className="text-sm text-gray-600">이번 달 총 놓친 횟수</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
