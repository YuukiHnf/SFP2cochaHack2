import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import puppeteer from "puppeteer";
import ReactDOMServer, { renderToString } from "react-dom/server";
import TestComponent from "../../components/TestComponent";

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

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.statusCode = 200;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const html = "<h1>日本語いけ...</h1>";
    //const html = renderToString(<TestComponent />);
    await page.setContent(html);
    const pdf = await page.pdf({
      path: "./public/puppteer.pdf",
      format: "a4",
    });

    await browser.close();
    return pdf;
  })();
  return res.json({ result: true });
};
