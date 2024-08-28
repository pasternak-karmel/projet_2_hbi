"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CardWrapperMessageries } from "./card-wrapper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const MessageriesForm = ({ produit }: { produit: string }) => {
  const [message, setMessage] = useState("");

  const {
    isLoading,
    error,
    data: messages,
    refetch,
  } = useQuery({
    queryKey: ["vosMessages", produit],
    queryFn: () => fetch(`/api/messages/${produit}`).then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: async (newMessage: string) => {
      const response = await fetch(`/api/messages/${produit}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      setMessage("");
      refetch();
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-gray-500" />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        Error: {error.message}
      </div>
    );

  const onSubmit = () => {
    if (message.trim()) {
      mutation.mutate(message);
    }
  };

  return (
    <CardWrapperMessageries
      headerLabel="Discussion avec un agent"
      backButtonLabel="Retour"
      backButtonHref="/agent"
    >
      <ScrollArea className="h-[700px] border-none w-[400px] rounded-md border p-4">
        <div className="space-y-2">
          {messages?.map((msg: any) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === produit ? "justify-start" : "justify-end"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.senderId === produit
                    ? "bg-gray-300 text-black"
                    : "bg-blue-500 text-white"
                }`}
              >
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez un message..."
            className="flex-1"
          />
          <Button
            onClick={onSubmit}
            className="ml-2"
            disabled={mutation.isPending || !message.trim()}
          >
            {mutation.isPending ? "Envoi..." : "Envoyer"}
          </Button>
        </div>
      </ScrollArea>
    </CardWrapperMessageries>
  );
};
