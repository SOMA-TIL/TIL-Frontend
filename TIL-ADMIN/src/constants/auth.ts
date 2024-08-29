export const REFRESH_TOKEN = 'token';
export const BEARER = 'Bearer';

export const formatBearerToken = (token: string): string => `${BEARER} ${token}`;
