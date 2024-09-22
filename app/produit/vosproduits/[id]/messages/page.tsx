"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import LoaderState from "@/components/Loader";
import { useCurrentUserId } from "@/hooks/use-current-user";
import debounce from "lodash.debounce";

export default function MessageInterface() {
  const searchParams = useSearchParams();
  const produit = searchParams.get("id");
  const userId = useCurrentUserId();

  const [newMessage, setNewMessage] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: messages,
    refetch,
  } = useQuery({
    queryKey: ["vosMessages", produit],
    queryFn: () => fetch(`/api/messages/${produit}`).then((res) => res.json()),
    refetchInterval: 5000,
  });

  const markMessagesAsReadMutation = useMutation({
    mutationFn: async () => {
      await fetch(`/api/messages/${produit}/mark-read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vosMessages", produit],
        exact: true,
        refetchType: "active",
      });
    },
  });

  useEffect(() => {
    if (messages?.some((msg: any) => !msg.isRead && msg.receiverId === userId)) {
      markMessagesAsReadMutation.mutate();
    }
  }, [messages, userId, markMessagesAsReadMutation]);

  const sendMessageMutation = useMutation({
    mutationFn: async (newMessage: string) => {
      const response = await fetch(`/api/messages/${produit}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newMessage, articleId: produit }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vosMessages", produit],
        exact: true,
        refetchType: "active",
      });
      setNewMessage("");
      refetch();
    },
  });

  const handleSendMessage = useCallback(
    debounce(() => {
      if (newMessage.trim()) {
        sendMessageMutation.mutate(newMessage);
      }
    }, 300),
    [newMessage, sendMessageMutation]
  );

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  if (isLoading) return <LoaderState />;

  if (error) return <div>Erreur de chargement des messages</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col justify-center">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-teal-600">Discussion</h1>

          <div className="h-96 overflow-y-auto border border-gray-200 p-4 rounded-lg bg-gray-50">
            {messages.length === 0 ? (
              <p className="text-center text-gray-500">
                Écrivez le premier message
              </p>
            ) : (
              messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`mb-4 p-3 rounded-lg max-w-xl 
                    ${
                      message.senderId === userId
                        ? "bg-blue-500 text-white self-end"
                        : message.isRead
                        ? "bg-gray-200 text-gray-800 self-start"
                        : "bg-yellow-100 text-gray-800 self-start"
                    }
                  `}
                >
                  <p>{message.content}</p>
                  <span className="block text-xs mt-2 text-gray-400">
                    {formatDistanceToNow(new Date(message.sentAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="Écrivez votre message..."
              value={newMessage}
              onChange={handleChangeMessage}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300"
              onClick={handleSendMessage}
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
