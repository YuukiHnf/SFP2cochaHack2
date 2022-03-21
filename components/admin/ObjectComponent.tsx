import { useState, VFC } from "react";
import { url } from "../../utils/config";
import { OBJECTPARAM } from "../../utils/firebase/FirebaseStore";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";
import ObjectTable from "./ObjectTable";

const initObjectParam: OBJECTPARAM[] = [
  {
    id: "0001",
    name: "コーン",
    iconUrl:
      "http://localhost:9199/v0/b/default-bucket/o/cornIcon.svg?alt=media&token=f7f517ca-9ccd-4a89-a970-8c7b0a6200c0",
    weight: 10,
    num: 3,
  },
  {
    id: "0002",
    name: "マイク",
    iconUrl:
      "http://localhost:9199/v0/b/default-bucket/o/micIcon.svg?alt=media&token=6b199d98-1a0c-4024-82e9-685c34b4c747",
    weight: 10,
    num: 1,
  },
  {
    id: "0003",
    name: "テーブル",
    iconUrl:
      "http://localhost:9199/v0/b/default-bucket/o/tableIcon.svg?alt=media&token=fa033838-5158-469e-a09a-d9ea2aadf2dc",
    weight: 10,
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
      <p>{ptrObjectId}</p>
      <DefaultGoogleMapComponent>{}</DefaultGoogleMapComponent>
    </>
  );
};

export default ObjectComponent;
