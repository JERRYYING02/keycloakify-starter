import React from "react";
import { Stack } from "@mui/system";
// import Link from "next/link";
import { PALETTE, Typography } from "../ui";

interface IconButtonProps {
  url?: string;
  icon?: React.ReactNode;
  alt?: string;
  width?: number;
  height?: number;
  bgcolor: string;
  hoverOpacity?: number;
  text?: string;
  textColor?: string;
  startIcon?: React.ReactNode;
  iconColor?: string;
  hoverIconColor?: string;
  hoverTextColor?: string;
  fontSize?: string;
  padding?: string;
  spacing?: string;
  onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  // url,
  icon,
  width,
  height,
  bgcolor,
  hoverOpacity = 0.6,
  text,
  textColor,
  startIcon,
  iconColor = PALETTE.primary.navy,
  hoverIconColor = PALETTE.primary.navy,
  hoverTextColor,
  fontSize = "16px",
  padding,
  spacing = "8px",
  onClick,
}) => {
  return (
    // <Link href={url}>
    <Stack
      direction={text ? "row" : "column"}
      justifyContent="center"
      alignItems="center"
      gap={spacing}
      borderRadius={text ? "60px" : "50%"}
      width={text ? "auto" : `${width}px`}
      height={text ? "auto" : `${height}px`}
      padding={padding || (text ? "8px 24px" : "0")}
      bgcolor={bgcolor}
      sx={{
        color: textColor,
        cursor: "pointer",
        svg: {
          path: {
            fill: iconColor,
          },
        },
        "&:hover": {
          color: hoverTextColor,
          opacity: hoverOpacity,
          svg: {
            path: {
              fill: hoverIconColor,
            },
          },
        },
      }}
      onClick={onClick}
    >
      {startIcon}
      {text && (
        <Typography
          variant="medium"
          bold
          color="inherit"
          sx={{
            cursor: "inherit",
            fontSize: fontSize,
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </Typography>
      )}
      {icon}
    </Stack>
    // </Link>
  );
};

export default IconButton;
