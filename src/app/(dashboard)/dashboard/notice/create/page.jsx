import NoticeForm from "@/components/notice/notice-form";

export default function CreateNoticePage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">Create New Notice</h1>
            <NoticeForm />
        </div>
    )
}

