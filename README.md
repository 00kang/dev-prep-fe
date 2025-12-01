# Dev-Prep — 실전형 타이핑 면접 연습 서비스 (Frontend)

타이핑 기반 면접 연습을 **실제 면접 환경처럼** 경험할 수 있는 React + TypeScript 기반 웹 애플리케이션입니다.  
GitHub OAuth 인증, 제한 시간, 자동 제출, 질문 세트 관리 등 실전 면접 흐름을 웹 상에서 재현하는 것을 목표로 개발했습니다.

---

## 1. Problem & Motivation

기존의 면접 준비 방식에는 다음과 같은 한계가 있다고 느꼈습니다.

- 실제처럼 **제한 시간 안에** 답변해보기가 어렵다.
- 질문이 **연속적으로 다가오는 긴장감**을 느끼기 어렵다.
- 노션/문서 도구 위주의 연습은, 실 서비스와 같은 **집중도와 몰입감**을 주기 어렵다.
- 개발자로서, **인증·타이머·상태 관리·비동기 흐름**까지 포함된 실전형 웹 서비스를 설계/구현해보고 싶었다.

Dev-Prep은 이러한 문제를 해결하기 위해, **“타이핑 기반 실전 면접 환경”** 을 제공하는 것을 목표로 합니다.

---

## 2. Solution Overview

Dev-Prep 프론트엔드는 다음과 같은 흐름을 제공합니다.

- **비로그인 사용자**
  - 1개의 샘플 질문으로 서비스 체험
- **로그인 사용자 (GitHub OAuth)**
  1. GitHub 계정으로 로그인  
  2. 질문 개수 및 유형 선택  
  3. 각 질문마다 제한 시간 타이머가 동작  
  4. 시간이 끝나면 **자동으로 답변을 제출하고 다음 질문으로 전환**  
  5. 모든 질문이 끝나면 결과/피드백 단계로 이동 (추가 기능 확장 예정)

사용자는 단순히 텍스트를 입력하는 수준을 넘어,  
**실제 면접처럼 “압박감 + 흐름”을 경험하며 연습**할 수 있습니다.

---

## 3. Tech Stack & Key Decisions

### Tech Stack
- **Framework**: React  
- **Language**: TypeScript  
- **Bundler/Dev Server**: Vite  
- **Styling**: TailwindCSS  
- **Auth**: GitHub OAuth  
- **Etc.**
  - ESLint / Prettier  
  - (추가 예정) Vitest / GitHub Actions  

### Key Decisions
- **Vite + TS 조합**  
  빠른 개발 환경과 타입 안정성을 위해 선택했습니다.
- **Context + Custom Hook 기반 인증 관리**  
  로그인 상태와 세션 상태를 전역에서 관리하기 위해 AuthContext + useAuth 구조를 설계했습니다.
- **역할 기반 폴더 구조 분리**  
  화면/UI/상태/API/유틸을 모듈화하여 유지보수성과 확장성을 확보했습니다.
- **재사용 가능한 컴포넌트 설계**  
  Timer, AnswerInput, Toast 등을 독립적인 공통 컴포넌트로 구성했습니다.

---

## 4. Architecture

```txt
src/
  api/                # Auth, Interview, Question 등 서버 통신 모듈
  components/
    common/           # AnswerInput, Timer, Counter, ModelAnswer, Toast 등 공통 UI 컴포넌트
    layout/           # 전체 페이지 공통 레이아웃
  pages/              # Landing, PreInterview, Interview, Feedback 등 화면 페이지
  context/            # AuthContext, AuthProvider (인증/세션 전역 관리)
  hooks/              # useAuth 등 재사용 비즈니스 로직
  utils/              # OAuth, 시간 포맷 등 유틸 함수
```

### 설계 포인트
- **도메인 기반 구조 분리**로 유지보수성 향상  
- **Context 기반 인증 관리**로 로그인·세션 일관성 확보  
- **Timer/Counter 컴포넌트 분리**로 재사용성 증가  
- **Custom Toast 시스템**으로 alert 기반 UX를 개선  

---

## 5. Development

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프리뷰 서버
npm run preview

# 린트 (ESLint)
npm run lint

# 타입 체크
npm run typecheck

# 테스트 (추가 예정)
npm test
```

---

## 6. Engineering Highlights

### 1) GitHub OAuth 로그인 흐름 설계
- GitHub OAuth `code` 수신 → 백엔드로 전달  
- access/refresh 토큰 발급 → HttpOnly 쿠키 저장  
- `/me` API로 로그인 상태 확인  
- StrictMode에서 발생하는 `useEffect` 중복 실행 문제 해결  
- Refresh Token 재발급 무한 루프를 플래그로 제어  
- 쿠키 삭제 후 상태가 남는 문제 해결

### 2) 타이머 기반 실전 UX & 자동 제출
- 질문마다 타이머가 독립적으로 동작  
- 시간이 종료되면 자동 제출 → 다음 질문으로 전환  
- 타이머/포맷팅/진행도는 모듈화하여 재사용 가능하게 구성  

### 3) Toast 기반 사용자 피드백 시스템
- 기존 alert 기반 UX 제거  
- CustomToast 컴포넌트로 일관된 성공/실패/경고 UI 제공  

### 4) 구조적 설계 & 확장성
- 프론트엔드 1인 개발로 전체 흐름·컴포넌트·API 구조를 직접 설계  
- 이후 AI 피드백/히스토리 관리 등 기능 확장 가능하도록 설계  

---

## 7. Test & CI

> ⚠️ 현재 테스트/CI 환경 추가 작업 중입니다.  
> 이후 업데이트 시 아래 항목이 포함될 예정입니다.

### 테스트 (Vitest)
- `src/utils` 중심으로 단위 테스트 작성  
- 시간 포맷터 등 순수 함수 테스트 예정  

### CI (GitHub Actions)
- push/pull_request 시 자동으로 아래 검사 수행 예정:
  - `npm run lint`
  - `npm run typecheck`
  - `npm test`

---

## 8. My Contribution

프론트엔드 **1인 개발**로 프로젝트 전반을 담당했습니다.

- 전체 프론트엔드 아키텍처 설계  
- 라우팅 및 사용자 흐름 구성  
- GitHub OAuth 및 인증 흐름 연동  
- Timer / Counter / AnswerInput / Toast 등 핵심 UI 구현  
- API, context, hooks, utils 설계 및 구현  
- 비동기 흐름 및 인증 문제 분석 → 해결  
- ESLint/Prettier/TS/Vite 기반 빌드 환경 구성  

---

## 9. Future Improvements
- 응답 데이터 기반 AI 피드백 기능  
- 질문 카테고리·난이도 확장  
- 모바일 UI 개선  
- 테스트 커버리지 확장  
- CI 파이프라인 고도화  
