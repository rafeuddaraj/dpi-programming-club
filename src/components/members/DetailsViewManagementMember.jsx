"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../button";

export default function DetailsViewManagementMember({
  member,
  registeredUser,
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        className="w-full mt-2"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide Details" : "Show Contact Details"}
      </Button>

      {showDetails && (
        <>
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <a href={`mailto:${registeredUser?.email}`}>
                <span className="text-sm">{registeredUser?.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a href={`tel:${registeredUser?.phoneNumber}`}>
                <span className="text-sm">{registeredUser?.phoneNumber}</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <Link href={`/profile?id=${member?.user?.id}`}>
              <Button>Visit Profile</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}
