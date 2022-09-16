import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Loading from "../../components/Loading";
import NavigationBar from "../../components/NavigationBar";
import SearchTeams from "../../components/SearchTeams";
import SearchTeamsWithSearch from "../../components/SearchTeamsWithSearch";

function JoinTeamPage() {
  const { status } = useSession();
  const router = useRouter();

  // redirects to home if user not logged in 
  useEffect(() => {
    if (router.isReady) {
      if (status !== "loading" && status === "unauthenticated") {
        router.push("/")
      }
    }
  }, [status, router])

  // if user is leader, should not be able to see /join-team

  return (
    <>
      <ToastContainer />
      {status === "loading" ? <Loading /> : status === "authenticated" &&
        <div>
          <NavigationBar />
          <br />
          <SearchTeams />
        </div>}
    </>
  );
}

export default JoinTeamPage;
