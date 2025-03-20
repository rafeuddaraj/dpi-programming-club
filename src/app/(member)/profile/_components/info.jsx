import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import FeedbackPreview from "@/components/common/feedback-preview";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";

export default function Info({ user }) {
    return (
        <>
            <TabsContent value="info">
                <Card>
                    <CardHeader>
                        <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <FeedbackPreview markdownText={user?.about} />
                        <CardHeader className="m-0 pl-0">
                            <CardTitle>Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="m-0 pl-0">
                            <div className="flex flex-wrap gap-2">
                                {user?.skills?.map((skill) => (
                                    <Badge
                                        key={skill}
                                        variant="secondary"
                                        className="text-sm py-1 cursor-pointer"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>

                        </CardContent>
                    </CardContent>

                </Card>
            </TabsContent>
        </>
    );
}