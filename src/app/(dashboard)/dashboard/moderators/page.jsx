import { ModeratorList } from "./_components/moderator-list";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Moderator Management System</h1>
        <p className="text-muted-foreground mt-2">
          Manage all moderators, their assignments, and skill requests
        </p>
      </div>

      <ModeratorList />
    </div>
  );
}
