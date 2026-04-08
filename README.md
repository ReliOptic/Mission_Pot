# Mission Pot : 미션팟

고성능 습관 형성을 위한 고위험/고수익 스테이킹 플랫폼. 미션을 실패하면 예치금이 사라집니다.

## 🚀 Engineering-First Architecture

본 프로젝트는 2026년 표준에 맞춘 **Layered Architecture**를 따릅니다:

- **API Layer**: Express 라우터 및 컨트롤러 (`src/api`)
- **Service Layer**: 비즈니스 로직 및 도메인 규칙 (`src/services`)
- **Repository Layer**: 데이터 액세스 추상화 (`src/repositories`)
- **Middleware**: 보안, 로깅, 에러 핸들링 (`src/middleware`)

## 🛠 Prerequisites

- Node.js 20+
- npm 10+

## ⚙️ Environment Variables

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
GEMINI_API_KEY=your_api_key_here
```

## 📦 Installation & Deployment

1. 의존성 설치:
   ```bash
   npm install
   ```

2. 개발 서버 실행:
   ```bash
   npm run dev
   ```

3. 프로덕션 빌드:
   ```bash
   npm run build
   ```

4. 테스트 실행:
   ```bash
   npm test
   ```

## 🔒 Security & Performance

- **Helmet**: HTTP 헤더 보안 강화
- **Rate Limiting**: API 남용 방지 (15분당 100회 제한)
- **Structured Logging**: Winston을 이용한 구조화된 로그 기록
- **Strict TypeScript**: 모든 데이터 흐름에 대한 엄격한 타입 체크
