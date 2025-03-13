import { usePathname, useRouter } from "next/navigation";

export default function useRedirect(newSearchParams) {
  const router = useRouter();
  const pathname = usePathname();

  return () => {
    return router.replace(`${pathname}?${newSearchParams?.toString()}`);
  };
}
