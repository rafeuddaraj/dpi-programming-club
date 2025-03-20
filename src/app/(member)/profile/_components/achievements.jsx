
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { EmptyState } from "@/components/common/empty-states";
import ParticipantBadge from "@/components/common/participant-badge";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import Link from "next/link";

export default function Achievements({ event = [], workshop = [], achievement = [], user, session }) {
    return (
        <>
            <TabsContent value="achievements" className="space-y-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {achievement?.length ? achievement?.map((ave, index) => (

                                <>{ave?.complete && <div key={index} className="flex items-center gap-2">
                                    <Link href={`/events/${ave?.eventId}/participant/${ave?.participantId}`}>
                                        <ParticipantBadge name={ave?.event?.name} marks={ave?.score} />
                                    </Link>
                                    {ave?.certificate && <Link href={`${ave?.certificate}`}>
                                        <Badge>Certificate</Badge>
                                    </Link>}
                                </div>}</>

                            )) : <EmptyState actionHref={"/events"} actionLabel={"Get started"} userProfile={user} session={session} />}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Events Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {event?.length ? event?.map((evnt, index) => (

                                <>{evnt?.complete && <div key={index} className="flex items-center gap-2">
                                    <Link href={`/events/${evnt?.eventId}/participant/${evnt?.participantId}`}>
                                        <ParticipantBadge name={evnt?.event?.name} marks={evnt?.score} />
                                    </Link>
                                    {evnt?.certificate && <Link href={`${evnt?.certificate}`}>
                                        <Badge>Certificate</Badge>
                                    </Link>}
                                </div>}</>

                            )) : <EmptyState actionHref={"/events"} actionLabel={"Get started"} userProfile={user} session={session} />}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Workshops Activities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {workshop?.length ? workshop?.map((wks, index) => (

                                <>{wks?.complete && <div key={index} className="flex items-center gap-2">
                                    <Link href={`/workshops/${wks?.workshopId}/participant/${wks?.participantId}`}>
                                        <ParticipantBadge name={wks?.workshop?.name} marks={wks?.marks} />
                                    </Link>
                                    {wks?.certificate && <Link href={`${wks?.certificate}`}>
                                        <Badge>Certificate</Badge>
                                    </Link>}
                                </div>}</>

                            )) : <EmptyState actionHref={"/workshops"} actionLabel={"Get started"} userProfile={user} session={session} />}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </>
    );
}