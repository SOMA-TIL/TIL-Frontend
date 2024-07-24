import Header from '@components/layout/Header/Header';
import Footer from '@components/layout/Footer/Footer';

import './PageLayout.css';

const PageLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <div className="PageLayout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PageLayout;
