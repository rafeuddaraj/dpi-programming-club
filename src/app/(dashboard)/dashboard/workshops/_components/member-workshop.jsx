import ComingSoon from "@/components/common/coming-soon";
import { COMING_SOON } from "@/lib/utils";

export default function MemberWorkshop() {
  return <>{COMING_SOON && <ComingSoon title="Member Workshop" />}</>;
}
