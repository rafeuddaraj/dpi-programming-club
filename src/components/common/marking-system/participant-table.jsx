import { auth } from "@/app/auth";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Mail, User } from "lucide-react";
import Action from "./action";
import { ParticipantScoreDisplay } from "./participant-score-display";
import PaymentSwitcher from "./payment-switcher";

export async function ParticipantTable({ participants = [], componentType }) {
  const isPayment = participants[0]?.paymentId ? true : false;

  const session = (await auth()) || {};
  const user = session?.user || {};
  const isAdmin = user?.role === "admin";

  console.log(participants);

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>Participant</TableHead>
              <TableHead className="hidden md:table-cell">
                Joining Date
              </TableHead>
              {isAdmin && <TableHead>Examiner</TableHead>}
              {isPayment && (
                <TableHead className="hidden sm:table-cell">Price</TableHead>
              )}
              {isPayment && <TableHead>TRX</TableHead>}
              <TableHead className="hidden lg:table-cell">Score</TableHead>
              <TableHead>Status</TableHead>
              {isPayment && <TableHead>Payment</TableHead>}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-8 text-muted-foreground"
                >
                  No participants found
                </TableCell>
              </TableRow>
            ) : (
              participants.map((participant, index) => (
                <TableRow key={participant.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <div className="font-medium">
                          {participant?.participant?.user?.name}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Mail className="mr-1 h-3 w-3" />
                          {participant?.participant?.user?.email}
                        </div>
                        <div className="flex items-center text-xs">
                          <User className="mr-1 h-3 w-3" />
                          <Badge
                            variant="outline"
                            className="px-1 py-0 text-[10px]"
                          >
                            {participant?.participant?.user?.rollNo}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(participant.joining || new Date(), {
                      time: true,
                    })}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {participant?.examinerId ? (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <div className="font-medium">
                              {participant?.examiner?.user?.name}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Mail className="mr-1 h-3 w-3" />
                              {participant?.examiner?.user?.email}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>N/A</div>
                    )}
                  </TableCell>
                  {participant?.price && (
                    <TableCell className="hidden sm:table-cell">
                      ৳{participant?.price}
                    </TableCell>
                  )}
                  {participant?.payment?.transactionId && (
                    <TableCell>{participant?.payment?.transactionId}</TableCell>
                  )}
                  <TableCell className="hidden lg:table-cell">
                    <ParticipantScoreDisplay score={participant?.score} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={participant?.complete ? "success" : "outline"}
                    >
                      {participant?.complete === true
                        ? "Complete"
                        : participant?.complete === false
                        ? "Incomplete"
                        : "Pending..."}
                    </Badge>
                  </TableCell>
                  {isPayment && (
                    <TableCell>
                      {<PaymentSwitcher participant={participant} />}
                    </TableCell>
                  )}
                  <TableCell>
                    {
                      <Action
                        participant={participant}
                        componentType={componentType}
                      />
                    }
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
