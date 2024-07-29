import Header from '@components/layout/Header/Header';
import Main from '@components/layout/Main/Main';
import Footer from '@components/layout/Footer/Footer';

import './PageLayout.css';

const PageLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <div className="PageLayout">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

export default PageLayout;
