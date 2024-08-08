import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import BasicPageLayout from '@components/layout/BasicPageLayout';
import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_POS, TOAST_TYPE } from '@constants/toast';
import { updatePassword, UpdatePasswordData } from '@services/api/userService';
import Form, { FormInput, FormInputError, FormSection, FormSectionTitle } from '@styles/FormStyle';
import { Button } from '@styles/ButtonStyle';
import { PASSWORD, NEW_PASSWORD, CONFIRM_NEW_PASSWORD } from '@utils/userInfo';
import { getErrorMessage } from '@utils/errorHandler';

import { MyPageContainer, MyPageContent, MyPageContentTitle } from './MyPage.style';
import MyPageMenu from './MyPageMenu';

const MyPageChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdatePasswordData>();
  const { notify } = useToast();

  const toastError = (message: string) => {
    notify({
      message: '비밀번호 변경 실패',
      description: message,
      type: TOAST_TYPE.ERROR,
      placement: TOAST_POS.TOP_RIGHT,
    });
  };

  const resetPasswordForm = (data: UpdatePasswordData, mode?: string) => {
    reset({
      password: mode === 'all' ? '' : data.password,
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  const onSubmit: SubmitHandler<UpdatePasswordData> = async (data: UpdatePasswordData) => {
    if (data.password === data.newPassword) {
      toastError('기존 비밀번호와 변경하려는 비밀번호가 동일합니다.');
      resetPasswordForm(data);
      return;
    }
    try {
      const response = await updatePassword(data);
      notify({
        message: '비밀번호 변경 성공',
        description: response?.status.message,
        type: TOAST_TYPE.SUCCESS,
        placement: TOAST_POS.TOP_RIGHT,
      });
      navigate('/mypage');
    } catch (err) {
      toastError(getErrorMessage(err));
      resetPasswordForm(data, 'all');
    }
  };

  return (
    <BasicPageLayout>
      <MyPageContainer>
        <MyPageMenu />
        <MyPageContent>
          <MyPageContentTitle>비밀번호 변경</MyPageContentTitle>
          <Form display="inline-block" onSubmit={handleSubmit(onSubmit)}>
            <FormSection alignItems="left">
              <FormSectionTitle>{PASSWORD.INPUT_TITLE}</FormSectionTitle>
              <FormInput
                type="password"
                {...register('password', {
                  required: PASSWORD.REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD.REGEX,
                    message: PASSWORD.ERROR_MESSAGE,
                  },
                  onBlur: () => trigger('password'),
                })}
                placeholder={PASSWORD.INPUT_PLACEHOLDER}
              />
              <FormInputError>{errors.password?.message}</FormInputError>
            </FormSection>
            <FormSection alignItems="left">
              <FormSectionTitle>{NEW_PASSWORD.INPUT_TITLE}</FormSectionTitle>
              <FormInput
                type="password"
                {...register('newPassword', {
                  required: NEW_PASSWORD.REQUIRED_MESSAGE,
                  pattern: {
                    value: NEW_PASSWORD.REGEX,
                    message: NEW_PASSWORD.ERROR_MESSAGE,
                  },
                  onBlur: () => trigger('newPassword'),
                })}
                placeholder={NEW_PASSWORD.INPUT_PLACEHOLDER}
              />
              <FormInputError>{errors.newPassword?.message}</FormInputError>
            </FormSection>
            <FormSection alignItems="left">
              <FormSectionTitle>{CONFIRM_NEW_PASSWORD.INPUT_TITLE}</FormSectionTitle>
              <FormInput
                type="password"
                {...register('confirmNewPassword', {
                  required: CONFIRM_NEW_PASSWORD.REQUIRED_MESSAGE,
                  validate: (value, { newPassword }) =>
                    value === newPassword || CONFIRM_NEW_PASSWORD.ERROR_MESSAGE,
                  onBlur: () => trigger('confirmNewPassword'),
                })}
                placeholder={CONFIRM_NEW_PASSWORD.INPUT_PLACEHOLDER}
              />
              <FormInputError>{errors.confirmNewPassword?.message}</FormInputError>
            </FormSection>

            <Button type="submit">수정</Button>
          </Form>
        </MyPageContent>
      </MyPageContainer>
    </BasicPageLayout>
  );
};

export default MyPageChangePassword;
