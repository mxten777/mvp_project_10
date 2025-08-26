
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navItems = [
    { to: '/', label: '홈', icon: <span role="img" aria-label="홈">🏠</span> },
    { to: '/calendar', label: '캘린더', icon: <span role="img" aria-label="캘린더">📅</span> },
    { to: '/medicine', label: '약', icon: <span role="img" aria-label="약">💊</span> },
    { to: '/family', label: '가족', icon: <span role="img" aria-label="가족">👨‍👩‍👧‍👦</span> },
  ];

  // 앱 내 공지/팁/가이드 배너 상태 및 메시지
  const [showBanner, setShowBanner] = useState(true);
  const bannerMessages = [
    '💡 약 복용 알림을 꼭 확인하세요!',
    '👨‍👩‍👧‍👦 가족과 함께 건강을 지켜요.',
    '📅 캘린더에서 복용 이력을 확인할 수 있어요.',
    '⚡ 앱을 홈 화면에 추가하면 더 편리해요!'
  ];
  const bannerMsg = bannerMessages[new Date().getDate() % bannerMessages.length];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 앱 내 공지/팁/가이드 배너 */}
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-3 py-1.5 bg-blue-600 text-white text-[15px] font-medium shadow-md animate-fadeIn dark:bg-blue-800" style={{ minHeight: 32 }}>
          <span className="truncate pr-2">{bannerMsg}</span>
          <button
            className="ml-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white text-base font-bold focus:outline-none transition-colors"
            onClick={() => setShowBanner(false)}
            aria-label="배너 닫기"
            style={{ lineHeight: 1 }}
          >
            <span className="mt-[-1px]">×</span>
          </button>
        </div>
      )}
    {/* 상단 고정 헤더 (모바일) */}
  <header className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow md:hidden flex items-center justify-between h-14 px-4" style={{ top: showBanner ? '32px' : 0 }}>
        <button
          className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
          aria-label="메뉴"
          onClick={() => setMenuOpen(true)}
        >
          <span className="text-2xl">☰</span>
        </button>
        <span className="font-bold text-base text-gray-900 dark:text-white">약 챙겨</span>
        <button className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none" aria-label="알림">
          <span className="text-xl">🔔</span>
        </button>
      </header>

      {/* 모바일 사이드 드로어 메뉴 */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className="absolute top-0 left-0 mt-3 ml-2 bg-white dark:bg-gray-900 shadow-lg rounded-xl flex flex-col min-w-[180px] max-w-[220px] min-h-0 px-3 py-3"
            onClick={e => e.stopPropagation()}
            aria-label="사이드 메뉴"
          >
            <button
              className="mb-2 ml-1 text-lg p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none self-start"
              aria-label="메뉴 닫기"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>
            <ul className="w-full flex flex-col gap-0.5">
              {navItems.map(item => (
                <li key={item.to} className="w-full">
                  <Link
                    to={item.to}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[15px] transition-colors w-full ${location.pathname === item.to ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 font-bold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    {/* 메인 컨텐츠 (상단 헤더+배너 높이만큼 패딩) */}
  <main className={`flex-1 pb-16 px-2 sm:px-4 max-w-md mx-auto w-full ${showBanner ? 'pt-[88px]' : 'pt-16'}`}>
        {children}
      </main>
      {/* 하단 네비게이션 바 (모바일 우선) */}
  <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow md:hidden flex justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center justify-center flex-1 h-full text-xs transition-colors ${location.pathname === item.to ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-500 dark:text-gray-300'}`}
            aria-current={location.pathname === item.to ? 'page' : undefined}
          >
            <span className="text-2xl mb-1">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      {/* 데스크탑 네비게이션 (선택적) */}
  <nav className="hidden md:flex justify-center gap-8 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${location.pathname === item.to ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            aria-current={location.pathname === item.to ? 'page' : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
