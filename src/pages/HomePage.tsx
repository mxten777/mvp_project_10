import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, Calendar, Plus, Bell, Pill, Menu } from 'lucide-react';

const HomePage: React.FC = () => {
// Removed useAuth to eliminate unused variable warning

  // 임시 데이터 - 나중에 실제 데이터로 교체
  const [toast, setToast] = useState<string | null>(null);
  const [animatedMedicineId, setAnimatedMedicineId] = useState<string | null>(null);
  // 로딩/에러/빈 상태 시뮬레이션
  const [isLoading] = useState(false); // 실제 fetch 시 true로
  const [error] = useState<string | null>(null);
  const [todayMedicines, setTodayMedicines] = useState([
    {
      id: '1',
      name: '타이레놀',
      time: '08:00',
      status: 'taken' as const,
      dosage: '500mg 1정',
      color: '#22c55e'
    },
    {
      id: '2',
      name: '오메가3',
      time: '12:00',
      status: 'pending' as const,
      dosage: '1000mg 2캡슐',
      color: '#3b82f6'
    },
    {
      id: '3',
      name: '비타민D',
      time: '20:00',
      status: 'pending' as const,
      dosage: '2000IU 1정',
      color: '#f59e0b'
    },
    {
      id: '4',
      name: '마그네슘',
      time: '22:00',
      status: 'pending' as const,
      dosage: '200mg 1정',
      color: '#8b5cf6'
    }
  ]);
  // 복용 완료 버튼 클릭 핸들러
  const handleTakeMedicine = (id: string) => {
    setTodayMedicines((prev) => prev.map(m => m.id === id ? { ...m, status: 'taken' } : m));
    setAnimatedMedicineId(id);
    setToast('복용 완료!');
    setTimeout(() => setToast(null), 1800);
    setTimeout(() => setAnimatedMedicineId(null), 1000);
  };


  type FamilyMember = {
    name: string;
    lastTaken: string;
    status: 'good' | 'missed';
    avatar: string;
    progress: number;
  };

  const familyStatus: FamilyMember[] = [
    { name: '어머니', lastTaken: '2시간 전', status: 'good', avatar: '👩‍🦳', progress: 100 },
    { name: '아버지', lastTaken: '30분 전', status: 'missed', avatar: '👨‍🦲', progress: 75 },
    { name: '동생', lastTaken: '4시간 전', status: 'good', avatar: '�', progress: 100 },
  ];

  // 모달 상태
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'missed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="space-y-8">{/* 섹션 간격 확대 */}
      {/* 토스트 메시지 */}
      {toast && (
        <div className="fixed top-16 left-1/2 z-50 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg animate-fadeInUp font-bold text-base">
          {toast}
        </div>
      )}
      {/* 상단 햄버거 버튼 (모바일) */}
      <div className="flex items-center justify-between mb-2 md:mb-4">
  <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400" aria-label="메뉴">
          <Menu className="h-7 w-7 text-gray-500" />
        </button>
        <div className="flex-1 text-right md:hidden"></div>
      </div>
      {/* 환영 메시지 */}
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-7 md:p-10 relative overflow-hidden mb-8">{/* 패딩과 마진 조정 */}
        {/* 배경 패턴 */}
  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900 opacity-50 rounded-full -mr-16 -mt-16"></div>
  <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-50 dark:bg-blue-900 opacity-30 rounded-full -ml-10 -mb-10"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mr-3">
              <span className="text-xl">👋</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                청휘선생님!
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base mt-1">
                건강한 하루를 시작해보세요
              </p>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900 rounded-xl p-3 md:p-4 mb-4">
            <p className="text-gray-700 dark:text-gray-200 text-xs md:text-sm leading-relaxed">
              오늘도 약 복용을 잊지 마시고, 가족들과 함께 건강을 관리해보세요.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700 px-3 py-1.5 rounded-full">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-green-700 dark:text-green-300 font-medium text-xs md:text-sm">오늘 복용률: 25%</span>
            </div>
            <div className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-700 px-3 py-1.5 rounded-full">
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
              <span className="text-yellow-700 dark:text-yellow-200 font-medium text-xs md:text-sm">남은 복용: 3회</span>
            </div>
          </div>
        </div>
      </div>

      {/* 오늘의 약 복용 일정 */}
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            오늘의 약 복용 일정
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-6">{/* 약물 카드 간격 확대 */}
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse rounded-xl h-24" />
              ))
            ) : error ? (
              <div className="text-center text-red-500 font-bold py-8">{error}</div>
            ) : todayMedicines.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <Pill className="h-10 w-10 mx-auto mb-2" />
                <div>오늘 복용할 약이 없습니다</div>
              </div>
            ) : (
              todayMedicines.map((medicine, index) => (
                <div key={medicine.id}>
                  <div
                    className={`relative bg-white rounded-xl border-2 p-7 transition-all duration-300 hover:shadow-lg ${
                      medicine.status === 'taken' 
                        ? 'border-green-200 bg-green-50 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${animatedMedicineId === medicine.id ? 'ring-4 ring-green-300/60 animate-pulse' : ''}`}
                  >
                    {/* 왼쪽 색상 인디케이터 */}
                    <div 
                      className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full"
                      style={{ backgroundColor: medicine.color }}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between ml-4 gap-4">
                      <div className="flex items-center space-x-4 flex-1">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                          style={{ backgroundColor: medicine.color }}
                        >
                          <Pill className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-1">
                            {medicine.name}
                            {medicine.status === 'taken' && (
                              <span className={`inline-block align-middle ml-1 animate-bounce`}>
                                <CheckCircle className="h-5 w-5 text-green-500 drop-shadow" />
                              </span>
                            )}
                          </h3>
                          <p className="text-gray-600 text-sm">{medicine.dosage}</p>
                          {/* 추가 정보 */}
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              💊 경구복용
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              🍽️ 식후
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="font-bold text-gray-900 text-xl mb-1">{medicine.time}</p>
                        <div className="flex items-center justify-center sm:justify-end space-x-2">
                          {getStatusIcon(medicine.status)}
                          <span className={`text-sm font-medium ${
                            medicine.status === 'taken' ? 'text-green-600' : 
                            medicine.status === 'pending' ? 'text-gray-600' : 'text-red-600'
                          }`}>
                            {medicine.status === 'taken' ? '복용완료' : 
                              medicine.status === 'pending' ? '대기중' : '놓침'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {medicine.status === 'pending' && (
                      <button 
                        className="mt-4 w-full py-3 rounded-xl text-white font-bold text-sm transition-all duration-200 hover:shadow-lg active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
                        style={{ backgroundColor: medicine.color }}
                        onClick={() => handleTakeMedicine(medicine.id)}
                        aria-label={`${medicine.name} 복용 완료 처리`}
                      >
                        <span className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-5 w-5" />
                          <span>복용 완료</span>
                        </span>
                      </button>
                    )}
                  </div>
                  {/* 카드 간 구분선 (마지막 카드 제외) */}
                  {index < todayMedicines.length - 1 && (
                    <div className="relative flex items-center my-6">
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                      <div className="mx-4 bg-gray-100 rounded-full p-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 가족 복용 현황 */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-purple-600 text-sm">👨‍👩‍👧‍👦</span>
            </div>
            가족 복용 현황
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-5">{/* 가족 카드 간격 확대 */}
            {isLoading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="bg-gray-100 animate-pulse rounded-xl h-20" />
              ))
            ) : error ? (
              <div className="text-center text-red-500 font-bold py-8">{error}</div>
            ) : familyStatus.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <span className="text-4xl">👨‍👩‍👧‍👦</span>
                <div>등록된 가족이 없습니다</div>
              </div>
            ) : (
              familyStatus.map((member, index) => (
                <div key={index}>
                  <button
                    type="button"
                    className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                    onClick={() => setSelectedMember(member)}
                    aria-label={`${member.name} 상세 보기`}
                    tabIndex={0}
                    role="button"
                  >
                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div
                            className={`w-14 h-14 flex items-center justify-center text-3xl rounded-full shadow-md border-4 transition-colors duration-300 ${
                              member.status === 'good'
                                ? 'bg-green-50 border-green-400'
                                : 'bg-red-50 border-red-400'
                            }`}
                          >
                            {member.avatar && member.avatar !== '�' ? member.avatar : '❓'}
                          </div>
                          {/* 상태 표시 점 */}
                          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            member.status === 'good' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 text-lg">{member.name}</p>
                          <p className="text-sm text-gray-600 mb-2">마지막 복용: {member.lastTaken}</p>
                          {/* 진행 바 */}
                          <div className="w-36 bg-gray-200 rounded-full h-4 relative overflow-visible flex items-center">
                            <div 
                              className={`h-4 rounded-full transition-all duration-700 ${
                                member.status === 'good' ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${member.progress}%`, zIndex: 1 }}
                            />
                            {/* 진행률 텍스트 */}
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white z-10 pointer-events-none select-none whitespace-nowrap drop-shadow-sm">
                              {member.progress}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-sm border ${
                        member.status === 'good' 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : 'bg-red-100 text-red-700 border-red-200'
                      }`}>
                        <span>{member.status === 'good' ? '✓' : '⚠️'}</span>
                        <span>{member.status === 'good' ? '정상' : '주의'}</span>
                      </div>
                    </div>
                  </button>
                  {/* 가족 상세 모달 */}
                  {selectedMember && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded-2xl shadow-2xl p-8 w-80 max-w-full relative animate-fadeIn">
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                          onClick={() => setSelectedMember(null)}
                          aria-label="닫기"
                        >
                          ×
                        </button>
                        <div className="flex flex-col items-center mb-4">
                          <div
                            className={`w-20 h-20 flex items-center justify-center text-5xl rounded-full shadow-md border-4 mb-2 ${
                              selectedMember.status === 'good'
                                ? 'bg-green-50 border-green-400'
                                : 'bg-red-50 border-red-400'
                            }`}
                          >
                            {selectedMember.avatar && selectedMember.avatar !== '�' ? selectedMember.avatar : '❓'}
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-lg text-gray-900">{selectedMember.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                              selectedMember.status === 'good'
                                ? 'bg-green-100 text-green-700 border-green-200'
                                : 'bg-red-100 text-red-700 border-red-200'
                            }`}>
                              {selectedMember.status === 'good' ? '정상' : '주의'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 mb-2">마지막 복용: {selectedMember.lastTaken}</div>
                          <div className="w-32 bg-gray-200 rounded-full h-4 relative overflow-visible flex items-center mb-2">
                            <div 
                              className={`h-4 rounded-full transition-all duration-700 ${
                                selectedMember.status === 'good' ? 'bg-green-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${selectedMember.progress}%`, zIndex: 1 }}
                            />
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white z-10 pointer-events-none select-none whitespace-nowrap drop-shadow-sm">
                              {selectedMember.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="text-center text-xs text-gray-500 mt-2">가족별 복용 상세 정보는 추후 제공 예정입니다.</div>
                      </div>
                    </div>
                  )}
                  {/* 가족 멤버 간 구분선 (마지막 멤버 제외) */}
                  {index < familyStatus.length - 1 && (
                    <div className="relative flex items-center my-4">
                      <div className="flex-grow border-t border-dotted border-gray-300"></div>
                      <div className="mx-3 bg-purple-100 rounded-full p-1.5">
                        <span className="text-purple-600 text-xs">👥</span>
                      </div>
                      <div className="flex-grow border-t border-dotted border-gray-300"></div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-green-600 text-sm">📊</span>
          </div>
          이번주 복용 통계
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{/* 통계 카드 간격 확대 */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-green-200 hover:shadow-xl hover:border-green-300 transition-all duration-300 relative overflow-hidden">
              {/* 배경 패턴 */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full -mr-10 -mt-10"></div>
              
              {/* 왼쪽 색상 인디케이터 */}
              <div className="absolute left-0 top-4 bottom-4 w-1.5 bg-green-500 rounded-r-full"></div>
              
              <div className="flex items-center justify-between relative z-10 ml-4">
                <div>
                  <p className="text-4xl font-bold text-green-600 mb-1">85%</p>
                  <p className="text-gray-700 font-bold text-base">이번 주 복용률</p>
                  <p className="text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded-full inline-block">목표 90%</p>
                </div>
                <div className="p-4 bg-green-100 rounded-2xl shadow-sm">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="mt-5 bg-gray-200 rounded-full h-3 relative overflow-hidden ml-4">
                <div className="bg-green-500 h-3 rounded-full transition-all duration-700" style={{ width: '85%' }}></div>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                  85%
                </span>
              </div>
            </div>
            
            {/* 카드 간 구분선 */}
            <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
              <div className="w-6 h-0.5 bg-gray-300"></div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 relative overflow-hidden">
              {/* 배경 패턴 */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10"></div>
              
              {/* 왼쪽 색상 인디케이터 */}
              <div className="absolute left-0 top-4 bottom-4 w-1.5 bg-blue-500 rounded-r-full"></div>
              
              <div className="flex items-center justify-between relative z-10 ml-4">
                <div>
                  <p className="text-4xl font-bold text-blue-600 mb-1">3</p>
                  <p className="text-gray-700 font-bold text-base">오늘 남은 복용</p>
                  <p className="text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded-full inline-block">총 4회 중</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-2xl shadow-sm">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="mt-5 bg-gray-200 rounded-full h-3 relative overflow-hidden ml-4">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-700" style={{ width: '25%' }}></div>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                  1/4
                </span>
              </div>
            </div>
            
            {/* 카드 간 구분선 */}
            <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
              <div className="w-6 h-0.5 bg-gray-300"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-yellow-200 hover:shadow-xl hover:border-yellow-300 transition-all duration-300 relative overflow-hidden">
            {/* 배경 패턴 */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-full -mr-10 -mt-10"></div>
            
            {/* 왼쪽 색상 인디케이터 */}
            <div className="absolute left-0 top-4 bottom-4 w-1.5 bg-yellow-500 rounded-r-full"></div>
            
            <div className="flex items-center justify-between relative z-10 ml-4">
              <div>
                <p className="text-4xl font-bold text-yellow-600 mb-1">1</p>
                <p className="text-gray-700 font-bold text-base">놓친 복용</p>
                <p className="text-xs text-gray-500 mt-1 bg-gray-100 px-2 py-1 rounded-full inline-block">이번 주</p>
              </div>
              <div className="p-4 bg-yellow-100 rounded-2xl shadow-sm">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <div className="mt-5 bg-gray-200 rounded-full h-3 relative overflow-hidden ml-4">
              <div className="bg-yellow-500 h-3 rounded-full transition-all duration-700" style={{ width: '15%' }}></div>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                1회
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <div className="w-6 h-6 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
            <span className="text-indigo-600 text-sm">⚡</span>
          </div>
          빠른 액션
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">{/* 빠른 액션 간격 확대 */}
          <div className="relative">
            <button className="w-full flex flex-col items-center p-6 rounded-2xl bg-blue-50 border-2 border-blue-100 hover:bg-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              {/* 상단 장식 */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-8 h-1 bg-blue-500 rounded-full"></div>
              
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold text-blue-700">약물 추가</span>
              <span className="text-xs text-blue-600 mt-1">새로운 처방전</span>
            </button>
            
            {/* 카드 간 세로 구분선 (모바일에서는 숨김) */}
            <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 h-16 w-0.5 bg-gray-200"></div>
          </div>
          
          <div className="relative">
            <button className="w-full flex flex-col items-center p-6 rounded-2xl bg-green-50 border-2 border-green-100 hover:bg-green-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              {/* 상단 장식 */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-8 h-1 bg-green-500 rounded-full"></div>
              
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold text-green-700">알림 설정</span>
              <span className="text-xs text-green-600 mt-1">복용 시간 관리</span>
            </button>
            
            {/* 카드 간 세로 구분선 */}
            <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 h-16 w-0.5 bg-gray-200"></div>
          </div>
          
          <div className="relative">
            <button className="w-full flex flex-col items-center p-6 rounded-2xl bg-purple-50 border-2 border-purple-100 hover:bg-purple-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
              {/* 상단 장식 */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-8 h-1 bg-purple-500 rounded-full"></div>
              
              <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-bold text-purple-700">기록 보기</span>
              <span className="text-xs text-purple-600 mt-1">복용 이력 확인</span>
            </button>
            
            {/* 카드 간 세로 구분선 */}
            <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 h-16 w-0.5 bg-gray-200"></div>
          </div>
          
          <button className="flex flex-col items-center p-6 rounded-2xl bg-orange-50 border-2 border-orange-100 hover:bg-orange-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group">
            {/* 상단 장식 */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-8 h-1 bg-orange-500 rounded-full"></div>
            
            <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-shadow">
              <Pill className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-bold text-orange-700">복용 체크</span>
            <span className="text-xs text-orange-600 mt-1">즉시 복용 처리</span>
          </button>
        </div>
        
        {/* 하단 구분선과 추가 정보 */}
        <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>관리</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>알림</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>분석</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>실행</span>
            </div>
          </div>
        </div>
      </div>
      {/* 플로팅 액션 버튼 (FAB) - 모바일 */}
      <button
        className="fixed bottom-24 right-6 z-40 w-16 h-16 rounded-full bg-blue-600 text-white shadow-xl flex items-center justify-center text-4xl hover:bg-blue-700 active:scale-95 transition-all md:hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
        aria-label="약 추가"
        onClick={() => alert('약 추가 기능은 추후 제공됩니다.')}
        tabIndex={0}
        role="button"
      >
        <span className="sr-only">약 추가</span>
        +
      </button>
    </div>
  );
};

export default HomePage;
