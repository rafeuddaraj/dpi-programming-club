import ResultDashboard from "@/components/dashboard/result-dashboard";
import ResultManualEntry from "@/components/dashboard/result-manual-entry";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ResultPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Result Dashboard System</h1>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="dashboard">Result Dashboard</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <ResultDashboard />
        </TabsContent>

        <TabsContent value="manual">
          <ResultManualEntry />
        </TabsContent>
      </Tabs>
    </div>
  );
}
