"use client";
import { useSearchParams } from "next/navigation";
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

const ExactPageNavigation = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // a function that will update the page number in the url but not remove any other query params

  const updatePage = (value: string) => {
    const url = new URL(window.location.href);
    const params = Object.fromEntries(url.searchParams.entries());
    let newParams = { ...params, page: value };
    router.push(`/?${new URLSearchParams(newParams).toString()}`);
  };
  return (
    <div className="flex items-center gap-2">
      <Select
        value={page.toString()}
        onValueChange={(value) => value && updatePage(value)}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Select a page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Pages</SelectLabel>
            {Array.from({ length: totalPages }, (_, index) => (
              <SelectItem key={index} value={(index + 1).toString()}>
                {index + 1}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
          <span>of</span>
          <span>{totalPages}</span>
          <span>Pages</span>
    </div>
  );
};

export default ExactPageNavigation;
