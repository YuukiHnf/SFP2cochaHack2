import { useLoadScript } from "@react-google-maps/api";
import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import AdminWrapper from "../../components/admin/AdminWrapper";
import AppBar1 from "../../components/admin/AppBar1";
import AppBar2 from "../../components/admin/AppBar2";
import HomeComponent from "../../components/admin/HomeComponent";
import ObjectComponent from "../../components/admin/ObjectComponent";
import PlaceComponent from "../../components/admin/PlaceComponent";
import TeamComponent from "../../components/admin/TeamComponent";
import { selectAdminPlaceState } from "../../features/adminSlice";

const index = () => {
  const [menu, setMenu] = useState<"home" | "team" | "place" | "object">(
    "home"
  );
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY}&libraries=drawing` ?? "",
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  const pages = () => {
    switch (menu) {
      case "team":
        return <TeamComponent />;
      case "place":
        return <PlaceComponent />;
      case "object":
        return <ObjectComponent />;
      default:
        return <HomeComponent />;
    }
  };
  return (
    <AdminWrapper>
      <AppBar2 setState={setMenu} />
      {pages()}
    </AdminWrapper>
  );
};

export default index;
