// import { wixClientServer } from "@/lib/wixClientServer";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  // const { data: session } = useSession();

  // const wixClient = await wixClientServer();

  let order;
  try {
    // order = await wixClient.orders.getOrder(id);
  } catch (err) {
    return notFound();
  }

  return (
    <div className="flex flex-col pt-5 items-center justify-center ">
      <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-40 py-20">
        <h1 className="text-xl">Order Details</h1>
        <div className="mt-12 flex flex-col gap-6">
          <div className="">
            <span className="font-medium">Order Id: </span>
            <span>{id}</span>
          </div>
          <div className="">
            <span className="font-medium">Receiver Name: </span>
            <span>Contact Détails</span>
          </div>
          <div className="">
            <span className="font-medium">Receiver Email: </span>
            {/* <span>{session?.user?.email}</span> */}
            <span>karmelavenon@gmail.com</span>
          </div>
          <div className="">
            <span className="font-medium">Price: </span>
            <span>15000 XOF</span>
          </div>
          <div className="">
            <span className="font-medium">Payment Status: </span>
            <span>Payé</span>
          </div>
          <div className="">
            <span className="font-medium">Order Status: </span>
            <span>En cours de traitement</span>
          </div>
          <div className="">
            <span className="font-medium">Delivery Address: </span>
            <span>Cotonou C/54120 chez moi</span>
          </div>
        </div>
      </div>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
      <Link href="/" className="underline mt-6">
        Go back to home
      </Link>
    </div>
  );
};

export default OrderPage;
