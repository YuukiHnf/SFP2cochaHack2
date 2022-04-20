import { Card, CardContent, Typography } from "@mui/material";
import React, { VFC } from "react";

const CardStyle: React.CSSProperties = {
  margin: "10, 0, 10, 0",
};

// const TextArea = () => {
//   return (
//     <Card style={CardStyle}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           概要
//         </Typography>
//         <Typography variant="body2">
//           各バンドが体育館横特設ステージで曲を演奏し、観客を盛り上げる。
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

const SubTitleStyle: React.CSSProperties = {
  color: "#222222",
};

type Props = {
  title: string;
  description: string;
};

const TextArea: VFC<Props> = ({ title, description }) => {
  return (
    <>
      <h3 style={SubTitleStyle}>{title}</h3>
      <p>{description}</p>
    </>
  );
};

export default TextArea;
