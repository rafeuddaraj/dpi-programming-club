import { TabsContent } from "@/components/ui/tabs";

// This would come from your API in a real application
import PageHeader from "../members/page-header";
import ClientTabs from "./_components/client-tabs";
import ElectionsList from "./_components/election-list";
import FeaturedElection from "./_components/feature-election";

export default async function ManagementPage({ searchParams: searchParam }) {
  const searchParams = await searchParam;
  return (
    <main className="container mx-auto py-10 px-4">
      <PageHeader
        title="Management Team"
        description="Meet our dedicated management team members who lead our club's initiatives and activities. These elected representatives work tirelessly to ensure the success and growth of our community."
        tags={["Leadership", "Elected Representatives", "Club Management"]}
      />
      <ClientTabs>
        <TabsContent value="current" className="space-y-12">
          <FeaturedElection />
        </TabsContent>

        <TabsContent value="previous" className="space-y-8">
          <ElectionsList searchParams={searchParams} />
        </TabsContent>
      </ClientTabs>
    </main>
  );
}
