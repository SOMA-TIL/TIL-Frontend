import React from 'react';
import { useForm } from 'react-hook-form';

import BasicPageLayout from '@components/layout/BasicPageLayout';
import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_POS, TOAST_TYPE } from '@constants/toast';
import { checkNickname, updateNickname, UpdateNicknameData } from '@services/api/userService';
import Form, {
  FormInput,
  FormInputError,
  FormInputInfo,
  FormSection,
  FormSectionTitle,
} from '@styles/FormStyle';
import { Button } from '@styles/ButtonStyle';
import useUserInfoStore from '@store/useUserInfoStore';
import { getErrorMessage } from '@utils/errorHandler';
import { NICKNAME } from '@utils/userInfo';

import MyPageMenu from './MyPageMenu';
import {
  MyPageContainer,
  MyPageContent,
  MyPageContentTitle,
  ProfileImageContainer,
  ProfileImageUpdateButton,
  ImageUpdateIcon,
} from './MyPage.style';

const MyPageChangeInfo: React.FC = () => {
  const { notify } = useToast();
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateNicknameData>();

  const validateNickname = async (nickname: string) => {
    const originalNickname = useUserInfoStore.getState().getNickname();
    if (nickname === originalNickname) {
      return '기존 닉네임과 동일합니다.';
    }
    try {
      await checkNickname(nickname);
      return true;
    } catch (err) {
      return getErrorMessage(err);
    }
  };

  const onSubmit = async (data: UpdateNicknameData) => {
    try {
      await updateNickname(data);
      notify({
        message: '닉네임 변경 성공',
        description: '성공적으로 닉네임이 변경되었습니다.',
        type: TOAST_TYPE.SUCCESS,
        placement: TOAST_POS.TOP_RIGHT,
      });
      useUserInfoStore.getState().setNickname(data.nickname);
    } catch (err) {
      notify({
        message: '닉네임 변경 실패',
        description: getErrorMessage(err),
        type: TOAST_TYPE.ERROR,
        placement: TOAST_POS.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <BasicPageLayout>
      <MyPageContainer>
        <MyPageMenu currMenu="mypage" />
        <MyPageContent>
          <MyPageContentTitle>내 정보 수정</MyPageContentTitle>
          <ProfileImageContainer>
            {/* todo : replace with real image */}
            <img src="https://loremflickr.com/120/120" alt="profile" />{' '}
            <ProfileImageUpdateButton>
              <ImageUpdateIcon />
            </ProfileImageUpdateButton>
          </ProfileImageContainer>
          <Form display="inline-block" onSubmit={handleSubmit(onSubmit)}>
            <FormSection alignItems="left">
              <FormSectionTitle>아이디(이메일)</FormSectionTitle>
              <FormInput
                type="email"
                placeholder="이메일을 입력해주세요."
                value="til@gmail.com" // todo : replace with real email
                disabled
              />
              <FormInputInfo>아이디는 변경할 수 없습니다.</FormInputInfo>
            </FormSection>
            <FormSection alignItems="left">
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
                defaultValue={useUserInfoStore.getState().getNickname()}
              />
              <FormInputError>{errors.nickname?.message}</FormInputError>
            </FormSection>
            <Button type="submit">수정</Button>
          </Form>
        </MyPageContent>
      </MyPageContainer>
    </BasicPageLayout>
  );
};

export default MyPageChangeInfo;
