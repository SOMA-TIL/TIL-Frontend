import Header from '@components/layout/Header/Header';
import Main from '@components/layout/Main/Main';
import Footer from '@components/layout/Footer/Footer';

const BasicPageLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default BasicPageLayout;
