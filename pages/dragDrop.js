import DragDrop from "../components/roundOnePointThree/DragDrop";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-toastify/dist/ReactToastify.css";

export default function DragDroppp() {
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
  return (status === "authenticated" &&
    <>
      {/* <ToastContainer /> */}
      <DndProvider backend={HTML5Backend}>

      <DragDrop />
      </DndProvider>

    </>);
}
