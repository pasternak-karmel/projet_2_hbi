"use client";
import Image from "next/image";
import { useState } from "react";
import {
  PackageIcon,
  CreditCardIcon,
  TruckIcon,
  CheckCircleIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { OrderTimeline } from "./OrderTimeline";

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await db.order.findUnique({
    where: { id: params.id },
    include: {
      User: true,
    },
  });

  if (!order) {
    return notFound();
  }

  const { id, totalAmount, items, status, createdAt, User } = order;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Détails de la commande</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Commande #{id}</CardTitle>
              <CardDescription>
                Passée le {new Date(createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Statut</span>
                  <Badge variant={status === "payer" ? "default" : "secondary"}>
                    {status}
                  </Badge>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Articles</h3>
                  <ul className="space-y-2">
                    {(
                      order.items as Array<{
                        productId: string;
                        nom: string;
                        image: string;
                        price: number;
                        quantity: number;
                      }>
                    ).map((item) => (
                      <li key={item.productId} className="flex justify-between">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={item.image}
                            alt={item.nom}
                            className="h-full w-full object-cover"
                            width={96}
                            height={96}
                          />
                        </div>
                        <div className="ml-4 flex flex-col justify-between flex-1">
                          <div className="flex justify-between text-sm font-medium text-gray-900">
                            <h3>{item.nom}</h3>
                            <p>{item.price} XOF</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Quantitée: {item.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span>{totalAmount.toFixed(2)} XOF</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={User?.image || ""} alt={User?.name || ""} />
                  <AvatarFallback>
                    {User?.name
                      ? User.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                      : ""}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{User.name}</p>
                  <p className="text-sm text-gray-500">{User.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* <OrderTimeline
          timeline={order.timeline}
          activeStep={activeTimelineItem}
        /> */}
      </div>
    </div>
  );
}
