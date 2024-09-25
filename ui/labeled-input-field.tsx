import { Stack } from "@mui/material";
import { PALETTE } from "./palette";
import { Typography } from "./typography";
import React from "react";

export function LabeledInputField(props: {
  label?: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Stack spacing="6px">
      {props.label ? (
        <Typography variant="small" color={PALETTE.secondary.grey[4]}>
          {props.label}
        </Typography>
      ) : null}
      {props.children}
    </Stack>
  );
}
