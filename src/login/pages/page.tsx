// import React from "react";
// import { useEffect, useState } from "react";
// import { getSelectorsByUserAgent } from "react-device-detect";
// import { Stack } from "@mui/system";
// import SignInPage from "./common";
// import Background from "../src/assets/darkSmall.png";

// const Page: React.FC = () => {
//   const [mobile, setMobile] = useState(false);

//   useEffect(() => {
//     const userAgent = navigator.userAgent;
//     const selectors = getSelectorsByUserAgent(userAgent);
//     setMobile(selectors?.isMobile ?? false);
//   }, []);

//   return (
//     <Stack
//       width="100vw"
//       height="100vh"
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       sx={{
//         backgroundImage: `url(${Background})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <SignInPage isMobile={mobile} />
//     </Stack>
//   );
// }

// export default Page;
