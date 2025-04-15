import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSettings from "./account-settings";
import AppearanceSettings from "./appearance-settings";
import ProfileSettings from "./profile-settings";

export default function MemberProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs className="space-y-4" defaultValue="profile">
        <TabsList className="grid grid-cols-3 md:w-[400px] w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="account">
          <AccountSettings />
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <AppearanceSettings />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
