import React from "react";
import UrsorFadeIn from "../../../ui/UrsorFadeIn";
import { Stack } from "@mui/system";
import { useState } from "react";
import { PALETTE, Typography, UrsorButton, UrsorInputField } from "../../../ui";
import { LabeledInputField } from "../../../ui/labeled-input-field";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "../../../ui/IconButton";

const MobileActualLoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Stack direction="column" spacing={12} alignItems="center">
        <Stack direction="row" justifyContent="flex-start" width="100%">
          <IconButton
            startIcon={<ArrowBackIcon width="12px" height="12px" />}
            width={48}
            height={48}
            url="#"
            alt="Back"
            bgcolor={PALETTE.secondary.grey[1]}
          />
        </Stack>

        <Stack
          height="100%"
          justifyContent="center"
          alignItems="center"
          zIndex={2}
        >
          <UrsorFadeIn duration={800}>
            <Stack
              bgcolor="rgb(255,255,255)"
              borderRadius="24px"
              p="28px"
              boxSizing="border-box"
              justifyContent="center"
              width="100%"
              boxShadow="0 0 30px #A594FF"
            >
              <Stack alignItems="center" spacing="12px" width="100%">
                <Stack
                  sx={{
                    background: `linear-gradient(${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
                    "-webkit-text-fill-color": "transparent",
                    backgroundClip: "text",
                    "-webkit-background-clip": "text",
                  }}
                >
                  <Typography variant="h5" color={PALETTE.secondary.purple[2]}>
                    Sign in to Astrosafe
                  </Typography>
                </Stack>
                <Stack pb="20px" width="250px" sx={{ textAlign: "center" }}>
                  <Typography variant="small">
                    Log in to your account and start creating.
                  </Typography>
                </Stack>
              </Stack>
              
              <Stack spacing="12px">
                <LabeledInputField label="Email">
                  <UrsorInputField
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(event.target.value)
                    }
                    placeholder="Enter your email"
                    width="100%"
                    leftAlign
                  />
                </LabeledInputField>
                <LabeledInputField label="Password">
                  <UrsorInputField
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(event.target.value)
                    }
                    placeholder="Enter your password"
                    width="100%"
                    leftAlign
                  />
                </LabeledInputField>
              </Stack>
              <Stack pt="16px" alignItems="center" spacing="10px">
                <UrsorButton width="100%" onClick={() => null}>
                  Sign in
                </UrsorButton>
                <Stack direction="row" spacing="6px">
                  <Typography>{`Don't have an account?`}</Typography>
                  <Stack
                    sx={{
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": { opacity: 0.6 },
                    }}
                  >
                    <Typography bold color={PALETTE.secondary.purple[2]}>
                      Sign up
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </UrsorFadeIn>
        </Stack>
      </Stack>
    </Stack>
  );
};


const SignInPageMobileBody: React.FC = () => {

  return (
    <Stack overflow="scroll" p="24px" height="100%" zIndex={2}>
      <MobileActualLoginView />
    </Stack>
  );
};

export default SignInPageMobileBody;
