"use client";

// import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  return ( 
    // <UserInfo
    //   label="📱 Client component"
    //   user={user}
    // />
    <div className="text-center justify-center w-full max-w-4xl mx-auto  border-none">
      Client page
    </div>
   );
}
 
export default ClientPage;