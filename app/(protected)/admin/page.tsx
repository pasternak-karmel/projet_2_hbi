"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin()
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
        }
      })
  }
  
  const onApiRouteClick = () => {
    fetch("/api/admin")
      .then((response) => {
        if (response.ok) {
          toast.success("Allowed API Route!");
        } else {
          toast.error("Forbidden API Route!");
        }
      })
  }

  return (
    <Card className="text-center justify-center w-full max-w-4xl mx-auto  border-none">
      <CardHeader className="w-full">
        <p className="text-2xl font-semibold text-center">
          🔑 Admin
        </p>
      </CardHeader>
      <CardContent className="space-y-4  items-center ">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess
            message="You are allowed to see this content!"
          />
        </RoleGate>
        <div className="flex flex-col sm:flex-row items-center justify-between rounded-lg border p-3 shadow-md w-full">
          <p className="text-sm font-medium w-full sm:w-auto mb-2 sm:mb-0 text-center sm:text-left">
            Admin-only API Route
          </p>
          <Button className="w-full sm:w-auto" onClick={onApiRouteClick}>
            Click to test
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between rounded-lg border p-3 shadow-md w-full">
          <p className="text-sm font-medium w-full sm:w-auto mb-2 sm:mb-0 text-center sm:text-left">
            Admin-only Server Action
          </p>
          <Button className="w-full sm:w-auto" onClick={onServerActionClick}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
