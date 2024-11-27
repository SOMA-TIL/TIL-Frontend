/* eslint-disable import/prefer-default-export */
export const getResultEmoji = (input: string | boolean | undefined): string => {
  if (typeof input === 'string') {
    switch (input) {
      case 'PASS':
        return '🥰';
      case 'FAIL':
        return '😓';
      default:
        return '🤔';
    }
  } else {
    return input ? '🥰' : '😓';
  }
};
