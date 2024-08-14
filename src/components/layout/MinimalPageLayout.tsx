import MinimalMain from './MinimalMain/MinimalMain';

interface MinimalPageLayoutProps {
  children: React.ReactNode;
}

const MinimalPageLayout = (props: MinimalPageLayoutProps) => {
  const { children } = props;

  return <MinimalMain>{children}</MinimalMain>;
};

export default MinimalPageLayout;
