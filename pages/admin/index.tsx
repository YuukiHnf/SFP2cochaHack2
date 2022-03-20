import React, { useState } from "react";
import AdminWrapper from "../../components/admin/AdminWrapper";
import AppBar1 from "../../components/admin/AppBar1";
import AppBar2 from "../../components/admin/AppBar2";
import ObjectComponent from "../../components/admin/ObjectComponent";
import PlaceComponent from "../../components/admin/PlaceComponent";
import TeamComponent from "../../components/admin/TeamComponent";

const index = () => {
  const [menu, setMenu] = useState<"home" | "team" | "place" | "object">(
    "home"
  );
  const pages = () => {
    switch (menu) {
      case "team":
        return <TeamComponent />;
      case "place":
        return <PlaceComponent />;
      case "object":
        return <ObjectComponent />;
      default:
        return <p>home</p>;
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
