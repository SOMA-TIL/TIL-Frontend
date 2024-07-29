import './Main.css';

const Main = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return <main className="Main">{children}</main>;
};

export default Main;
