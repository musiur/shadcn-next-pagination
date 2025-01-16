import { columns } from "@/components/data-table/columns";
import { GetPaymentData } from "@/components/data-table/data";
import { DataTable } from "@/components/data-table/table";
import TableSearch from "@/components/data-table/table-search";
import { TGetPaymentData } from "@/components/data-table/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string; search: string }>;
}) => {
  const sParams = await searchParams;
  const page = sParams.page || "1";
  const limit = sParams.limit || "10";
  const searchText = sParams.search || "";

  const data: TGetPaymentData = await GetPaymentData({
    page,
    limit,
    searchText,
  });

  return (
    <div className="container mx-auto py-10 space-y-10">
      <h1 className="text-2xl font-bold text-center">Shadcn Next Pagination</h1>
      <TableSearch />
      <DataTable columns={columns} data={data.list} />
      <TablePagination page={page} limit={limit} total={data.meta.total} />
    </div>
  );
};

export default HomePage;

const TablePagination = ({
  page,
  limit,
  total,
}: {
  page: string;
  limit: string;
  total: number;
}) => {
  return (
    <div className="max-w-sm mx-auto py-10 flex justify-between items-center">
      <Link href={`/?page=${parseInt(page) - 1}&limit=${limit}`}>
        <Button variant="outline">Previous</Button>
      </Link>
      <div className="text-center">
        {page}/{Math.ceil(total / parseInt(limit))}
      </div>
      <Link href={`/?page=${parseInt(page) + 1}&limit=${limit}`}>
        <Button variant="outline">Next</Button>
      </Link>
    </div>
  );
};
