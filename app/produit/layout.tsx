import { SidebarNav } from "@/components/sidebar-nav";

const sidebarNavItems = [
  { title: "Mettre un produit en vente", href: "/produit" },
  { title: "Mes produits en vente", href: "/produit/vosproduits" },
  { title: "Mes produits vendus", href: "/produit/vendus" },
  { title: "Mes achats", href: "/produit/mesAchats" },
  { title: "Mon profil", href: "/produit/profil" },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="w-full lg:w-[1100px] mx-auto flex flex-col gap-4 px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row lg:space-x-12">
        <aside className="w-full lg:w-1/5 mb-6 lg:mb-0">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
