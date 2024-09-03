"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { article_accepte } from "@/actions/accepte_article";

type Agent = {
  id: string;
  email: string;
  name?: string;
};

const FormSchema = z.object({
  agentId: z.string({
    required_error: "Please select an agent.",
  }),
});

const SelectAgent = ({ article }: { article: string }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    fetch("/api/agents")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch agents");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched agents:", data);
        setAgents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
        setError("Failed to fetch agents");
        setLoading(false);
      });
  }, []);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await article_accepte(article, data.agentId);
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="agentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.isArray(agents) &&
                    agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.email}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Vous pouvez consulter les agents dans la section{" "}
                <Link href="/examples/forms">agent settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Attribuer à et Accepter</Button>
      </form>
    </Form>
  );
};

export default SelectAgent;
