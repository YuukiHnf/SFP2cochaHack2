import { useState, VFC } from "react";
import { url } from "../../utils/config";
import { OBJECTPARAM } from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import ObjectTable from "./ObjectTable";

const initObjectParam: OBJECTPARAM[] = [
  {
    id: "0001",
    name: "tent",
    iconUrl:
      "http://localhost:9199/v0/b/default-bucket/o/tentIcon.jpg?alt=media&token=3248e407-cc60-4fda-8740-3d20308802d8",
    weight: 10,
    team: "hokudaiFesta",
    num: 3,
  },
  {
    id: "0002",
    name: "tent",
    iconUrl:
      "http://localhost:9199/v0/b/default-bucket/o/tentIcon.jpg?alt=media&token=3248e407-cc60-4fda-8740-3d20308802d8",
    weight: 10,
    team: "hokudaiFesta",
    num: 3,
  },
];

const ObjectComponent: VFC = () => {
  const [ptrObjectId, setPtrObjectId] = useState<string>("");
  const [objectParams, setObjectParams] =
    useState<OBJECTPARAM[]>(initObjectParam);

  return (
    <>
      <ObjectTable
        objectParams={objectParams}
        setPtrObjectId={setPtrObjectId}
      />
      <DefaultGoogleMapComponent>{}</DefaultGoogleMapComponent>
    </>
  );
};

export default ObjectComponent;
