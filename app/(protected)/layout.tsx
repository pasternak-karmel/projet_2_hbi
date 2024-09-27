interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="">
      <div className=" items-center justify-center">{children}</div>
    </div>
  );
};

export default ProtectedLayout;
