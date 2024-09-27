"use client";
import { AdminGetProduct } from "@/actions/admin-get-product";
import Produit from "@/components/article/produit";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import * as React from "react";
import { startOfWeek, endOfWeek, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LoaderState from "@/components/Loader";

export default function ProductManagment() {
  const queryClient = useQueryClient();

  const fetchProducts = async ({ queryKey }: any) => {
    const [_key, { startDate, endDate }] = queryKey;
    return AdminGetProduct(startDate, endDate);
  };
  const today = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfWeek(today, { weekStartsOn: 1 }),
    to: endOfWeek(today, { weekStartsOn: 1 }),
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["OrderAdmin", { startDate: date?.from, endDate: date?.to }],
    queryFn: fetchProducts,
  });

  React.useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["OrderAdmin"],
      exact: true,
      refetchType: "active",
    });
  }, [date, queryClient]);

  if (isLoading) return <LoaderState />;

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Une erreur est survenue lors de la récupération des produits:{" "}
        {error?.message}
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-12">
      <div className={cn("grid gap-2")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-16 justify-center">
        {Array.isArray(data) &&
          data.map((product: any) => (
            <Produit key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
