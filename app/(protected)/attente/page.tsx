import { currentRole } from "@/lib/auth";
import { DataTable } from "./data-table";
import { columns, Article } from "./columns";
import { db } from "@/lib/db";
import { AdminGetProduct } from "@/actions/admin-get-product";

async function getData(): Promise<Article[]> {
  const articleAttente = await db.article.findMany({
    select: {
      id: true,
      nom: true,
      description: true,
      prix: true,
      usage: true,
      image: true,
      categories: {
        select: {
          nom: true,
        },
      },
      quantite: true,
    },
    where: { status: "ATTENTE" },
  });

  return articleAttente;
}

export default async function Attente() {
  const role = await currentRole();

  if (role !== "ADMIN") {
    return null;
  }

  const data = await AdminGetProduct();

  if ("error" in data) {
    return <div>{data.error}</div>;
  }

  return (
    <div>
      <div className="mx-1">
        <div className="container mx-auto py-10">
          Les articles en attente d'être approuvés
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
