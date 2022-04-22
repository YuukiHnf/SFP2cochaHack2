import React from "react";
import { useAppSelector } from "../../app/hooks";
import {
  selectAdminPlaceState,
  selectAdminTaskBlock,
} from "../../features/adminSlice";
import { selectSetObjects } from "../../features/setObjectSlice";
import PDFViewer from "./PDFViewer";

const PDFAdmin = () => {
  const placeParam = useAppSelector(selectAdminPlaceState);

  const setObjects = useAppSelector(selectSetObjects);

  const taskBlock = useAppSelector(selectAdminTaskBlock);

  return (
    <>
      {taskBlock && (
        <PDFViewer
          placeParam={placeParam}
          setObjects={setObjects}
          taskBlock={taskBlock}
          isClient={true}
        />
      )}
    </>
  );
};

export default PDFAdmin;
