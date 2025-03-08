import ComingSoon from "@/components/common/coming-soon";
import { COMING_SOON } from "@/lib/utils";

export default function layout({ children }) {
  return <>{COMING_SOON ? <ComingSoon title="Project" /> : { children }}</>;
}
