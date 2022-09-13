import { useSession } from "next-auth/react";
import Sign from "../components/sign";

export default function Component() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <Sign />;
  }

  return <a href="/api/auth/signin">Sign in</a>;
}
