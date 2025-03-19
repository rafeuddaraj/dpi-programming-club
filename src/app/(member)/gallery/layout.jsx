import ComingSoon from "@/components/common/coming-soon";
import { COMING_SOON } from "@/lib/utils";


export default function layout({ children }) {
    if (COMING_SOON) {
        return <ComingSoon title="Gallery" />
    }
    return (
        <>
            {children}
        </>
    );
}