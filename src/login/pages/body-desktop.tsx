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

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    // const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;
    const { url, usernameHidden, login, messagesPerField } = kcContext;

    const { msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    return (
        <>
            <Stack direction="row" height="100%" zIndex={2}>
                {/* Adjust sign-in box */}
                <Stack px="15%" height="100%" justifyContent="center">
                    <UrsorFadeIn duration={800}>
                        <Stack direction="row" justifyContent="flex-start" sx={{ position: "relative", left: "-150px", top: "-100px" }}>
                            <IconButton
                                startIcon={<ArrowBackIcon width="12px" height="12px" />}
                                width={48}
                                height={48}
                                url="#"
                                alt="Back"
                                bgcolor={PALETTE.secondary.grey[4]}
                            />
                        </Stack>

                        <Stack
                            bgcolor="#ffffff"
                            borderRadius="24px"
                            p="28px"
                            boxSizing="border-box"
                            justifyContent="center"
                            width="491px"
                            boxShadow="0 0 63px #A594FF"
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
                                <Stack pb="8px" width="100px" sx={{ textAlign: "center" }}>
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
                                                    autoFocus
                                                    autoComplete="username"
                                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                                    style={{
                                                        backgroundColor: PALETTE.secondary.grey[2], // Light background color
                                                        border: "none", // Remove borders
                                                        borderRadius: "10px", // Rounded corners
                                                        padding: "12px", // Padding for space inside input
                                                        width: "100%",
                                                        outline: "none" // Remove focus outline
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
                                                    type="password"
                                                    autoComplete="current-password"
                                                    aria-invalid={messagesPerField.existsError("username", "password")}
                                                    style={{
                                                        backgroundColor: "#F6F6F6", // Light background color
                                                        border: "none", // Remove borders
                                                        borderRadius: "10px", // Rounded corners
                                                        padding: "12px", // Padding for space inside input
                                                        width: "100%",
                                                        outline: "none" // Remove focus outline
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

                                <Stack pt="16px" alignItems="center" spacing="10px">
                                    <UrsorButton
                                        width="100%"
                                        backgroundColor="#312865" // Dark purple background
                                    >
                                        <input
                                            type="submit"
                                            tabIndex={7}
                                            disabled={isLoginButtonDisabled}
                                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                            name="login"
                                            id="kc-login"
                                            value={msgStr("doLogIn")}
                                            style={{
                                                background: "transparent", // Button input background is transparent so UrsorButton styles are visible
                                                color: "inherit", // Inherit text color from the parent button styles
                                                border: "none", // Remove borders
                                                outline: "none", // Remove default focus outline
                                                width: "100%", // Full width inside the parent button
                                                cursor: "pointer" // Change cursor on hover
                                            }}
                                        />
                                    </UrsorButton>
                                </Stack>
                            </form>
                        </Stack>
                    </UrsorFadeIn>
                </Stack>
                <Stack flex={1} justifyContent="center" alignItems="center">
                    <Stack height="90%" width="110vh" position="relative" alignItems="center">
                        <img
                            src="https://ursorassets.s3.eu-west-1.amazonaws.com/keycloakify_sign_in_image.png"
                            width={697}
                            height={652}
                            style={{ position: "relative" }}
                        />
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
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
                style={{
                    backgroundColor: "transparent", 
                    border: "none", 
                    cursor: "pointer" 
                }}
            >
                <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
            </button>
        </div>
    );
}
