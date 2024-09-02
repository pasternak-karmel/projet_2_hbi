// "use client";

// import { ScrollArea } from "@/components/ui/scroll-area";
// import { CardWrapperMessageries } from "./card-wrapper";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { Loader } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import axios from "axios";

// interface Message {
//   id: string;
//   content: string;
//   senderId: string;
//   receiverId: string;
//   sentAt: string;
// }

// interface FetchMessagesResponse {
//   messages: Message[];
// }

// interface SendMessagePayload {
//   articleId: string;
//   content: string;
//   senderId: string;
// }

// const fetchMessages = async (articleId: string): Promise<Message[]> => {
//   const { data } = await axios.get<FetchMessagesResponse>(
//     `/api/messages/${articleId}`
//   );
//   return data.messages;
// };

// const sendMessage = async (
//   newMessage: SendMessagePayload
// ): Promise<Message> => {
//   const { data } = await axios.post<Message>(`/api/messages`, newMessage);
//   return data;
// };

// export const MessageriesForm = ({ produit }: { produit: string }) => {
//   const queryClient = useQueryClient();
//   const [message, setMessage] = useState<string>("");
//   const {
//     isLoading,
//     error,
//     data: messages,
//     refetch,
//   } = useQuery({
//     queryKey: ["vosMessages", produit],
//     queryFn: () => fetch(`/api/messages/${produit}`).then((res) => res.json()),
//     refetchInterval: 5000,
//   });

//   const mutation = useMutation({
//     mutationFn: async (newMessage: string) => {
//       const response = await fetch(`/api/messages/${produit}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ content: newMessage, articleId: produit }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }

//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["vosMessages"],
//         exact: true,
//         refetchType: "active",
//       });
//       setMessage("");
//       refetch();
//     },
//   });

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader className="animate-spin text-gray-500" />
//       </div>
//     );
//   if (error)
//     return (
//       <div className="text-red-500 text-center mt-10">
//         Error: {error.message}
//       </div>
//     );

//   const onSubmit = () => {
//     if (message.trim()) {
//       mutation.mutate(message);
//     }
//   };

//   return (
//     <CardWrapperMessageries
//       headerLabel="Discussion avec un agent"
//       backButtonLabel="Retour"
//       backButtonHref="/agent"
//     >
//       <ScrollArea className="h-[700px] border-none w-[400px] rounded-md border p-4">
//         <div className="space-y-2">
//           {messages?.length === 0 && <div>No messages yet.</div>}
//           {messages?.map((msg: any) => (
//             <div key={msg.id}>
//               <p>{msg.content}</p>
//               <small>{new Date(msg.sentAt).toLocaleString()}</small>
//             </div>
//           ))}
//         </div>
//         <div className="flex mt-4">
//           <Input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Écrivez un message..."
//             className="flex-1"
//           />
//           <Button
//             onClick={onSubmit}
//             className="ml-2"
//             disabled={mutation.isPending || !message.trim()}
//           >
//             {mutation.isPending ? "Envoi..." : "Envoyer"}
//           </Button>
//         </div>
//       </ScrollArea>
//     </CardWrapperMessageries>
//   );
// };

"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CardWrapperMessageries } from "./card-wrapper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";

interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  sentAt: string;
}

export const MessageriesForm = ({ produit }: { produit: string }) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState<string>("");

  const {
    isLoading,
    error,
    data: messages,
    refetch,
  } = useQuery({
    queryKey: ["vosMessages", produit],
    queryFn: () => fetch(`/api/messages/${produit}`).then((res) => res.json()),
    refetchInterval: 100,
  });

  const mutation = useMutation({
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
      setMessage("");
      refetch();
    },
  });

  const debounced = useDebouncedCallback((value) => {
    setMessage(value);
  }, 1000);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      mutation.mutate(message);
    }
  };

  return (
    <CardWrapperMessageries headerLabel="Discussion avec un agent">
      <div className="space-y-2 overflow-y-auto">
        <ScrollArea className="h-[400px] w-[400px] p-4 space-y-4">
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <Loader className="animate-spin text-gray-500" />
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center mt-10">
              Error: {error instanceof Error ? error.message : "Unknown error"}
            </div>
          )}
          {!isLoading && messages?.length === 0 && <div>No messages yet.</div>}
          {messages?.map((msg: Message) => (
            <div
              key={msg.id}
              className={`p-2 rounded-md ${
                msg.senderId === produit ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <p>{msg.content}</p>
              <small className="text-xs text-gray-500">
                {new Date(msg.sentAt).toLocaleString()}
              </small>
            </div>
          ))}
        </ScrollArea>
      </div>
      <form onSubmit={onSubmit} className="flex items-center">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez un message..."
          className="flex-1"
        />
        <Button
          type="submit"
          className="ml-2 flex items-center"
          disabled={mutation.isPending || !message.trim()}
        >
          {mutation.isPending ? "Envoi..." : <Send className="w-5 h-5" />}
        </Button>
      </form>
    </CardWrapperMessageries>
  );
};
