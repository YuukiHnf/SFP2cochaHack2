/** Custom Hooks
 * Objectデータを受け持つ
 */

import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import {
  db,
  ObjectLocation,
  PLACE,
  TaskBlock,
} from "../utils/firebase/FirebaseStore";

type Props = {
  teamId: string;
};

//const path = "place";

const useObjectHooks = ({ teamId }: Props) => {
  // 最初の位置をUpdateする
  const saveInitObjectLocation = async (
    objectId: string,
    value: ObjectLocation
  ) => {
    const teamRef = doc(db, "team", teamId);
    const objectRef = doc(collection(teamRef, "objects"), objectId);
    //console.log("useObjectHooks", value);

    await updateDoc(objectRef, {
      initLocation: value.location,
    });
  };

  return { saveInitObjectLocation };
};

export default useObjectHooks;
