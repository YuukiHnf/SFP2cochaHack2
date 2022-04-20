import { Divider, Paper, Stack } from "@mui/material";
import React, { VFC } from "react";
import TextArea from "./TextArea";
import { styled } from "@mui/material/styles";
import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import {
  GoogleDrawingOverlay,
  PLACE,
  SetObjectType,
} from "../../utils/firebase/FirebaseStore";
import {
  rectAngleOption,
  rectAngleOption2,
  rectAngleOption3,
  rectAngleOption4,
  rectAngleOption5,
} from "../googlemap/MapSettingComponent";
import { PDFTable1 } from "./PDFTable1";

export type PDFViewerProps = {
  placeParam: PLACE;
  setObjects: SetObjectType[];
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const titleStyle: React.CSSProperties = {
  marginBottom: 0,
};

const subTitleDivStyle: React.CSSProperties = {
  color: "gray",
  width: "100%",
  marginBottom: "15px",
};

const subTitleStyle: React.CSSProperties = {
  margin: "0",
  fontSize: "16px",
};

const _mapContainerStyle = {
  width: "80%",
  height: "350px",
  margin: "0 auto",
};

const mapOption: google.maps.MapOptions = {
  disableDefaultUI: true,
  styles: [
    {
      featureType: "all",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};

const SetObject2JSX = (setObjects: SetObjectType[]) =>
  setObjects.map((setObj, index) => {
    switch (setObj.setObjectType) {
      case "GooglePolygon":
        return (
          <>
            <Polygon
              key={setObj.id}
              path={setObj.locations}
              options={
                setObj.desc.endsWith("ステージ")
                  ? rectAngleOption
                  : setObj.desc.endsWith("テント")
                  ? rectAngleOption4
                  : rectAngleOption3
              }
            />
            <Marker
              position={{
                lat:
                  setObj.locations
                    .map((loc) => loc.lat)
                    .reduce((sum, element) => sum + element, 0) /
                  setObj.locations.length,
                lng:
                  setObj.locations
                    .map((loc) => loc.lng)
                    .reduce((sum, element) => sum + element, 0) /
                  setObj.locations.length,
              }}
              label={{ text: setObj.desc, color: "black", fontSize: "12px" }}
              icon={{ url: "./explaingIcon.png" }}
            />
          </>
        );
      case "GoogleMarker":
        return (
          <>
            <Marker
              key={setObj.id}
              position={setObj.locations[0]}
              label={setObj.desc[0]}
            />

            <Marker
              position={{
                lat:
                  setObj.locations
                    .map((loc) => loc.lat)
                    .reduce((sum, element) => sum + element, 0) /
                  setObj.locations.length,
                lng:
                  setObj.locations
                    .map((loc) => loc.lng)
                    .reduce((sum, element) => sum + element, 0) /
                  setObj.locations.length,
              }}
              label={{ text: setObj.desc, color: "black", fontSize: "12px" }}
              icon={{ url: "./explaingIcon.png" }}
            />
          </>
        );
      case "GoogleCircle":
        return (
          <>
            <Circle
              key={setObj.id}
              center={setObj.locations[0]}
              radius={setObj.locations[1].lat}
              options={rectAngleOption5}
            />

            <Marker
              position={setObj.locations[0]}
              label={{ text: setObj.desc, color: "black", fontSize: "12px" }}
              icon={{ url: "./explaingIcon.png" }}
            />
          </>
        );
      default:
        return <></>;
    }
  });

const PDFViewer: VFC<PDFViewerProps> = ({ placeParam, setObjects }) => {
  const now = new Date();
  return (
    <div style={{ margin: "20 auto", width: "80%" }}>
      {/* Title */}
      <h1 style={titleStyle}>全体運営マニュアル</h1>
      <div style={subTitleDivStyle}>
        <h3 style={subTitleStyle}>文責:{"admin"}</h3>
        <h3 style={subTitleStyle}>
          日付:
          {now.getFullYear() +
            "年" +
            now.getMonth() +
            "月" +
            now.getDate() +
            "日"}
        </h3>
      </div>

      <Stack spacing={1} divider={<Divider orientation="vertical" flexItem />}>
        <Item>
          {/* abstract */}
          <TextArea
            title={"概要"}
            description={
              "各バンドが体育館横特設ステージで曲を演奏し、観客を盛り上げる。"
            }
          />
        </Item>
        <Item>
          {/* timeLoc */}
          <TextArea
            title={"場所・日時"}
            description={"場所：教養棟前特設ステージ 日時:6/3"}
          />
          <GoogleMap
            mapContainerStyle={_mapContainerStyle}
            zoom={placeParam.zoom - 0.5}
            center={placeParam.center}
            options={mapOption}
          >
            {SetObject2JSX(setObjects)}
          </GoogleMap>
        </Item>
        <Item>
          <TextArea
            title={"タイムテーブル"}
            description={"当日の会進行スケジュールについて"}
          />
          <PDFTable1 />
        </Item>
        {/* <Item>
          <TextArea title={"シフト人数"} description={"タスク一覧."} />
          <PDFTable1 />
        </Item> */}
        <Item>
          <TextArea
            title={"タスク内容"}
            description={"タスクの内容を以下に示す."}
          />
        </Item>
        <Item>
          <TextArea title={"Q&A"} description={"Q&Aの内容を以下に示す."} />
        </Item>
      </Stack>
    </div>
  );
};

export default PDFViewer;
