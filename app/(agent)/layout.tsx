interface AgentLayoutProps {
  children: React.ReactNode;
}

const AgentLayout = ({ children }: AgentLayoutProps) => {
  return (
    <div>
      <div className=" items-center justify-center">{children}</div>
    </div>
  );
};

export default AgentLayout;
