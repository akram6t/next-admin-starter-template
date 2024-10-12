import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Page(){
  return(
    <main className="flex min-h-screen items-center justify-center flex-col space-y-5">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <ModeToggle/>
      {/* <div className=""> */}
      <Button>Dashboard</Button>
      <Button>
        <Link href="/auth/signin">Login</Link>
      </Button>
      <Button>Logout</Button>
      <Button>Profile</Button>
      {/* </div> */}
    </main>
  )
}