import Head from "next/head";
import styles from "../styles/Home.module.css";
import Questions from "../components/quizQuestions/Questions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Quiz() {
  const { status } = useSession();
  const { data: session } = useSession();
  const router = useRouter();

  // redirects to home if user not logged in
  useEffect(() => {
    if (router.isReady) {
      if (status !== "loading" && status === "unauthenticated") {
        toast.error("Please Login First!");
        router.push("/");
      }
    }
  }, [session, status, router]);
  return status === "authenticated" && <Questions />;
}
