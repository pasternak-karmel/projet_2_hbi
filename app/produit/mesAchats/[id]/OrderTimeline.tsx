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

export const OrderTimeline = ({
  timeline,
  activeStep,
}: {
  timeline: any[];
  activeStep: number;
}) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {timeline.map((item, index) => (
            <li key={index} className="mb-10 ml-6">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white ${
                  index <= activeStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-100"
                }`}
              >
                <item.icon className="w-4 h-4" />
              </span>
              <h3
                className={`flex items-center mb-1 text-lg font-semibold ${
                  index <= activeStep ? "text-primary" : "text-gray-500"
                }`}
              >
                {item.status}
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {item.date}
              </time>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};
