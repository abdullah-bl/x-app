import { signOut } from "~/lib/auth"
import { Button } from "../ui/button"
import { ExitIcon } from "@radix-ui/react-icons"

export default function SignOutForm() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button variant={"outline"}>
        <ExitIcon className="w-6" />
      </Button>
    </form>
  )
}
