import { LoadScript } from "@react-google-maps/api";
import { Timestamp } from "firebase/firestore";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import puppeteer from "puppeteer";
import ReactDOMServer, {
  renderToReadableStream,
  renderToStaticNodeStream,
  renderToString,
} from "react-dom/server";
import HomeComponent from "../../components/admin/HomeComponent";
import PDFViewer from "../../components/PDF/PDFViewer";
import TestComponent from "../../components/TestComponent";
import { SetObjectType, TaskBlock } from "../../utils/firebase/FirebaseStore";
//import TestComponent from "../../components/TestComponent";

// export default (req: NextApiRequest, res: NextApiResponse): void => {
//   res.statusCode = 200;

//   // path index.tsから見たものなので、cochahack/public/
//   const postsDirectory = path.resolve("./public");
//   // filenameやデイレクトリの名前がリストで得られる
//   const filenames = fs.readdirSync(postsDirectory);

//   const posts = filenames.map((filename) => {
//     const filePath = path.resolve(postsDirectory, filename);
//     const fileContents = fs.readFileSync(filePath, "utf-8");

//     return {
//       filename,
//       content: fileContents,
//     };
//   });

//   res.json({ posts });
//   res.
// };

// const TestComponent = () => {
//     return (<div></div>);
// }

const placeParam = {
  heading: 90,
  center: {
    lng: 141.34057847732373,
    lat: 43.08021007881248,
  },
  zoom: 19,
  tilt: 0,
};

const taskBlock: TaskBlock[] = [
  {
    taskIds: [],
    title: "初期位置",
    time: new Timestamp(1654214400, 0),
    isInit: true,
    id: "7kb2b37J0PTwPeptGz5R",
  },
  {
    title: "設営",
    taskIds: [
      "Qdmd7gtsmmbWmdoUXX7L",
      "p5Vm7o2vDBs9ZyCpXYHU",
      "4hS7vtRJPCdbhsSV1hwy",
      "HDo5qCFH5xpgtr0eOyDt",
      "z9nKDjDOUXdjwuhjcL9t",
      "Ip8cBmpePHUXnjzmarcz",
      "mdYrCv7yXFTFp2AszsXw",
      "HhwTvBkDSm20qld96NvG",
      "RmUCqbb8UCBBPAnbgHJM",
      "HB4Ecgwhd1xpsIYN628k",
      "cciB4fziNAx9yTqp3P8n",
      "btT0Lx2XfhqpJ793gi2x",
      "C7QjWrwEnZlqu9R2z5n6",
      "zIU5eKzy0r4BjuKpRUQY",
      "NNkZ1WChCickqyOSnMGt",
      "WiLhUBGxpULlxSdeuV4s",
      "MLMckkVNLFSgbjCSSaYK",
      "c49IsRnZGRN7HdT6jAo9",
      "vTQ2B2TDObZVO4q28jiR",
      "rceHUcjyUt89FLQ8JAC7",
      "67hKkLfRt4gFwjsnfg2l",
      "voVU6ypaZW7JauADe8eq",
      "gtV24oyFpiaLStiCx35d",
      "Pgf3PKSF7s7HdBH21LU6",
      "qQgFxDL5S4TXGiaeWTQo",
    ],
    time: new Timestamp(1654215000, 0),
    isInit: false,
    id: "Y7WAfI45mwPBjJhsCQmk",
  },
  {
    title: "演者受付",
    taskIds: [
      "1QpAqsmwqJBtfAd7tBio",
      "4Kgl5mjnAvPqpShkBfTC",
      "C0SrkbuON931pkvuszJD",
      "N5Iz8kvhmXGONwUVgfiN",
      "Yvi6uh3sphP3NuPLI8ON",
      "XLIDeMR0sXpAe8vMdCne",
      "2tkzEhX5QNWwQG5qMBSc",
      "i5VuBSOYHJ5uNs3brr8r",
      "uzyK53bQRzsFgyYFwtxE",
    ],
    time: new Timestamp(1654217100, 0),
    isInit: false,
    id: "2TliJxat77MMAP7w8aKI",
  },
  {
    title: "開会挨拶",
    taskIds: [
      "xNH1SB9rK6hHPml71bTt",
      "yJ9bnmhMrv68G0PMjy4v",
      "D9Zf2wBE5dJHWIKyWzjA",
      "Xn2jSBOtqhCsCBrcKdpg",
    ],
    time: new Timestamp(1654219800, 0),
    isInit: false,
    id: "c5OnVltF0siUpyTfO5f9",
  },
  {
    taskIds: [],
    title: "第一部",
    time: new Timestamp(1654220100, 0),
    isInit: false,
    id: "N8yPBLWMCt9rdfNkR9Fu",
  },
];

