"use client"
import Footer from "./Footer";
import Agent from "./agent/page";
import Navbar from "./agent_components/agent-navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div>
      <div className=" items-center justify-center">
        
        <Navbar />
        {children}
        {/* <Agent /> */}
        <Footer/> 
      </div>
    </div>  
  );
};

export default ProtectedLayout;
