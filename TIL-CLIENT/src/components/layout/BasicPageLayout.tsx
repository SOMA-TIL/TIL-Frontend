import Header from '@components/layout/Header/Header';
import Main from '@components/layout/Main/Main';
import Footer from '@components/layout/Footer/Footer';

interface BasicPageLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const BasicPageLayout = (props: BasicPageLayoutProps) => {
  const { children, showFooter = false } = props; // 기본값을 false로 설정

  return (
    <>
      <Header />
      <Main>{children}</Main>
      {showFooter && <Footer />} {/* showFooter가 true일 때만 Footer 렌더링 */}
    </>
  );
};

export default BasicPageLayout;
