# MBTI TEST ✅

Vite + React를 사용한 프로젝트로, MBTI 테스트를 진행하고 결과를 공유할 수 있는 웹사이트 입니다.<br>
[프로젝트 URL 바로가기 💻](https://mbti-test-site.vercel.app//)
<br><br>

## 프로젝트 미리보기🩵

- Home
  ![alt text](홈.png)

- Test
  ![alt text](테스트.png)

- MyPage
  ![alt text](마이페이지.png)

- Results
  ![alt text](결과.png)

- MyResult

| ![alt text](결과페이지-공유하기.png) | ![alt text](결과페이지-테스트하기.png) |
| ----------------------------------------------- | ------------------------------------------------- |

- SignUp / Login

| ![alt text](가입.png) | ![alt text](로그인.png) |
| ------------------------ | --------------------------- |

- 반응형

<table>
  <tr>
    <td align="center">
      <img src="반응형홈.png" width="200px"><br>
      <strong>반응형 Home</strong>
    </td>
    <td align="center">
      <img src="반응형마이페이지.png" width="200px"><br>
      <strong>반응형 Mypage</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="반응형결과.png" width="200px"><br>
      <strong>반응형 Test</strong>
    </td>
    <td align="center">
      <img src="반응형테스트.png" width="200px"><br>
      <strong>반응형 Results</strong>
    </td>
  </tr>
</table>

<br><br>

## 프로젝트 소개📄

### 📆 프로젝트 기간 : 2025.02.20 ~ 2025.02.25

MBTI 성향 테스트와 결과 공유가 가능한 페이지입니다. JWT 인증서버를 사용하여 회원가입/로그인 기능이 구현되어 있고, 로컬스토리지를 활용해 로그인 정보를 저장합니다. `TEST 하러가기` 버튼으로 MBTI 성향 테스트가 가능하며, MyResult에서 결과를 공유할 수 있습니다. `결과 보러가기` 버튼으로 다른 사람들의 모든 테스트 결과를 확인할 수 있고, 본인의 테스트 결과를 숨김처리 할 수 있습니다. MyPage에서 닉네임 변경과 자신의 테스트 결과 확인 및 숨김처리/삭제가 가능합니다.

반응형 디자인이 적용되어, PC와 모바일 환경 모두에서 최적화된 화면을 제공합니다.
<br><br>

## 프로젝트 사용 기술💻

### Environment

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### Deploy

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Glitch](https://img.shields.io/badge/glitch-%233333FF.svg?style=for-the-badge&logo=glitch&logoColor=white)
<br><br>

## 프로젝트 기능⚙️

- React 기반으로 개발되었습니다.
- 한국어 지원을 제공합니다.
- 로컬 스토리지를 활용해 새로고침해도 로그인 정보가 유지됩니다.
- `tailwind CSS`를 사용해 반응형 디자인을 적용하였습니다.
- `tanstack query (react query)`를 사용해 서버 상태를 효율적으로 관리합니다.
- `zustand`를 활용해 로그인 전역 상태를 구축하였습니다.
- `react-toastify` 라이브러리를 사용한 알람창으로 UX를 개선하였습니다.
  <br><br>

## 트러블 슈팅🧑‍💻

[TroubleShooting 1 : Tailwind CSS](https://velog.io/@miiing_gaeng/MBTI-%ED%85%8C%EC%8A%A4%ED%8A%B8-%ED%8E%98%EC%9D%B4%EC%A7%80-TroubleShooting-1-Tailwind-CSS)

[요약]<br>
문제 ▶️ tailwind CSS가 적용이 잘 안되는 문제 발생
<br>해결 ▶️ node_modules 재설치 및 tailwind CSS 공식 문서에서 문법 확인
<br>교훈 ▶️ 공식 문서를 꼼꼼히 보고, chatGPT를 너무 믿지 말자!

## 프로젝트 후기✍️

이번 프로젝트는 tanstack query를 활용한 서버 상태관리와 json-server API 통신이 주요 포인트였다. 이전에는 주로 클라이언트 상태 관리에 집중하면서 React의 UI 측면만 고려했는데, 서버 상태관리와 관련된 툴과 문법을 배움으로써 코드의 성능적인 측면을 고려할 수 있게 되었다.<br>
사실 문법을 제대로 이해하지 못했지만, 익숙해지기 위해 여러번 연습해야할 필요가 있다. 그리고 성능적인 측면을 어떻게 확인할 수 있을지, 어떻게 더 나은 방법으로 개선할 수 있을지 찾아보자.
