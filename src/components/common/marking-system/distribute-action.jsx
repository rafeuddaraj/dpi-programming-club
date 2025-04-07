"use client";
import {
  distributeAllEventsByModerator,
  markAllEventParticipantsAsPaid,
  publishAllEventMarkedParticipants,
  removePendingDistributionsByModerator,
} from "@/app/actions/events";
import { Button } from "@/components/button";
import { Badge } from "@/components/ui/badge";
import {
  Banknote,
  CheckCheck,
  Loader2,
  SendHorizonal,
  Undo2,
} from "lucide-react";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const makeRequest = (componentType, callback) => {
  componentType = new String(componentType).toLowerCase();
  const callbackName = callback?.name;
  if (componentType === callbackName) {
    return callback;
  }
  return null;
};

export default function DistributeAction({ componentType, stats }) {
  const pathname = usePathname();
  const params = useParams();
  componentType = new String(componentType)?.toLowerCase();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(null);

  const { undistributedCount, distributedCount, markedCount, paymentCount } =
    stats || {};
  const handleDistribute = async (action) => {
    setIsLoading(action);
    try {
      // Decision to DistributeAction:
      let resp = null;
      async function event() {
        const eventId = params.id;
        return distributeAllEventsByModerator(eventId, pathname);
      }
      async function workshop() {
        const eventId = params.id;
        return await distributeAllEventsByModerator(eventId, pathname);
      }

      const processRequest =
        (await makeRequest(componentType, event)) ||
        makeRequest(componentType, workshop);

      if (typeof processRequest === "function") {
        resp = await processRequest();
      }

      if (!resp || resp?.error) throw Error();
      toast?.success(resp?.message);
    } catch {
      toast?.error("Distributing failed!");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDistributeRemove = async (action) => {
    setIsLoading(action);
    try {
      let resp = null;
      function event() {
        const eventId = params.id;
        return removePendingDistributionsByModerator(eventId, pathname);
      }
      function workshop() {
        const eventId = params.id;
        return removePendingDistributionsByModerator(eventId, pathname);
      }

      const processRequest =
        (await makeRequest(componentType, event)) ||
        makeRequest(componentType, workshop);

      if (typeof processRequest === "function") {
        resp = await processRequest();
      }
      if (!resp || resp?.error) throw Error();
      toast?.success(resp?.message);
    } catch {
      toast?.error("Distributing failed!");
    } finally {
      setIsLoading(null);
    }
  };

  const handlePublishedMarks = async (action) => {
    setIsLoading(action);
    try {
      let resp = null;
      async function event() {
        const eventId = params.id;
        return publishAllEventMarkedParticipants(eventId, pathname);
      }
      async function workshop() {
        const eventId = params.id;
        return await distributeAllEventsByModerator(eventId, pathname);
      }

      const processRequest =
        makeRequest(componentType, event) ||
        makeRequest(componentType, workshop);

      if (typeof processRequest === "function") {
        resp = await processRequest();
      }

      if (!resp || resp?.error) throw Error();
      toast?.success(resp?.message);
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(null);
    }
  };
  const handlePayment = async (action) => {
    setIsLoading(action);
    try {
      let resp = null;
      async function event() {
        const eventId = params.id;
        return markAllEventParticipantsAsPaid(eventId, pathname);
      }
      async function workshop() {
        const eventId = params.id;
        return await distributeAllEventsByModerator(eventId, pathname);
      }

      const processRequest =
        makeRequest(componentType, event) ||
        makeRequest(componentType, workshop);

      if (typeof processRequest === "function") {
        resp = await processRequest();
      }

      if (!resp || resp?.error) throw Error();
      toast?.success(resp?.message);
    } catch (err) {
      toast.error(err?.message);
    } finally {
      setIsLoading(null);
    }
  };
  return (
    <div className="flex flex-wrap gap-2">
      {/* {undistributedCount !== 0 && ( */}
      <Button
        onClick={() => handleDistribute("distribute")}
        disabled={isLoading === "removeDistribute"}
        variant="outline"
        size="sm"
      >
        {isLoading === "distribute" ? (
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
        ) : (
          <SendHorizonal className="mr-1 h-4 w-4" />
        )}
        Distribute <Badge className="ml-1">{undistributedCount}</Badge>
      </Button>
      {/* )} */}

      {/* {distributedCount !== 0 && ( */}
      <Button
        onClick={() => handleDistributeRemove("removeDistribute")}
        disabled={isLoading === "removeDistribute"}
        variant="outline"
        size="sm"
      >
        {isLoading === "removeDistribute" ? (
          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
        ) : (
          <Undo2 className="mr-1 h-4 w-4" />
        )}
        Remove <Badge className="ml-1">{distributedCount}</Badge>
      </Button>
      {/* )} */}

      {markedCount !== 0 && (
        <Button
          onClick={() => handlePublishedMarks("published")}
          disabled={markedCount === 0 || isLoading === "published"}
          variant="outline"
          size="sm"
        >
          {isLoading === "published" ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : (
            <CheckCheck className="mr-1 h-4 w-4" />
          )}
          Published <Badge className="ml-1">{markedCount}</Badge>
        </Button>
      )}

      {paymentCount !== 0 && (
        <Button
          disabled={paymentCount === 0 || isLoading === "payment"}
          variant="outline"
          onClick={() => handlePayment("payment")}
          size="sm"
        >
          {isLoading === "payment" ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : (
            <Banknote className="mr-1 h-4 w-4" />
          )}
          Approve <Badge>{paymentCount}</Badge>
        </Button>
      )}
    </div>
  );
}
