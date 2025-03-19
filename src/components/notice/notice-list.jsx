import { fetchNotices } from "@/app/actions/notices"
import NoticeTable from "./notice-table"

export default async function NoticeList({ page, query }) {

    const resp = await fetchNotices(query, page)

    if (resp?.error) {
        throw new Error(resp.error)
    }

    const data = resp.data?.data

    const pagination = data.pagination
    const notices = data.data

    return (
        <div className="space-y-6">
            <NoticeTable notices={notices} pagination={pagination} />
        </div>
    )
}

