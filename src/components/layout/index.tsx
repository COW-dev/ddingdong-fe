import Footer from './Footer';
import UserHeader from './UserHeader';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between text-gray-800">
      <UserHeader />
      <div className="flex w-full max-w-6xl flex-col px-6 pt-22 md:px-16 md:pt-26">
        {children}
      </div>
      <Footer />
    </div>
  );
}
