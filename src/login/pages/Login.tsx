import { useState, useReducer, useEffect } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { assert } from "keycloakify/tools/assert";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

import UrsorFadeIn from "../../../ui/UrsorFadeIn";
import { Stack } from "@mui/system";
import { PALETTE, Typography, UrsorButton } from "../../../ui";
import { LabeledInputField } from "../../../ui/labeled-input-field";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "../../../ui/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery"; // Corrected import

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const isMobile = useMediaQuery("(max-width:600px)");
    const { kcContext, i18n, doUseDefaultCss, classes } = props;
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, usernameHidden, login, messagesPerField } = kcContext;

    const { msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <>
            <Stack
                direction={isMobile ? "column" : "row"}
                alignItems={isMobile ? "center" : "flex-start"}
                justifyContent="center"
                height="100%"
                zIndex={2}
            >
                <Stack direction="row" height="100%" width="100%" justifyContent="center" alignItems={isMobile ? "center" : "flex-start"}>
                    {/* Adjust sign-in box */}
                    <Stack px="15%" height="100%" justifyContent="center">
                        <UrsorFadeIn duration={800}>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                sx={{
                                    position: "relative",
                                    left: isMobile ? "0px" : "-100px", // Adjust left position if mobile
                                    top: isMobile ? "-50px" : "-50px" // Adjust top position if mobile
                                }}
                            >
                                <IconButton
                                    startIcon={<ArrowBackIcon width="12px" height="12px" />}
                                    width={48}
                                    height={48}
                                    url="#"
                                    alt="Back"
                                    bgcolor={PALETTE.secondary.grey[2]}
                                />
                            </Stack>

                            <Stack
                                borderRadius="24px"
                                p="28px"
                                boxSizing="border-box"
                                justifyContent="center"
                                width={isMobile ? "280px" : "391px"}
                                boxShadow="0 0 63px #A594FF"
                                bgcolor="white"
                            >
                                <Stack alignItems="center" spacing="12px" width="100%">
                                    <Stack
                                        sx={{
                                            background: `linear-gradient(${PALETTE.secondary.purple[2]}, ${PALETTE.secondary.blue[2]})`,
                                            "-webkit-text-fill-color": "transparent",
                                            backgroundClip: "text",
                                            "-webkit-background-clip": "text"
                                        }}
                                    >
                                        <Typography variant="h5" bold color={PALETTE.secondary.purple[2]}>
                                            Sign in to Astrosafe
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        pb="20px"
                                        width={isMobile ? "150px" : "300px"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        sx={{ textAlign: "center" }}
                                    >
                                        <Typography variant="small">Log in to your account and start creating.</Typography>
                                    </Stack>
                                </Stack>

                                <form
                                    id="kc-form-login"
                                    onSubmit={() => {
                                        setIsLoginButtonDisabled(true);
                                        return true;
                                    }}
                                    action={url.loginAction}
                                    method="post"
                                >
                                    <Stack spacing="12px">
                                        <LabeledInputField label="Email">
                                            {!usernameHidden && (
                                                <div className={kcClsx("kcFormGroupClass")}>
                                                    <input
                                                        tabIndex={2}
                                                        id="username"
                                                        className={kcClsx("kcInputClass")}
                                                        name="username"
                                                        defaultValue={login.username ?? ""}
                                                        type="text"
                                                           placeholder="Input"
                                                        autoFocus
                                                        autoComplete="username"
                                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                                        style={{
                                                            backgroundColor: PALETTE.secondary.grey[1], // Light background color
                                                            border: "none", // Remove borders
                                                            borderRadius: "10px", // Rounded corners
                                                            padding: "12px", // Padding for space inside input
                                                            width: "90%",
                                                            outline: "none", // Remove focus outline
                                                            fontFamily: "inherit" // Inherit font family from the parent button styles
                                                        }}
                                                    />
                                                    {messagesPerField.existsError("username", "password") && (
                                                        <span
                                                            id="input-error"
                                                            className={kcClsx("kcInputErrorMessageClass")}
                                                            aria-live="polite"
                                                            dangerouslySetInnerHTML={{
                                                                __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </LabeledInputField>
                                        <LabeledInputField label="Password">
                                            <div className={kcClsx("kcFormGroupClass")}>
                                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                                    <input
                                                        tabIndex={3}
                                                        id="password"
                                                        className={kcClsx("kcInputClass")}
                                                        name="password"
                                                        placeholder="Password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                                        style={{
                                                            backgroundColor: "#F6F6F6", // Light background color
                                                            border: "none", // Remove borders
                                                            borderRadius: "10px", // Rounded corners
                                                            padding: "12px", // Padding for space inside input
                                                            width: "100%",
                                                            outline: "none", // Remove focus outline
                                                            fontFamily: "inherit" 
                                                        }}
                                                    />
                                                </PasswordWrapper>
                                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                                    <span
                                                        id="input-error"
                                                        className={kcClsx("kcInputErrorMessageClass")}
                                                        aria-live="polite"
                                                        dangerouslySetInnerHTML={{
                                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </LabeledInputField>
                                    </Stack>

                                    <Stack
                                        pt="16px"
                                        alignItems="center"
                                        spacing="10px"
                                        sx={{
                                            fontFamily: "inherit", // Inherit font family from the parent button styles
                                            background: "transparent", // Button input background is transparent so UrsorButton styles are visible
                                            color: "inherit", // Inherit text color from the parent button styles
                                            border: "none", // Remove borders
                                            outline: "none", // Remove default focus outline
                                            width: "100%", // Full width inside the parent button
                                            cursor: "pointer", // Change cursor on hover
                                            ".hover": { opacity: 0.6, transition: "0.2s" } // Add hover transition effect
                                        }}
                                    >
                                        <UrsorButton width="100%">
                                            <input
                                                type="submit"
                                                tabIndex={7}
                                                disabled={isLoginButtonDisabled}
                                                className={kcClsx(
                                                    "kcButtonClass",
                                                    "kcButtonPrimaryClass",
                                                    "kcButtonBlockClass",
                                                    "kcButtonLargeClass"
                                                )}
                                                name="login"
                                                id="kc-login"
                                                value={msgStr("doLogIn")}
                                                style={{
                                                    fontFamily: "inherit", // Inherit font family from the parent button styles
                                                    background: "transparent", // Button input background is transparent so UrsorButton styles are visible
                                                    color: "inherit", // Inherit text color from the parent button styles
                                                    border: "none", // Remove borders
                                                    outline: "none", // Remove default focus outline
                                                    width: "100%", // Full width inside the parent button
                                                    cursor: "pointer", // Change cursor on hover
                                                    transition: "background-color 0.2s, color 0.2s" // Add hover transition effect
                                                }}
                                            />
                                        </UrsorButton>
                                    </Stack>
                                </form>
                            </Stack>
                        </UrsorFadeIn>
                    </Stack>
                    <Stack flex={1} justifyContent="center" alignItems="center" sx={{ display: isMobile ? "none" : "flex" }}>
                        <Stack
                            height="90%"
                            width="100vh"
                            position="relative"
                            alignItems="center"
                            sx={{ top: "45px" }} // Adjust the top position to move downwards
                        >
                            <img
                                src="https://ursorassets.s3.eu-west-1.amazonaws.com/keycloakify_sign_in_image.png"
                                style={{ width: "100%", height: "100%", objectFit: "cover", position: "relative" }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);

        assert(passwordInputElement instanceof HTMLInputElement);

        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);

    return (
        <div className={kcClsx("kcInputGroup")} style={{ display: "flex", alignItems: "center" }}>
            {children}
            <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
                style={{ marginLeft: "8px", background: "none", border: "none", cursor: "pointer" }}
            >
                {isPasswordRevealed ? <VisibilityOff aria-hidden /> : <Visibility aria-hidden />}
            </button>
        </div>
    );
}
