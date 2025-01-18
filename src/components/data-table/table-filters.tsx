"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

const defaultSchema = [
  {
    column: "status",
    icon: <Filter />,
    defaultValue: "All",
    options: ["All", "Pending", "Cancelled", "Completed"],
  },
];

const TableFilters = ({
  blocks = defaultSchema,
}: {
  blocks?: typeof defaultSchema;
}) => {
  return (
    <div className="flex items-center gap-2">
      <span>Filters</span>
      {blocks.map((block) => (
        <FilterBlock key={block.column} block={block} />
      ))}
    </div>
  );
};

export default TableFilters;

const FilterBlock = ({ block }: { block: (typeof defaultSchema)[0] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterText = searchParams.get(block.column) || block.defaultValue;

  const updateRowsPerPage = (value: string) => {
    const url = new URL(window.location.href);
    const params = Object.fromEntries(url.searchParams.entries());
    let newURL = "";
    if (value === "All") {
      const { status, ...rest } = params;
      newURL = `/?${new URLSearchParams(rest).toString()}`;
    } else {
      let newParams = { ...params, [block.column]: value };
      const { search, ...rest } = newParams;
      newURL = `/?${new URLSearchParams(rest).toString()}`;
    }

    router.push(newURL);
  };
  return (
    <Select
      value={filterText}
      onValueChange={(value) => value && updateRowsPerPage(value)}
    >
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={block.column} className="capitalize" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="capitalize">{block.column}</SelectLabel>
          {block.options.map((option) => (
            <SelectItem key={option} value={option} className="capitalize">
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
