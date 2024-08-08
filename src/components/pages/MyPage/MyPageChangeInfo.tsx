import React from 'react';

import BasicPageLayout from '@components/layout/BasicPageLayout';
import Form, { FormSection, FormSectionTitle } from '@styles/FormStyle';
import { Button } from '@styles/ButtonStyle';

import MyPageMenu from './MyPageMenu';
import { MyPageContainer, MyPageContent, MyPageContentTitle } from './MyPage.style';

const MyPageChangeInfo: React.FC = () => (
  <BasicPageLayout>
    <MyPageContainer>
      <MyPageMenu />
      <MyPageContent>
        <MyPageContentTitle>내 정보 수정</MyPageContentTitle>
        <Form display="inline-block">
          <FormSection alignItems="left">
            <FormSectionTitle>아이디</FormSectionTitle>
          </FormSection>
          <Button type="submit">수정</Button>
        </Form>
      </MyPageContent>
    </MyPageContainer>
  </BasicPageLayout>
);

export default MyPageChangeInfo;
