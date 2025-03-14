import { getAllUpcomingWorkshop } from "@/app/actions/workshops";
import { WorkshopList } from "./_components/workshop-list";


export default async function page() {
    const resp = await getAllUpcomingWorkshop()
    if (resp?.error) {
        throw Error()
    }
    const workshops = resp?.data

    return (
        <>
            <div className="py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Upcoming Workshops</h1>
                </div>
                <WorkshopList workshops={workshops} />
            </div>

        </>
    );
}