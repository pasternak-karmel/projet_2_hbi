"use client";
import { CalendarIcon, PackageIcon, CreditCardIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoaderState from "@/components/Loader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserPurchases() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const {
    isLoading,
    error,
    data: purchases,
  } = useQuery({
    queryKey: ["achats"],
    queryFn: () => fetch(`/api/article/achats`).then((res) => res.json()),
  });

  if (isLoading) return <LoaderState />;

  if (error)
    return (
      <div className="text-red-500 text-center">
        Une erreur est survenue lors de la récupération de vos achats
      </div>
    );

  const filteredOrders =
    selectedStatus === "All"
      ? purchases
      : purchases.filter((order: any) => order.status === selectedStatus);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12 text-gray-800">
        Mes Achats
      </h1>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-4">
              <Select onValueChange={setSelectedStatus} defaultValue="All">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  <SelectItem value="attente">En attente</SelectItem>
                  <SelectItem value="payer">Payer</SelectItem>
                  <SelectItem value="traitement">Traitement</SelectItem>
                  <SelectItem value="traiter">Traiter</SelectItem>
                  <SelectItem value="livrer">Livrer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order: any) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <CreditCardIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {order.totalAmount.toFixed(2)} XOF
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === "livrer"
                                ? "bg-green-100 text-green-800"
                                : order.status === "traitement"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href={`/produit/mesAchats/${order.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Voir les détails
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
