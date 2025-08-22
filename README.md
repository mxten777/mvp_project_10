# 약챙겨 - 가족 약 복용 리마인더 앱

가족과 함께하는 스마트한 약물 복용 관리 앱입니다.

## 🌟 주요 기능

- **약물 관리**: 복용 중인 약물 등록 및 관리
- **시간별 알림**: 복용 시간 알림 기능
- **가족 공유**: 가족 구성원과 복용 상태 실시간 공유
- **복용 기록**: 캘린더 기반 복용 이력 추적
- **통계 분석**: 복용률 및 패턴 분석

## 🛠️ 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **Mobile**: Capacitor
- **Icons**: Lucide React
- **Routing**: React Router Dom
- **Deployment**: Vercel

## 🚀 개발 환경 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
`.env.example` 파일을 참고하여 `.env` 파일을 생성하고 Firebase 설정을 입력하세요.

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

## 📱 모바일 앱 빌드 (Capacitor)

### Android 설정
```bash
# Capacitor 초기화
npx cap init

# Android 플랫폼 추가
npx cap add android

# 빌드 후 Android로 복사
npm run build
npx cap copy android

# Android Studio에서 열기
npx cap open android
```

## 🔧 Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Authentication 활성화 (이메일/비밀번호 로그인)
3. Firestore Database 생성
4. 프로젝트 설정에서 웹 앱 구성 정보 복사
5. `.env` 파일에 Firebase 설정 정보 입력

## 📁 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 UI 컴포넌트
├── pages/         # 페이지 컴포넌트
├── hooks/         # Custom React Hooks
├── services/      # Firebase 및 API 서비스
├── types/         # TypeScript 타입 정의
├── utils/         # 유틸리티 함수
└── App.tsx        # 메인 앱 컴포넌트
```

## 🌐 배포

### Vercel 배포
```bash
# Vercel CLI 설치 (전역)
npm install -g vercel

# 배포
vercel
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
