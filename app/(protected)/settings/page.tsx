"use client";

import { Logout } from "@/action/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

//if the comp is server
// export default async function SettingsPage() {
//   const session = await auth();

//if the comp is client
export default function SettingsPage() {
  const session = useCurrentUser();

  function onClick() {
    Logout();
  }

  return (
    <div className=" flex flex-col items-center justify-center ">
      {JSON.stringify(session)}
      {/* 
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
       */}
      <form>
        <Button onClick={onClick} type="submit">
          Sign out
        </Button>
      </form>
    </div>
  );
}
