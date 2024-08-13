const convertToKST = (isoString: string): Date => {
  const date = new Date(isoString); // ISO 8601 문자열을 Date 객체로 변환
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
  };
  return new Date(new Intl.DateTimeFormat('ko-KR', options).format(date));
};

const formatDate = (isoString: string, format?: string): string => {
  const date = convertToKST(isoString);

  if (format) {
    // 원하는 형식으로 포맷팅
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 포맷 문자열에 따라 결과 생성
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  // 기본 포맷 (YYYY-MM-DD HH:mm:ss)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

export default formatDate;
