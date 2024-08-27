import MinimalMainArea from './MinimalMain.style';

const MinimalMain = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return <MinimalMainArea>{children}</MinimalMainArea>;
};

export default MinimalMain;
