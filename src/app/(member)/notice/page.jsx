import NoticePage from "@/app/(dashboard)/dashboard/notice/page";


export const metadata = {
    title: 'CST Club DPI - Notice Board',
    description: 'Official notice board of CST Club DPI where members can view important notices and updates.',
    keywords: 'CST Club, DPI, notice board, updates, announcements',
    author: 'CST Club DPI',
    robots: 'index, follow',
    openGraph: {
        title: 'CST Club DPI - Notice Board',
        description: 'Official notice board of CST Club DPI where members can view important notices and updates.',
        url: process?.env?.SITE_URL,
        site_name: 'CST Club DPI',
    },
};


export default function page({ searchParams }) {
    return (
        <>
            <NoticePage searchParams={searchParams} />
        </>
    );
}