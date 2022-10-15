import DragDrop from "../components/roundOnePointThree/DragDrop";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-toastify/dist/ReactToastify.css";
import DragBody from "../components/roundOnePointThree/DragBody";
import DragFinal from "../components/roundOnePointThree/DragFinal";

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
  console.log(session);
  return (
    status === "authenticated" && (
      <>
        {/* <ToastContainer /> */}
        <ToastContainer />
        <DndProvider backend={HTML5Backend}>
          <DragFinal />
        </DndProvider>
      </>
    )
  );
}
