import { useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import GuestAppBar from "../../components/guest/GuestAppBar";
import GuestHome from "../../components/guest/GuestHome";
import GuestSchedule from "../../components/guest/GuestSchedule";
import GuestSetting from "../../components/guest/GuestSetting";
import GuestWrapper from "../../components/guest/GuestWrapper";
import useAuthState from "../../hooks/useAuthState";

const index = () => {
  const [menu, setMenu] = useState<"Home" | "Schedule" | "Settings" | "Logout">(
    "Home"
  );
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY}&libraries=drawing` ?? "",
  });
  const { logout } = useAuthState({ LoginType: "guest" });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const pages = () => {
    switch (menu) {
      case "Schedule":
        return <GuestSchedule></GuestSchedule>;
      case "Settings":
        return <GuestSetting></GuestSetting>;
      case "Logout":
        logout();
        return <></>;
      default:
        return <GuestHome></GuestHome>;
    }
  };

  return (
    <GuestWrapper>
      <GuestAppBar setState={setMenu} />
      {pages()}
    </GuestWrapper>
  );
};

export default index;
