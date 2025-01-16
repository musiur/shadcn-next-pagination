/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { useState } from "react";

const TableSearch = () => {
  const router = useRouter();
  const queries = useSearchParams();
  const [disabled, setDisabled] = useState(false);
  const page = queries.get("page") || "1";
    const limit = queries.get("limit") || "10";

  const debounce = (func: (...args: any[]) => void, delay: number): (...args: any[]) => void => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((search: string) => {
    setDisabled(true);
    router.push(`/?page=${page}&limit=${limit}&search=${search}`);
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <Input
      name="search"
      placeholder="Search"
      onChange={handleChange}
      disabled={disabled}
      readOnly={disabled}
    />
  );
};

export default TableSearch;
