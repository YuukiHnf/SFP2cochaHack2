import { useState, VFC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminObjects } from "../../features/adminSlice";
import { url } from "../../utils/config";
import { OBJECTPARAM } from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import ObjectTable from "./ObjectTable";

const ObjectComponent: VFC = () => {
  const [ptrObjectId, setPtrObjectId] = useState<string>("");
  // const [objectParams, setObjectParams] =
  //   useState<OBJECTPARAM[]>(initObjectParam);
  const objectParams = useAppSelector(selectAdminObjects);

  return (
    <>
      <ObjectTable
        objectParams={objectParams}
        setPtrObjectId={setPtrObjectId}
      />
      <p>{ptrObjectId}</p>
      <DefaultGoogleMapComponent>{}</DefaultGoogleMapComponent>
    </>
  );
};

export default ObjectComponent;
