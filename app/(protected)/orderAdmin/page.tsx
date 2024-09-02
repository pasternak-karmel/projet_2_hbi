"use client";
import { adminGetOrder } from "@/actions/admin-get-order";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";

export default function OrderAdmin() {
  const {
    isLoading,
    error,
    data: purchases,
  } = useQuery({
    queryKey: ["OrderAdmin"],
    queryFn: () => adminGetOrder(),
  });

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="text-red-500 text-center">
        Une erreur est subvenue lors de la récupération de vos achats
      </div>
    );
  return (
    <div>
      Order Managment
      <div></div>
    </div>
  );
}
