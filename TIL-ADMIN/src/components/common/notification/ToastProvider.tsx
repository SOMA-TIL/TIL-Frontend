import React, { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { notification } from 'antd';
import { TOAST_POS, TOAST_TYPE } from '@constants/toast';

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastOptions {
  message: string; // 알림창 제목
  description: string; // 알림창 내용
  type?: (typeof TOAST_TYPE)[keyof typeof TOAST_TYPE]; // 알림창 유형
  duration?: number; // 알림창 노출 시간
  placement?: (typeof TOAST_POS)[keyof typeof TOAST_POS]; // 알림창 위치
}

interface ToastContextType {
  notify: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const notify = useCallback(
    ({
      message,
      description,
      type = TOAST_TYPE.OPEN,
      duration = 2,
      placement = TOAST_POS.TOP,
    }: ToastOptions): void => {
      notification[type]({
        message,
        description,
        duration,
        placement,
      });
    },
    [],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
