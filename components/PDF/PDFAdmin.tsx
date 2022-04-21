import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAdminPlaceState } from "../../features/adminSlice";
import { selectSetObjects } from "../../features/setObjectSlice";
import PDFViewer from "./PDFViewer";

const PDFAdmin = () => {
  const placeParam = useAppSelector(selectAdminPlaceState);

  const setObjects = useAppSelector(selectSetObjects);

  return (
    <>
      <PDFViewer placeParam={placeParam} setObjects={setObjects} />
    </>
  );
};

export default PDFAdmin;
