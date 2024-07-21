## TIL-Frontend

### 사용 기술 스택 및 버전

> - **React**: 18.3.1
> - **React**: 18.3.1
> - **React DOM**: 18.3.1
> - **Redux**: 5.0.1
> - **React Redux**: ^9.1.2
> - **TypeScript**: 5.1.6
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
docker-compose -f docker-compose-local.yml up

# 백그라운드 모드에서 실행
docker-compose up  -f docker-compose-local.yml -d
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

```
cd TIL-Frontend
yarn install
```

#### 3. 개발 서버 실행

개발 서버 실행한다.

```
yarn start
```

http://localhost:3000 에 접속한다.

---

### git hook 설정 적용

```bash
# 로컬에서 커밋 컨벤션 검증 적용
sh .github/hooks/cp-hook-folder.sh
```
