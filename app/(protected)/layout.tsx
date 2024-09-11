import Footer from "./Footer";
import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="">
      <div className=" items-center justify-center">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default ProtectedLayout;
