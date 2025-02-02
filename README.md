## TIL-Frontend

### 사용 기술 스택 및 버전

> - **React**: 18.3.1
> - **React DOM**: 18.3.1
> - **Redux**: 5.0.1
> - **React Redux**: 9.1.2
> - **TypeScript**: 5.1.6
> - **Zustand**: 4.5.4
> - **Vite**: 5.4.2
> - **Babel**: 7.24.7
> - **ESLint**: 8.57.0
> - **Prettier**: 3.3.2

---

## Getting Started

### 프로젝트 클론

아래 명령어를 실행하여 프로젝트를 클론받는다.

```bash
git clone https://github.com/SOMA-TIL/TIL-Frontend.git
```

### 1. Docker-compose를 통한 실행

개발환경에 docker-compose가 세팅되어 있는 경우

```
# 포어그라운드 모드에서 실행
docker-compose up

# 백그라운드 모드에서 실행
docker-compose up -d
```

http://localhost:3000 에 접속한다.

### 2. 로컬에서 실행

#### 1-1. Mac 환경설정

Homebrew 설치된 환경에서 터미널에 다음 명령어를 실행한다.

```
brew install node
brew install yarn
```

#### 1-2. Window 환경설정

[Node.js 공식 사이트](https://nodejs.org/en)에서 'Recommended For Most Users' 버전을 다운로드한다.

```
npm install --global yarn
```

#### 2. 의존성 설치

프로젝트 디렉토리에 들어가서 의존성을 설치한다.

```bash
cd TIL-CLIENT # or cd TIL-ADMIN
yarn install
```

#### 3. 개발 서버 실행

개발 서버 실행한다.

| ❗️주의❗️ 서버 실행 전 .env.template 파일을 참고하여 .env 파일을 생성하고 환경 변수를 설정해야 함

```bash
yarn start
```

- TIL-CLIENT : http://localhost:3000
- TIL-ADMIN : http://localhost:5000

---

### git hook 설정 적용

- `yarn start` 명령어에 git hook 관련 설정을 최신화할 수 있도록 `yarn run copy-hooks`를 먼저 실행하도록 구성됨  
  (별도 설정없이 자동 적용 가능)
