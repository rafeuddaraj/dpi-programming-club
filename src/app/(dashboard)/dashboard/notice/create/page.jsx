import NoticeForm from "@/components/notice/notice-form";
import BackButton from "../../assignments/[id]/_components/back-button";

export default function CreateNoticePage() {
    return (
        <div className="container mx-auto py-8 px-4">
            <BackButton>
                Back
            </BackButton>
            <h1 className="text-3xl font-bold mb-8">Create New Notice</h1>
            <NoticeForm />
        </div>
    )
}

