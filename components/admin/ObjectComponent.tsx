import { VFC } from "react";
import { url } from "../../utils/config";
import DefaultGoogleMapComponent from "../googlemap/DefaultGoogleMapComponent";

const ObjectComponent: VFC = () => {
  return (
    <>
      <DefaultGoogleMapComponent>{}</DefaultGoogleMapComponent>
      <div>test</div>
      <img src={url("/cornIcon.svg")} alt="" />
    </>
  );
};

export default ObjectComponent;
