"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useFilter = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const onUpdate = (query, value) => {
    if (query) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return { onUpdate, searchParams: params };
};
