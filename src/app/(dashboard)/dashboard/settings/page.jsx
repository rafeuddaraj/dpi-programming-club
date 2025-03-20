import { getSettings } from "@/app/actions/settings";
import SettingsForm from "@/components/admin/settings-form";
import { format } from "date-fns";
import { Clock } from "lucide-react";


export default async function page() {
    const resp = await getSettings()
    if (resp?.error) {
        throw Error()
    }
    const settings = resp?.data
    return (
        <>
            <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="mb-6 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                        <p className="text-muted-foreground">Manage system-wide settings and configurations</p>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        Last updated: {format(settings?.updatedAt, "PPpp")}
                    </div>

                </div>
                <SettingsForm settingsData={settings} />
            </div>
        </>
    );
}