// antd notification 참고: https://ant.design/components/notification#api

// 알림창 유형
export const TOAST_TYPE = {
  SUCCESS: 'success' as const,
  INFO: 'info' as const,
  WARNING: 'warning' as const,
  ERROR: 'error' as const,
  OPEN: 'open' as const,
} as const;

// 알림창 위치
export const TOAST_POS = {
  TOP: 'top' as const,
  TOP_RIGHT: 'topRight' as const,
  TOP_LEFT: 'topLeft' as const,
  BOTTOM: 'bottom' as const,
  BOTTOM_RIGHT: 'bottomRight' as const,
  BOTTOM_LEFT: 'bottomLeft' as const,
} as const;
