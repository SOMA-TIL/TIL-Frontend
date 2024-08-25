import { BLACK, DARK_GREY2, LIGHT_GREY, PRIMARY_PURPLE } from './pallete';

export const BookMarkIcon = ({
  isFavorite,
  onClick,
}: {
  isFavorite: boolean;
  onClick?: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={isFavorite ? '즐겨찾기 제거' : '즐겨찾기 추가'}
  >
    <svg
      width="20"
      height="26"
      viewBox="0 0 20 26"
      fill={isFavorite ? PRIMARY_PURPLE : 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.25 7.75C1.25 5.6498 1.25 4.5997 1.65873 3.79754C2.01825 3.09193 2.59193 2.51825 3.29754 2.15873C4.0997 1.75 5.1498 1.75 7.25 1.75H12.75C14.8502 1.75 15.9003 1.75 16.7025 2.15873C17.4081 2.51825 17.9817 3.09193 18.3413 3.79754C18.75 4.5997 18.75 5.6498 18.75 7.75V24.25L10 19.25L1.25 24.25V7.75Z"
        stroke={isFavorite ? PRIMARY_PURPLE : BLACK}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export const BookMarkSmallIcon = ({
  isFavorite,
  disable,
}: {
  isFavorite: boolean;
  disable?: boolean;
}) => {
  let strokeColor;
  let fillColor;
  if (disable === true) {
    strokeColor = LIGHT_GREY;
    fillColor = 'none';
  } else if (isFavorite) {
    strokeColor = PRIMARY_PURPLE;
    fillColor = PRIMARY_PURPLE;
  } else {
    strokeColor = DARK_GREY2;
    fillColor = 'none';
  }

  return (
    <svg
      width="15"
      height="17"
      viewBox="0 0 15 17"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.95837 5.175C1.95837 3.84488 1.95837 3.17981 2.21723 2.67177C2.44493 2.22489 2.80826 1.86156 3.25515 1.63386C3.76319 1.375 4.42825 1.375 5.75837 1.375H9.24171C10.5718 1.375 11.2369 1.375 11.7449 1.63386C12.1918 1.86156 12.5551 2.22489 12.7828 2.67177C13.0417 3.17981 13.0417 3.84488 13.0417 5.175V15.625L7.50004 12.4583L1.95837 15.625V5.175Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
