## Dev-Prep — 타이핑 기반 면접 연습

면접 질문을 타이핑으로 답하고, 제한시간 내 제출하는 연습 환경을 제공합니다. <br/> 현재 AI 피드백/모범 답안은 개발 예정이며, 관련 UI는 구현되어 있습니다.

#### 핵심 기능

- 비로그인 사용자 체험: 1개의 샘플 질문으로 서비스 체험 가능
- 로그인 사용자: 질문 개수·유형(기술/인성) 선택 → 타이머 기반으로 답변 작성 → 자동 제출
- UI: 답변 입력창, 타이머, 진행 카운터, 피드백 화면(현재는 UI만)

#### 서비스 흐름 (사용자 관점)

1. Landing → (체험 또는 로그인) → 면접 설정
2. 면접 진행: 질문 표시 → 타이머 작동 → 시간 내 답변 입력 → 제출(수동/자동)
3. 모든 질문 완료 → 피드백 화면(모형)

#### 프로젝트 구조 (주요 파일)

```
src/
├── api/                # API 호출 함수들 (auth, question 등)
├── components/
│   ├── common/
│   │   ├── AnswerInput.tsx    # 답변 입력 컴포넌트
│   │   ├── Timer.tsx          # 질문별 타이머
│   │   ├── Question.tsx       # 질문 표시 컴포넌트
│   │   ├── Counter.tsx        # 진행도 표시
│   │   ├── ModelAnswer.tsx    # 모범 답안/피드백 UI (현재 UI만)
│   │   └── CustomToast.tsx
│   └── layout/
│       └── Layout.tsx
├── pages/
│   ├── LandingPage.tsx
│   ├── PreInterviewSetupPage.tsx
│   ├── PreInterviewPage.tsx
│   ├── InterviewSetupPage.tsx
│   ├── InterviewPage.tsx
│   └── FeedbackPage.tsx
├── context/             # AuthContext, AuthProvider
├── hooks/               # useAuth 등
└── utils/               # oauth, toast 등
```

#### 실제 구현 상태

- 구현 완료

  - 라우팅, 페이지 흐름(비로그인/로그인 분기)
  - 면접 설정 페이지(질문 수, 유형 선택)
  - 타이머 기반 답변 입력/자동 제출 로직
  - 기본 UI/레이아웃

- 개발 예정
  - AI 기반 피드백 로직(서버/모델 연동)
  - 모범 답안 비교 기능
  - 답변 이력 저장/분석
