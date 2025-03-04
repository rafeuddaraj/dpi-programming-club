import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


export default function CommonAlert({ title, description }) {
    return (
        <>
            <Alert variant="destructive" className="w-full">
                <AlertTriangle className="h-5 w-5" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {description}
                </AlertDescription>
            </Alert>
        </>
    );
}