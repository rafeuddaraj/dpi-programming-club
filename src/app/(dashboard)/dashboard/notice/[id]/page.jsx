import { getNoticeById } from "@/app/actions/notices"
import NoticeForm from "@/components/notice/notice-form"
import { notFound } from "next/navigation"

export default async function EditNoticePage({ params }) {
    const resp = await getNoticeById(await (params).id)
    if (resp?.error) {
        throw new Error(resp.error)
    }
    const notice = resp.data

    if (!notice) {
        notFound()
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Edit Notice</h1>
            <NoticeForm notice={notice} />
        </div>
    )
}

