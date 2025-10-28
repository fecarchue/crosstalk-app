# Crosstalk App - React 프로젝트

## 📦 설치 방법

### 1. Node.js 설치 확인
먼저 Node.js가 설치되어 있는지 확인하세요:
```bash
node --version
npm --version
```

설치되어 있지 않다면 [Node.js 공식 사이트](https://nodejs.org/)에서 다운로드하세요.

### 2. 프로젝트 설치
```bash
# 프로젝트 폴더로 이동
cd crosstalk-app

# 패키지 설치
npm install
```

## 🖼️ 이미지 추가하는 방법

### 이미지 저장 위치
모든 이미지 파일은 `public/images/` 폴더에 넣으세요!

```
crosstalk-app/
└── public/
    └── images/          ← 여기에 이미지 저장!
        ├── logo.png
        ├── background.jpg
        ├── ai-avatar.png
        └── ...
```

### 이미지 사용 방법

#### 1. 로고 이미지 (환영 페이지)
파일: `src/components/WelcomePage.jsx` (약 30번째 줄)

```jsx
{/* 현재 코드의 주석을 풀고 이미지 경로 수정 */}
<img src="/images/logo.png" alt="Logo" className="w-32 h-32 mb-8" />
```

#### 2. 네비게이션 로고 (메인 페이지)
파일: `src/components/MainPage.jsx` (약 74번째 줄)

```jsx
{/* 현재 코드의 주석을 풀고 이미지 경로 수정 */}
<img src="/images/logo.png" alt="Crosstalk" className="h-8 w-auto mr-2" />
```

#### 3. 배경 이미지 (메인 페이지)
파일: `src/components/MainPage.jsx` (약 143번째 줄)

```jsx
{/* 현재 코드의 주석을 풀고 이미지 경로 수정 */}
<div className="absolute inset-0 z-0">
    <img src="/images/background.jpg" alt="" className="w-full h-full object-cover opacity-20" />
</div>
```

#### 4. AI 프로필 이미지 (채팅 페이지)
파일: `src/components/ChatPage.jsx` (약 78번째 줄)

```jsx
{/* 현재 코드의 주석을 풀고 이미지 경로 수정 */}
<div className="flex items-center">
    <img src="/images/ai-avatar.png" alt="AI" className="w-10 h-10 rounded-full mr-3" />
    <div>
        <h1 className="text-lg font-medium text-purple-700">Crosstalk AI</h1>
        <span className="text-sm text-gray-500">전문 상담사</span>
    </div>
</div>
```

## 🚀 실행 방법

### 개발 모드로 실행
```bash
npm start
```

브라우저에서 자동으로 `http://localhost:3000`이 열립니다.

### 빌드 (배포용)
```bash
npm run build
```

`build/` 폴더에 최적화된 파일들이 생성됩니다.

## 📁 프로젝트 구조

```
crosstalk-app/
├── public/
│   ├── index.html
│   └── images/              ← 이미지 파일들
├── src/
│   ├── components/
│   │   ├── WelcomePage.jsx   ← 환영 페이지
│   │   ├── MainPage.jsx      ← 메인 페이지
│   │   ├── LoadingPage.jsx   ← 로딩 페이지
│   │   ├── ChatPage.jsx      ← 채팅 페이지
│   │   ├── ScenarioPage.jsx  ← 시나리오 설정
│   │   └── Icons.jsx         ← 아이콘들
│   ├── App.jsx               ← 메인 앱
│   ├── App.css               ← 스타일
│   └── index.js              ← 엔트리 포인트
├── package.json
├── tailwind.config.js
└── README.md
```

## 💡 초보자를 위한 팁

### 1. 이미지 크기 조정
이미지가 너무 크거나 작으면 className에서 크기를 조정하세요:

```jsx
{/* 작게 */}
<img src="/images/logo.png" className="w-16 h-16" />

{/* 중간 */}
<img src="/images/logo.png" className="w-32 h-32" />

{/* 크게 */}
<img src="/images/logo.png" className="w-64 h-64" />
```

### 2. 이미지가 안 보일 때
- 이미지 파일명이 정확한지 확인 (대소문자 구분!)
- `public/images/` 폴더에 있는지 확인
- 경로가 `/images/파일명.확장자` 형식인지 확인
- 개발 서버를 재시작 (`Ctrl+C` 후 `npm start`)

### 3. 코드 수정 후
파일을 저장하면 자동으로 브라우저가 새로고침됩니다!

## 🎨 색상 테마

프로젝트의 주요 색상:
- Purple: `#8B5CF6` (purple-500)
- Indigo: `#6366F1` (indigo-500)
- Deep Indigo: `#4F46E5` (indigo-600)

## ❓ 문제 해결

### npm install 에러
```bash
# 캐시 삭제 후 재설치
npm cache clean --force
npm install
```

### 포트 충돌 (3000번 포트 사용 중)
다른 포트로 실행:
```bash
PORT=3001 npm start
```

## 📝 다음 단계

1. `public/images/` 폴더를 만들고 이미지 추가
2. 각 컴포넌트 파일에서 주석 처리된 이미지 코드 활성화
3. 이미지 경로를 실제 파일명으로 수정
4. `npm start`로 결과 확인!

즐거운 코딩 되세요! 🚀
