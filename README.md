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
- **Bundler**: Vite
- **State Management**: React Query
- **UI**: TailwindCSS
- **Auth**: GitHub OAuth
- **Testing**: Vitest + React Testing Library + happy-dom
- **Mocking**: MSW
- **CI**: GitHub Actions
- **Lint/Format**: ESLint, Prettier

### Key Decisions

- **Vite + TS**로 빠르고 안정적인 개발 환경 구축
- **AuthContext + useAuth**로 인증 흐름 관리
- **MSW**로 백엔드 없이 FE 단독 개발 가능
- **Timer / formatTime을 유틸화 → 테스트 가능 구조**
- **Vitest & GitHub Actions**로 테스트 자동화 도입

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
  test/
    setup.ts          # jest-dom 포함 테스트 환경 설정
```

### Design Principles

- 역할/도메인 기반 폴더 구조
- 인증/세션 전역 관리
- 테스트 가능한 구조 설계
- 재사용 가능한 컴포넌트 중심 설계

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

# 테스트
npm test
npm run test:watch
```

---

## 6. Testing

### 사용한 테스트 스택

- Vitest
- React Testing Library
- happy-dom
- jest-dom

### 작성된 테스트

- 유틸 함수 테스트 (formatTime)

  - 분/초 변환
  - 문자열 포맷 검증

- Timer 컴포넌트 테스트
  - 첫 렌더링 mm:ss 표시
  - Fake Timers로 1초 단위 감소 검증
  - 10초 시점 onBeforeEnd 정확히 1회 호출
  - 0초 도달 시 onTimeOver 호출
  - key 변경 시 타이머 초기화

---

## 7. CI — GitHub Actions

PR 및 push 시 자동으로 아래가 실행됩니다:

- npm run lint
- npm run typecheck
- npm test

→ 실패 시 merge 불가 </br>
→ 자동 품질 유지

---

## 8. Engineering Highlights

### ✔ GitHub OAuth + 인증 문제 해결

- StrictMode로 인한 useEffect 중복 실행 문제 해결
- Refresh Token 무한 요청 루프 해결
- 쿠키 삭제 후 로그인 상태가 남는 버그 해결
- Axios 인터셉터 기반 인증 흐름 안정화

### ✔ 타이머 UX + 자동 제출

- 질문마다 독립적인 타이머
- 시간 종료 시 자동 제출 → 다음 질문 전환
- Timer, formatTime 등 테스트 가능한 구조로 분리

### ✔ DX(Developer Experience) 강화

- ESLint + Prettier + TS + Vite
- Vitest 도입 및 happy-dom 환경 구성
- GitHub Actions로 CI 자동화

---

## 9. My Contribution

프론트엔드 **단독 개발**로 전체를 담당했습니다.

- 전체 아키텍처 설계
- OAuth + 인증 플로우 개발
- Timer, Counter, AnswerInput, Toast 구현
- 페이지 흐름(Landing → Interview → Feedback) 개발
- Axios 인터셉터 기반 인증 안정화
- MSW 기반 Mock API 구성
- 테스트 환경(Vitest) 구축
- GitHub Actions CI 구축

---

## 10. Future Improvements

- AI 피드백 자동 생성
- 질문 카테고리/난이도 확장
- 모바일 UI 강화
- 테스트 커버리지 확장
- DX/퍼포먼스 고도화
