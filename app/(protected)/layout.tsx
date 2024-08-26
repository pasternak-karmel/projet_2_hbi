import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className=" items-center justify-center">
      {/* <Navbar /> */}
      {children}
    </div>
  );
};

export default ProtectedLayout;
