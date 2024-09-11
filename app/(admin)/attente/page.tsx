import { currentRole } from "@/lib/auth";
import { DataTable } from "./data-table";
import { Columns } from "./columns";
import { AdminGetProduct } from "@/actions/admin-get-product";

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
          Les articles en attente d&apos;être approuvés
          <DataTable columns={Columns} data={data} />
        </div>
      </div>
    </div>
  );
}