const setObjects: SetObjectType[] = [
  {
    setObjectType: "GoogleCircle",
    locations: [
      {
        lng: 141.3404481901626,
        lat: 43.07990942226969,
      },
      {
        lng: 0,
        lat: 0.6982125030791809,
      },
    ],
    desc: "公衆電話",
    id: "5CQr5l0Pk3mBlahR7Byq",
  },
  {
    setObjectType: "GooglePolygon",
    locations: [
      {
        lng: 141.3403737716412,
        lat: 43.08017653777231,
      },
      {
        lng: 141.34044082686657,
        lat: 43.07992087706353,
      },
      {
        lng: 141.34054543301815,
        lat: 43.079934590691835,
      },
      {
        lng: 141.34047301337475,
        lat: 43.0801892718027,
      },
    ],
    desc: "特設演舞場ステージ",
    id: "5ZkbofdPglbQqShDsgiR",
  },
  {
    setObjectType: "GoogleCircle",
    locations: [
      {
        lng: 141.3403472708127,
        lat: 43.080273113457665,
      },
      {
        lng: 0,
        lat: 1.2105607008641819,
      },
    ],
    desc: "消火栓",
    id: "FSkiHjdAXLiCo4636cnw",
  },
  {
    setObjectType: "GooglePolygon",
    locations: [
      {
        lng: 141.3411541944425,
        lat: 43.08061382858762,
      },
      {
        lng: 141.3411890631597,
        lat: 43.08052175233082,
      },
      {
        lng: 141.341240025131,
        lat: 43.08052958861337,
      },
      {
        lng: 141.34120247420478,
        lat: 43.08061970579078,
      },
    ],
    desc: "PAテント",
    id: "LgvL1Wi1EMfKmYDsBtyk",
  },
  {
    setObjectType: "GooglePolygon",
    locations: [
      {
        lng: 141.34038872613536,
        lat: 43.080291774258534,
      },
      {
        lng: 141.34039878441916,
        lat: 43.08025406199314,
      },
      {
        lng: 141.34062207831965,
        lat: 43.08028295840638,
      },
      {
        lng: 141.34061067893134,
        lat: 43.080321650192566,
      },
    ],
    desc: "通常ステージ",
    id: "RxegXyPLPkR2Iau3xNph",
  },
  {
    setObjectType: "GooglePolygon",
    locations: [
      {
        lng: 141.3403553598836,
        lat: 43.080240181948284,
      },
      {
        lng: 141.34038821694404,
        lat: 43.0802465489572,
      },
      {
        lng: 141.34040632185489,
        lat: 43.080188756082784,
      },
      {
        lng: 141.34037212368995,
        lat: 43.08018287883825,
      },
    ],
    desc: "PAテント",
    id: "SuhDU5JCjPsItTOOXse1",
  },
  {
    setObjectType: "GooglePolygon",
    locations: [
      {
        lng: 141.34075186309028,
        lat: 43.08055995419884,
      },
      {
        lng: 141.34077063855338,
        lat: 43.08046591878856,
      },
      {
        lng: 141.34069285449195,
        lat: 43.08045416435214,
      },
      {
        lng: 141.34070626553702,
        lat: 43.08040518750939,
      },
      {
        lng: 141.34119979199576,
        lat: 43.080469836933545,
      },
      {
        lng: 141.34118101653266,
        lat: 43.080524690936905,
      },
      {
        lng: 141.34109250363517,
        lat: 43.08051097744066,
      },
      {
        lng: 141.341062999336,
        lat: 43.080608930917876,
      },
      {
        lng: 141.34074649867225,
        lat: 43.08057366768412,
      },
    ],
    desc: "メインステージ",
    id: "XHzczKBYRN6YJ3zFOIfN",
  },
  {
    setObjectType: "GooglePolygon",
    locations: [
      {
        lng: 141.3396858454262,
        lat: 43.08028342782083,
      },
      {
        lng: 141.3397032797848,
        lat: 43.08020212601386,
      },
      {
        lng: 141.34001843934405,
        lat: 43.08024718485995,
      },
      {
        lng: 141.3399916172539,
        lat: 43.080327507068645,
      },
    ],
    desc: "演者待機場所",
    id: "c3jKoqm7GfIR1oJ4ipBJ",
  },
  {
    setObjectType: "GoogleCircle",
    locations: [
      {
        lng: 141.34014876437058,
        lat: 43.080330227060664,
      },
      {
        lng: 0,
        lat: 4.181434148775359,
      },
    ],
    desc: "物品置き場",
    id: "l0PCxj1YnbgwrEvnUycV",
  },
  {
    setObjectType: "GooglePolygon",
    locations: [
      {
        lng: 141.34049563401112,
        lat: 43.08018929669487,
      },
      {
        lng: 141.3405626892365,
        lat: 43.07993755421832,
      },
      {
        lng: 141.34073032729992,
        lat: 43.0799600837428,
      },
      {
        lng: 141.34066193097004,
        lat: 43.08021084658641,
      },
    ],
    desc: "客席",
    id: "mkx1HoNchackXJibtuaZ",
  },
];

const generatePDF = async (html: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //const html = "<h1>日本語いけ...</h1>";
  //const html = renderToString(<TestComponent />);

  //const html = renderToString(<HomeComponent />);
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setContent(html, {
    waitUntil: "networkidle0",
  });
  // await page.goto("http://localhost:3000/admin/", {
  //   waitUntil: "networkidle0",
  // });

  const pdf = await page.pdf({
    path: "./public/puppteer.pdf",
    format: "a4",
  });
  //await page.screenshot({ path: "./public/puppteer.png" });

  await browser.close();
  return pdf;
};

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.statusCode = 200;
  const JSXComponent = (
    <LoadScript
      googleMapsApiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_APIKEY}&libraries=drawing`}
    >
      <PDFViewer
        placeParam={placeParam}
        setObjects={setObjects}
        taskBlock={taskBlock}
        isClient={false}
      />
    </LoadScript>
  );

  const html = renderToString(
    // JSXComponent
    <PDFViewer
      placeParam={placeParam}
      setObjects={setObjects}
      taskBlock={taskBlock}
      isClient={false}
    />
  );
  // const appStream = renderToStaticNodeStream(JSXComponent);
  // appStream.on("end", (props) => {
  //   console.log(props);
  // });
  generatePDF(html);
  return res.json({ result: true });
};
