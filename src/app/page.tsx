import { columns } from "@/components/data-table/columns";
import { GetPaymentData } from "@/components/data-table/data";
import { DataTable } from "@/components/data-table/table";
import TableFilters from "@/components/data-table/table-filters";
import TablePagination from "@/components/data-table/table-pagination";
import TableSearch from "@/components/data-table/table-search";
import { TGetPaymentData } from "@/components/data-table/types";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; limit: string; search: string }>;
}) => {
  const sParams = await searchParams;
  const { page = "1", limit = "10"} = sParams;


  const data: TGetPaymentData = await GetPaymentData({
    ...sParams,
    page,
    limit,
  });

  return (
    <div className="container mx-auto py-10 space-y-10">
      <h1 className="text-2xl font-bold text-center">Shadcn Next Pagination</h1>
      <div className="flex items-center justify-between gap-10">
        <TableSearch />
        <TableFilters />
      </div>
      <DataTable columns={columns} data={data.list} />
      {data.meta.total > 1 ? (
        <TablePagination page={page} limit={limit} total={data.meta.total} />
      ) : null}
    </div>
  );
};

export default HomePage;


