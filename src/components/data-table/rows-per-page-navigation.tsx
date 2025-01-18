"use client";

import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RowsPerPageNavigation = ({ limit }: { limit: string }) => {
  const router = useRouter();

  const updateRowsPerPage = (value: string) => {
    const url = new URL(window.location.href);
    const params = Object.fromEntries(url.searchParams.entries());
    let newParams = { ...params, limit: value };
    router.push(`/?${new URLSearchParams(newParams).toString()}`);
  };
  return (
    <div className="inline-flex items-center gap-2">
      <span>Rows per page</span>
      <Select
        value={limit.toString()}
        onValueChange={(value) => value && updateRowsPerPage(value)}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Rows per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Rows per page</SelectLabel>
            {Array.from({ length: 5 }, (_, index) => (
              <SelectItem key={index} value={((index + 1) * 10).toString()}>
                {(index + 1) * 10}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RowsPerPageNavigation;
