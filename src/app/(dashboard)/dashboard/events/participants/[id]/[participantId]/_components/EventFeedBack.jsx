"use client"

import { updateEventFeedBack } from "@/app/actions/events";
import Feedback from "@/components/common/feedback";


export default function EventFeedBack({ eventId, data, revalidatePath }) {
    const handleFeedBack = async (data) => {
        return await updateEventFeedBack(eventId, data, revalidatePath)
    }
    return (
        <>
            <Feedback
                data={data}
                title={"Update Participant Event Data"}
                description={"Modify the participant's details"}
                onFeedback={handleFeedBack}
            />
        </>
    );
}