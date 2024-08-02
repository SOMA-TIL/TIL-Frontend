export const EMAIL = {
  INPUT_TITLE: '아이디(이메일) 입력',
  REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  ERROR_MESSAGE: '이메일 형식에 맞지 않습니다.',
  REQUIRED_MESSAGE: '이메일 입력은 필수입니다.',
  INPUT_PLACEHOLDER: '이메일을 입력해주세요',
};

export const NICKNAME = {
  INPUT_TITLE: '닉네임 입력',
  REGEX: /^[가-힣A-Za-z0-9]{2,12}$/,
  ERROR_MESSAGE: '2~12자의 한글, 영문, 숫자만 사용 가능합니다.',
  REQUIRED_MESSAGE: '닉네임 입력은 필수입니다.',
  INPUT_PLACEHOLDER: '닉네임을 입력하세요',
};

export const PASSWORD = {
  INPUT_TITLE: '비밀번호',
  REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
  ERROR_MESSAGE: '8~20자의 영문, 숫자 조합만 사용 가능합니다.',
  REQUIRED_MESSAGE: '비밀번호 입력은 필수입니다.',
  INPUT_PLACEHOLDER: '비밀번호를 입력하세요',
};

export const CONFIRM_PASSWORD = {
  INPUT_TITLE: '비밀번호 확인',
  ERROR_MESSAGE: '비밀번호가 일치하지 않습니다.',
  REQUIRED_MESSAGE: '비밀번호 확인은 필수입니다.',
  INPUT_PLACEHOLDER: '비밀번호를 확인해주세요',
};
