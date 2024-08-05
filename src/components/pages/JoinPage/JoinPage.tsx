import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_POS, TOAST_TYPE } from '@constants/toast';
import { JoinData, checkNickname, join } from '@services/api/userService';
import { getErrorMessage } from '@utils/errorHandler';
import { HalfWidthDiv } from '@styles/DivStyle';
import { PRIMARY_PURPLE } from '@styles/pallete';
import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';
import Form, {
  FormInput,
  FormInputError,
  FormSection,
  FormSectionTitle,
  FormTitle,
} from '@styles/FormStyle';
import { Button } from '@styles/ButtonStyle';
import { EMAIL, NICKNAME, PASSWORD, CONFIRM_PASSWORD } from '@utils/userInfo';

const JoinPage: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useToast();
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinData>();

  const onSubmit: SubmitHandler<JoinData> = async (data: JoinData) => {
    try {
      await join(data);
      notify({
        message: '회원가입 성공',
        description: '로그인 페이지로 이동합니다.',
        type: TOAST_TYPE.SUCCESS,
        placement: TOAST_POS.TOP_RIGHT,
      });
      navigate('/login');
    } catch (err) {
      notify({
        message: '회원가입 실패',
        description: getErrorMessage(err),
        type: TOAST_TYPE.ERROR,
        placement: TOAST_POS.BOTTOM_RIGHT,
      });
    }
  };

  const validateNickname = async (nickname: string) => {
    try {
      await checkNickname(nickname);
      return true;
    } catch (err) {
      return getErrorMessage(err);
    }
  };

  return (
    <>
      <HalfWidthDiv bgColor={PRIMARY_PURPLE} height={DISPLAY_HEIGHT_WITHOUT_HEADER}>
        <img src="/images/ad.png" alt="TIL ad" style={{ width: '700px' }} />
      </HalfWidthDiv>
      <HalfWidthDiv>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>회원가입</FormTitle>
          <FormSection>
            <FormSectionTitle>{EMAIL.INPUT_TITLE}</FormSectionTitle>
            <FormInput
              {...register('email', {
                required: EMAIL.REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL.REGEX,
                  message: EMAIL.ERROR_MESSAGE,
                },
                onBlur: () => trigger('email'),
              })}
              placeholder={EMAIL.INPUT_PLACEHOLDER}
            />
            <FormInputError>{errors.email?.message}</FormInputError>
          </FormSection>
          <FormSection>
            <FormSectionTitle>{NICKNAME.INPUT_TITLE}</FormSectionTitle>
            <FormInput
              type="text"
              {...register('nickname', {
                required: NICKNAME.REQUIRED_MESSAGE,
                pattern: {
                  value: NICKNAME.REGEX,
                  message: NICKNAME.ERROR_MESSAGE,
                },
                validate: validateNickname,
                onBlur: async (event) => {
                  await trigger('nickname');
                  validateNickname(event.target.value);
                },
              })}
              placeholder={NICKNAME.INPUT_PLACEHOLDER}
            />
            <FormInputError>{errors.nickname?.message}</FormInputError>
          </FormSection>
          <FormSection>
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
          <FormSection>
            <FormSectionTitle>{CONFIRM_PASSWORD.INPUT_TITLE}</FormSectionTitle>
            <FormInput
              type="password"
              {...register('confirmPassword', {
                required: CONFIRM_PASSWORD.REQUIRED_MESSAGE,
                validate: (value, { password }) =>
                  value === password || CONFIRM_PASSWORD.ERROR_MESSAGE,
                onBlur: () => trigger('confirmPassword'),
              })}
              placeholder={CONFIRM_PASSWORD.INPUT_PLACEHOLDER}
            />
            <FormInputError>{errors.confirmPassword?.message}</FormInputError>
          </FormSection>
          <Button type="submit">회원가입</Button>
        </Form>
      </HalfWidthDiv>
    </>
  );
};

export default JoinPage;
