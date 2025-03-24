import { NoWorkshops } from "@/components/common/empty-states";
import { WorkshopCard } from "./workshop-card";

export function WorkshopList({ workshops }) {
  return (
    <>
      {workshops?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      ) : (
        <NoWorkshops />
      )}
    </>
  );
}
