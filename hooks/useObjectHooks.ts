/** Custom Hooks
 * Objectデータを受け持つ
 */

import { collection, doc, query, updateDoc, where } from "firebase/firestore";
import { db, PLACE, TaskBlock } from "../utils/firebase/FirebaseStore";

type Props = {
  teamId: string;
};

//const path = "place";

const useObjectHooks = ({ teamId }: Props) => {
  const saveTaskBlock = async (value: TaskBlock) => {
    const teamRef = doc(db, "team", teamId);
    const blockRef = doc(collection(teamRef, "taskBlock"), value.id);
    console.log("useObjectHooks", value);

    await updateDoc(blockRef, {
      time: value.time,
      taskIds: value.taskIds,
      objectLocations: value.objectLocations,
    });
  };

  return { saveTaskBlock };
};

export default useObjectHooks;
