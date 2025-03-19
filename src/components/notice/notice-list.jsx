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



    if (notices.length === 0) {
        return (
            <div className="text-center py-12 border rounded-lg bg-muted/50">
                <h3 className="text-xl font-medium mb-2">No notices available</h3>
                <p className="text-muted-foreground">Create a new notice to get started.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <NoticeTable notices={notices} pagination={pagination} />
        </div>
    )
}

