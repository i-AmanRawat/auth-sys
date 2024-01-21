import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {
  const session = await auth();

  return (
    <div className=" flex flex-col items-center justify-center ">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}
