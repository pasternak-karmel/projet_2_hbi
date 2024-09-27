"use client";

import { useState, useEffect, useRef } from "react";
import { animateScroll } from "react-scroll";
import DOMPurify from "dompurify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";

import LoaderState from "@/components/Loader";
import { useCurrentUserId } from "@/hooks/use-current-user";
import { ToastRessuable } from "@/function/notification-toast";

export default function MessageInterface() {
  const searchParams = useSearchParams();
  const produit = searchParams.get("id");
  const userId = useCurrentUserId();

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const queryClient = useQueryClient();
  const messageEndRef = useRef<HTMLDivElement>(null);

  const {
    isLoading,
    error,
    data: messages,
    refetch,
  } = useQuery({
    queryKey: ["vosMessages", produit],
    queryFn: () => fetch(`/api/messages/${produit}`).then((res) => res.json()),
    refetchInterval: 1000,
    retry: 2,
  });
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
        queryKey: ["vosMessages"],
        exact: true,
        refetchType: "active",
      });
      setNewMessage("");
      refetch();
    },

    onError: (error) => {
      ToastRessuable({
        titre: "Failed to send message",
        description: error.message,
      });
    },
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      sendMessageMutation.mutate(newMessage);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [newMessage]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // useEffect(() => {
  //   animateScroll.scrollToBottom({
  //     containerId: "messageContainer",
  //     duration: 300,
  //   });
  // }, [messages]);

  useEffect(() => {
    if (
      messages?.some((msg: any) => !msg.isRead && msg.receiverId === userId)
    ) {
      fetch(`/api/messages/${produit}/mark-read`, { method: "PATCH" });
    }
  }, [messages, userId]);

  if (isLoading) return <LoaderState />;
  if (error)
    return (
      <div className="text-red-500">
        Erreur de chargement des messages. Veuillez réessayer plus tard.
      </div>
    );

  return (
    //     <div
    //       className={`${
    //         darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
    //       } min-h-screen p-4 flex flex-col`}
    //     >
    //       <div className="container mx-auto flex-grow">
    //         <div
    //           className={`bg-white ${
    //             darkMode ? "bg-gray-800" : "bg-white"
    //           } shadow-lg rounded-lg p-6 flex flex-col`}
    //         >
    //           <h1 className="text-3xl font-semibold text-teal-600 mb-4">
    //             Discussion
    //           </h1>

    //           <div className="mb-4 flex justify-end">
    //             <label className="inline-flex items-center">
    //               <input
    //                 type="checkbox"
    //                 className="form-checkbox"
    //                 checked={darkMode}
    //                 onChange={() => setDarkMode(!darkMode)}
    //               />
    //               <span className="ml-2">Dark Mode</span>
    //             </label>
    //           </div>

    //           <div
    //             className={`h-96 overflow-y-scroll border ${
    //               darkMode ? "border-gray-700" : "border-gray-200"
    //             } p-4 rounded-lg flex flex-col`}
    //           >
    //             {messages.length === 0 ? (
    //               <p className="text-center text-gray-500">
    //                 Écrivez le premier message
    //               </p>
    //             ) : (
    //               messages.map((message: any) => (
    //                 <div
    //                   key={message.id}
    //                   className={`mb-4 p-4 max-w-xs rounded-lg ${
    //                     message.senderId === userId
    //                       ? `self-end ${
    //                           darkMode
    //                             ? "bg-blue-500 text-white"
    //                             : "bg-blue-500 text-white"
    //                         }`
    //                       : `self-start ${
    //                           darkMode
    //                             ? "bg-gray-700 text-gray-200"
    //                             : "bg-gray-200 text-gray-800"
    //                         }`
    //                   }`}
    //                 >
    //                   <p>{message.content}</p>
    //                   <div className="flex justify-between items-center text-xs mt-2">
    //                     <span>{format(new Date(message.sentAt), "HH:mm")}</span>
    //                     {message.isRead && message.senderId === userId ? (
    //                       <span className="text-green-500">lu</span>
    //                     ) : null}
    //                   </div>
    //                 </div>
    //               ))
    //             )}

    //             <div ref={messageEndRef} />
    //           </div>

    //           {isTyping && (
    //             <div className="mt-2 text-sm text-gray-500">écrire...</div>
    //           )}

    //           <div className="mt-4 flex">
    //             <input
    //               aria-label="Message input"
    //               type="text"
    //               className={`flex-1 border ${
    //                 darkMode ? "border-gray-600" : "border-gray-300"
    //               } rounded-l-lg p-3`}
    //               placeholder="Écrivez votre message..."
    //               value={newMessage}
    //               onChange={handleTyping}
    //             />
    //             <button
    //               aria-label="Send message"
    //               className="bg-teal-500 text-white px-6 py-3 rounded-r-lg hover:bg-teal-700 transition"
    //               onClick={handleSendMessage}
    //             >
    //               Envoyer
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }

    <div
      className={`${
        darkMode ? "bg-gray-900" : "bg-white"
      } min-h-screen flex flex-col`}
    >
      <div className="container mx-auto flex-grow">
        <div className="flex flex-col p-4 h-full">
          <div className="flex items-center justify-between p-3 bg-gray-100 shadow-md">
            <h1 className="text-lg font-bold text-teal-600">Discussion</h1>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="ml-2">Dark Mode</span>
            </label>
          </div>

          <div
            className="flex-grow overflow-y-auto p-3"
            style={{
              backgroundImage: `url('/path-to-your-background-image.jpg')`,
            }}
          >
            {messages.length === 0 ? (
              <p className="text-center text-gray-500">
                Écrivez le premier message
              </p>
            ) : (
              messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`mb-4 p-3 rounded-lg max-w-xs ${
                    message.senderId === userId
                      ? "self-end bg-blue-500 text-white"
                      : "self-start bg-gray-200 text-black"
                  }`}
                >
                  <p>{message.content}</p>
                  <div className="text-xs mt-1 text-right">
                    {format(new Date(message.sentAt), "HH:mm")}
                  </div>
                </div>
              ))
            )}
            <div ref={messageEndRef} />
          </div>

          {isTyping && (
            <div className="p-2 text-sm text-gray-500">
              L'utilisateur est en train d'écrire...
            </div>
          )}

          <div className="p-3 flex items-center">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-l-full px-4 py-2"
              placeholder="Écrivez un message..."
              value={newMessage}
              onChange={handleTyping}
            />
            <button
              className="bg-teal-500 text-white rounded-r-full px-4 py-2 hover:bg-teal-700 transition"
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
