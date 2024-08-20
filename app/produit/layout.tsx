import Header from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";

// export const metadata: Metadata = {
//   title: "Forms",
//   description: "Advanced form example using react-hook-form and Zod.",
// }

const sidebarNavItems = [
  {
    title: "Mettre un produit en vente",
    href: "/produit",
  },
  {
    title: "Mes produits en vente",
    href: "/produit/vosproduits",
  },
  {
    title: "Mes produits vendus",
    href: "/produit/",
  },
  {
    title: "Mes achats",
    href: "/produit/mesAchats",
  },
  {
    title: "Mon profil",
    href: "/produit/profil",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="w-[1100px] mx-auto flex flex-col gap-4">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5 ">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
    </>
  );
}
