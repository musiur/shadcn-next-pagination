"use client";

import Link from "next/link";
import ExactPageNavigation from "./exact-page-navigation";
import RowsPerPageNavigation from "./rows-per-page-navigation";
import { Button } from "../ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const TablePagination = ({
  page,
  limit,
  total,
}: {
  page: string;
  limit: string;
  total: number;
}) => {
  const router = useRouter();
  const currentPage = parseInt(page);
  const totalPages = Math.ceil(total / parseInt(limit));

  const handlePageChange = (type: "next" | "previous" | "first" | "last") => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;

    const newPage =
      type === "next"
        ? nextPage
        : type === "previous"
        ? previousPage
        : type === "first"
        ? 1
        : totalPages;

    const url = new URL(window.location.href);
    const params = Object.fromEntries(url.searchParams.entries());
    let newParams = { ...params, page: newPage.toString() };

    router.push(`/?${new URLSearchParams(newParams).toString()}`);
  };

  return (
    <div className="py-10 flex justify-between items-center gap-16">
      <RowsPerPageNavigation limit={limit} />
      <ExactPageNavigation page={currentPage} totalPages={totalPages} />

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange("first")}
          disabled={currentPage <= 1}
        >
          <ChevronsLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange("previous")}
          disabled={currentPage <= 1}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange("next")}
          disabled={currentPage >= totalPages}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePageChange("last")}
          disabled={currentPage >= totalPages}
        >
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
