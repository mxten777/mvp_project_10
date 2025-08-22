import React from 'react';
import { Plus, Pill, Clock, Edit } from 'lucide-react';

const MedicinePage: React.FC = () => {
  // 임시 데이터
  const medicines = [
    {
      id: '1',
      name: '타이레놀',
      dosage: '500mg 1정',
      frequency: 3,
      times: ['08:00', '12:00', '20:00'],
      color: '#EF4444',
      notes: '식후 30분'
    },
    {
      id: '2',
      name: '오메가3',
      dosage: '1000mg 2캡슐',
      frequency: 1,
      times: ['12:00'],
      color: '#3B82F6',
      notes: '식사와 함께'
    },
    {
      id: '3',
      name: '비타민D',
      dosage: '2000IU 1정',
      frequency: 1,
      times: ['20:00'],
      color: '#10B981',
      notes: ''
    }
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">약물 관리</h1>
          <p className="text-gray-600">복용 중인 약물을 관리하고 일정을 설정하세요</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>약물 추가</span>
        </button>
      </div>

      {/* 약물 목록 */}
      <div className="grid gap-6">
        {medicines.map((medicine) => (
          <div key={medicine.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {/* 약물 색상 표시 */}
                <div 
                  className="w-4 h-16 rounded-full"
                  style={{ backgroundColor: medicine.color }}
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Pill className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">{medicine.name}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{medicine.dosage}</p>
                  
                  {/* 복용 시간 */}
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      하루 {medicine.frequency}회: {medicine.times.join(', ')}
                    </span>
                  </div>
                  
                  {/* 메모 */}
                  {medicine.notes && (
                    <p className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded">
                      📝 {medicine.notes}
                    </p>
                  )}
                </div>
              </div>
              
              {/* 액션 버튼 */}
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* 오늘의 복용 상태 */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-3">오늘의 복용 현황</h4>
              <div className="flex space-x-2">
                {medicine.times.map((time, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{time}</span>
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 빈 상태 */}
      {medicines.length === 0 && (
        <div className="text-center py-12">
          <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">등록된 약물이 없습니다</h3>
          <p className="text-gray-600 mb-4">첫 번째 약물을 추가해보세요</p>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
            약물 추가하기
          </button>
        </div>
      )}
    </div>
  );
};

export default MedicinePage;
