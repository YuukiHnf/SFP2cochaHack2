import { Divider, Paper, Stack } from "@mui/material";
import React, { VFC } from "react";
import TextArea from "./TextArea";
import { styled } from "@mui/material/styles";
// import {
//   Circle,
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   Polygon,
// } from "@react-google-maps/api";
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

import { StaticGoogleMap, Marker, Path } from "react-static-google-map";

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
          <StaticGoogleMap
            apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY}&libraries=drawing`}
            size="600x400"
            language="ja"
            scale={"1"}
            center={`${placeParam.center.lat},${placeParam.center.lng}`}
            zoom={placeParam.zoom}
          >
            {setObjects &&
              setObjects.map((obj, index) => {
                switch (obj.setObjectType) {
                  case "GooglePolygon":
                    return (
                      <Marker
                        key={obj.id + index + "Marker"}
                        size="mid"
                        color="white"
                        label={`${index}`}
                        scale={"1"}
                        location={{
                          lat:
                            obj.locations
                              .map((loc) => loc.lat)
                              .reduce((sum, element) => sum + element, 0) /
                            obj.locations.length,
                          lng:
                            obj.locations
                              .map((loc) => loc.lng)
                              .reduce((sum, element) => sum + element, 0) /
                            obj.locations.length,
                        }}
                      />
                    );
                  case "GoogleMarker":
                  case "GoogleCircle":
                    return (
                      <Marker
                        key={obj.id + index + "Marker"}
                        size="mid"
                        color="white"
                        label={`${index}`}
                        scale={"1"}
                        location={obj.locations[0]}
                      />
                    );
                  default:
                    return;
                }
              })}
            {setObjects &&
              setObjects.map((obj) => {
                switch (obj.setObjectType) {
                  case "GooglePolygon":
                    return (
                      <Path
                        key={obj.id + "path"}
                        weight={"0"}
                        fillcolor={"green"}
                        points={obj.locations}
                      />
                    );
                  default:
                    return;
                }
              })}
          </StaticGoogleMap>
          {setObjects.map((obj, index) => (
            <>
              <p>{`${index}:${obj.desc}`}</p>
            </>
          ))}
        </Item>
        <Item>
          <TextArea
            title={"タイムテーブル"}
            description={"当日の会進行スケジュールについて"}
          />
          <PDFTable1 />
        </Item>
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
