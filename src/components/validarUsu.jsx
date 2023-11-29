"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function ValUsu({ params, children }) {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session)
  console.log(params)
  if (session.user.id_cuenta == params) {
    {
      return children;
    }
  } else {
    router.push("/menu");
  }
}
