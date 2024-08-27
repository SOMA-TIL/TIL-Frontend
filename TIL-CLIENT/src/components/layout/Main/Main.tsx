import MainArea from './Main.style';

const Main = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return <MainArea>{children}</MainArea>;
};

export default Main;
