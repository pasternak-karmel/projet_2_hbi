import React from "react";
import { IconType } from "react-icons";
import {
  FiDollarSign,
  FiHome,
  FiLink,
  FiPaperclip,
  FiUsers,
} from "react-icons/fi";
import { TbSettingsFilled, TbTruckDelivery } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

export const RouteSelect = () => {
  const pathname = usePathname();

  const routes = [
    { Icon: FiHome, title: "Dashboard", path: "/admin" },
    { Icon: FiUsers, title: "Attente", path: "/attente" },
    { Icon: FiPaperclip, title: "Invoices", path: "/invoices" },
    { Icon: FiLink, title: "Integrations", path: "/integrations" },
    { Icon: FiDollarSign, title: "Finance", path: "/finance" },
    { Icon: TbTruckDelivery, title: "Livreurs", path: "/livreur" },
    {
      Icon: IoNotificationsOutline,
      title: "Notification",
      path: "/notification",
    },
    { Icon: TbSettingsFilled, title: "Settings", path: "/settings" },
  ];

  return (
    <div className="space-y-1">
      {routes.map((route) => (
        <Route
          key={route.path}
          Icon={route.Icon}
          selected={pathname === route.path}
          title={route.title}
          path={route.path}
        />
      ))}
    </div>
  );
};

const Route = ({
  selected,
  Icon,
  title,
  path,
}: {
  selected: boolean;
  Icon: IconType;
  title: string;
  path: string;
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push(path);
  };

  return (
    <button
      onClick={handleNavigation}
      className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? "bg-white text-stone-950 shadow"
          : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"
      }`}
    >
      <Icon className={selected ? "text-violet-500" : ""} />
      <span>{title}</span>
    </button>
  );
};
