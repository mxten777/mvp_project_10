import React, { useState } from 'react';
import { Users, UserPlus, Settings, Bell, CheckCircle, AlertCircle } from 'lucide-react';

const FamilyPage: React.FC = () => {
  // 임시 데이터
  const familyMembers = [
    {
      id: '1',
      name: '바이칼',
      email: 'chulsoo@example.com',
      role: 'admin',
      avatar: '👨',
      lastActive: '방금 전',
      medicineCount: 3,
      todayCompleted: 2,
      todayTotal: 3,
      status: 'active'
    },
    {
      id: '2',
      name: '김영희',
      email: 'younghee@example.com',
      role: 'member',
      avatar: '👩',
      lastActive: '1시간 전',
      medicineCount: 2,
      todayCompleted: 2,
      todayTotal: 2,
      status: 'completed'
    },
    {
      id: '3',
      name: '김민수',
      email: 'minsu@example.com',
      role: 'member',
      avatar: '👦',
      lastActive: '3시간 전',
      medicineCount: 1,
      todayCompleted: 0,
      todayTotal: 1,
      status: 'missed'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'missed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Bell className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료';
      case 'missed':
        return '주의';
      default:
        return '진행중';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // 초대 모달 상태 및 코드 생성
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteCode] = useState(() => {
    // 간단한 랜덤 코드 생성
    return 'FAM-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  });
  const inviteUrl = `${window.location.origin}/invite/${inviteCode}`;
  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    alert('초대 링크가 복사되었습니다!');
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">가족 관리</h1>
          <p className="text-gray-600">가족 구성원의 약물 복용 현황을 확인하세요</p>
        </div>
        <div className="flex space-x-3">
          <button
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
            onClick={() => setInviteOpen(true)}
          >
            <UserPlus className="h-5 w-5" />
            <span>가족 초대</span>
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>설정</span>
          </button>
        </div>
      {/* 가족 초대 모달 */}
      {inviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 max-w-full relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold focus:outline-none"
              onClick={() => setInviteOpen(false)}
              aria-label="닫기"
            >
              ×
            </button>
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 flex items-center justify-center text-4xl rounded-full bg-blue-100 mb-2">👨‍👩‍👧‍👦</div>
              <div className="font-bold text-lg text-gray-900 mb-2">가족 초대</div>
              <div className="text-sm text-gray-600 mb-4 text-center">아래 링크를 가족에게 공유하세요.</div>
              <div className="bg-gray-100 rounded-lg px-3 py-2 w-full text-center break-all font-mono text-xs mb-2">{inviteUrl}</div>
              {/* QR코드 대체: 실제 QR코드 라이브러리 사용 가능 */}
              <div className="bg-white border border-gray-200 rounded-lg p-2 mb-3">
                <span className="text-xs text-gray-400">[QR코드 자리]</span>
              </div>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg mt-2"
                onClick={handleCopy}
              >
                초대 링크 복사
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* 가족 초대 코드 */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-primary-800">가족 초대 코드</h3>
            <p className="text-sm text-primary-600">이 코드로 가족을 초대할 수 있습니다</p>
          </div>
          <div className="flex items-center space-x-3">
            <code className="bg-white px-3 py-2 rounded border text-lg font-mono">FAMILY123</code>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              복사
            </button>
          </div>
        </div>
      </div>

      {/* 가족 구성원 목록 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary-600" />
            가족 구성원 ({familyMembers.length}명)
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {familyMembers.map((member) => (
            <div key={member.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* 아바타 */}
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                    {member.avatar}
                  </div>
                  
                  {/* 정보 */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                      {member.role === 'admin' && (
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
                          관리자
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <p className="text-xs text-gray-500">마지막 활동: {member.lastActive}</p>
                  </div>
                </div>
                
                {/* 상태 및 통계 */}
                <div className="flex items-center space-x-6">
                  {/* 오늘의 복용 현황 */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">오늘 복용</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {member.todayCompleted}/{member.todayTotal}
                    </p>
                  </div>
                  
                  {/* 등록 약물 수 */}
                  <div className="text-center">
                    <p className="text-sm text-gray-600">등록 약물</p>
                    <p className="text-lg font-semibold text-gray-900">{member.medicineCount}개</p>
                  </div>
                  
                  {/* 상태 */}
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(member.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(member.status)}`}>
                      {getStatusText(member.status)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 진행 바 */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>오늘 복용 진행률</span>
                  <span>{Math.round((member.todayCompleted / member.todayTotal) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      member.status === 'completed' ? 'bg-green-500' :
                      member.status === 'missed' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${(member.todayCompleted / member.todayTotal) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 가족 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">83%</p>
              <p className="text-gray-600">가족 평균 복용률</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">{familyMembers.length}</p>
              <p className="text-gray-600">활성 구성원</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Bell className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-900">2</p>
              <p className="text-gray-600">알림 대기</p>
            </div>
          </div>
        </div>
      </div>

      {/* 최근 알림 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">최근 알림</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">김민수님이 약 복용을 놓쳤습니다</p>
                <p className="text-sm text-gray-600">비타민D (오후 8시) • 30분 전</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">김영희님이 모든 약을 복용했습니다</p>
                <p className="text-sm text-gray-600">오늘 2/2 완료 • 1시간 전</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyPage;
