import styled from 'styled-components';

import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';
import { DARK_GREY, LIGHT_PURPLE, PRIMARY_PURPLE, WHITE } from '@styles/pallete';

export const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: ${DISPLAY_HEIGHT_WITHOUT_HEADER};
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;

const MENU_TAB_SIZE = '300px';

export const MyPageMenuTab = styled.div`
  position: absolute;
  display: flex;
  width: ${MENU_TAB_SIZE};
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${LIGHT_PURPLE};
  padding: 20px 0;

  button + button {
    margin-top: 10px;
  }
`;

export const MyPageMenuTabButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  width: 260px;
  height: 50px;
  font-size: 16px;
  font-weight: semibold;
  color: ${({ isActive }) => (isActive ? WHITE : DARK_GREY)};
  background-color: ${({ isActive }) => (isActive ? PRIMARY_PURPLE : 'transparent')};
  border: none;
  border-radius: 10px;
  padding: 0 20px;

  svg {
    margin-right: 10px;
  }
`;

export const MyPageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${MENU_TAB_SIZE};
  width: calc(100% - ${MENU_TAB_SIZE});
  height: 100%;
  padding: 90px 160px;
`;

export const MyPageContentTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 120px;
  height: 120px;
  margin-bottom: 40px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

export const ProfileImageUpdateButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  right: 0;
  bottom: 0;
  background-color: ${WHITE};
  border-radius: 50%;
  border: 2px solid ${WHITE};
`;

export const UserIcon = ({ color = DARK_GREY }) => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 19C17 17.6044 17 16.9067 16.8278 16.3389C16.44 15.0605 15.4395 14.06 14.1611 13.6722C13.5933 13.5 12.8956 13.5 11.5 13.5H6.5C5.10444 13.5 4.40665 13.5 3.83886 13.6722C2.56045 14.06 1.56004 15.0605 1.17224 16.3389C1 16.9067 1 17.6044 1 19M13.5 5.5C13.5 7.98528 11.4853 10 9 10C6.51472 10 4.5 7.98528 4.5 5.5C4.5 3.01472 6.51472 1 9 1C11.4853 1 13.5 3.01472 13.5 5.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const KeyIcon = ({ color = DARK_GREY }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13 7H13.01M13 13C16.3137 13 19 10.3137 19 7C19 3.68629 16.3137 1 13 1C9.68629 1 7 3.68629 7 7C7 7.27368 7.01832 7.54308 7.05381 7.80704C7.11218 8.24118 7.14136 8.45825 7.12172 8.59559C7.10125 8.73865 7.0752 8.81575 7.00469 8.9419C6.937 9.063 6.81771 9.18229 6.57913 9.42087L1.46863 14.5314C1.29568 14.7043 1.2092 14.7908 1.14736 14.8917C1.09253 14.9812 1.05213 15.0787 1.02763 15.1808C1 15.2959 1 15.4182 1 15.6627V17.4C1 17.9601 1 18.2401 1.10899 18.454C1.20487 18.6422 1.35785 18.7951 1.54601 18.891C1.75992 19 2.03995 19 2.6 19H4.33726C4.58185 19 4.70414 19 4.81923 18.9724C4.92127 18.9479 5.01881 18.9075 5.10828 18.8526C5.2092 18.7908 5.29568 18.7043 5.46863 18.5314L10.5791 13.4209C10.8177 13.1823 10.937 13.063 11.0581 12.9953C11.1843 12.9248 11.2613 12.8987 11.4044 12.8783C11.5417 12.8586 11.7588 12.8878 12.193 12.9462C12.4569 12.9817 12.7263 13 13 13Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ImageUpdateIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill="#555555" />
    <path
      d="M19.2 8L22 10.8M8 22L8.89348 18.7239C8.95177 18.5102 8.98092 18.4033 9.02566 18.3036C9.06539 18.2152 9.1142 18.131 9.17132 18.0526C9.23565 17.9644 9.31398 17.886 9.47063 17.7294L16.704 10.496C16.8426 10.3574 16.9119 10.2881 16.9918 10.2621C17.0621 10.2393 17.1379 10.2393 17.2082 10.2621C17.2881 10.2881 17.3574 10.3574 17.496 10.496L19.504 12.504C19.6426 12.6426 19.7119 12.7119 19.7379 12.7918C19.7607 12.8621 19.7607 12.9379 19.7379 13.0082C19.7119 13.0881 19.6426 13.1574 19.504 13.296L12.2706 20.5294C12.114 20.686 12.0356 20.7643 11.9474 20.8287C11.869 20.8858 11.7848 20.9346 11.6964 20.9743C11.5967 21.0191 11.4898 21.0482 11.2761 21.1065L8 22Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
