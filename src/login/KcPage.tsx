import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
// import Template from "./Template";
import { tss } from "tss-react/mui";
import { createTheme, ThemeProvider } from "@mui/material";
import backgroundJpgUrl from "./assets/background.png";
const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const Template = lazy(() => import("./Template"));
const DefaultTemplate = lazy(() => import("keycloakify/login/Template"));

const doMakeUserConfirmPassword = true;
const Login = lazy(() => import("./pages/Login"));
const theme = createTheme({
    palette: {
        mode: "dark"
    }
});
const fontUrl =
    "https://fonts.googleapis.com/css2?family=Rubik:wght@450;900&display=swap";

export default function KcPage(props: { kcContext: KcContext }) {
    return (
        <ThemeProvider theme={theme}>
            <link href={fontUrl} rel="stylesheet" />
            <KcPageContextualized {...props} />
        </ThemeProvider>
    );
}

function KcPageContextualized(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });
    const { classes } = useStyles();

    return (
        <div style={{ margin: 0, padding: 0 }} className={classes.kcBodyClass}>
            <Suspense>
                {(() => {
                    switch (kcContext.pageId) {
                        case "login.ftl":
                            return (
                                <Login
                                    {...{ kcContext, i18n, classes }}
                                    Template={Template}
                                    doUseDefaultCss={true}
                                />
                            );
                        default:
                            return (
                                <DefaultPage
                                    kcContext={kcContext}
                                    i18n={i18n}
                                    classes={classes}
                                    Template={DefaultTemplate}
                                    doUseDefaultCss={true}
                                    UserProfileFormFields={UserProfileFormFields}
                                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                                />
                            );
                    }
                })()}
            </Suspense>
        </div>
    );
}
const useStyles = tss.create(
    ({ theme }) =>
        ({
            kcHtmlClass: {
                ".root": {
                    colorScheme: "dark",
                    height: "100%",
                    width: "100%"
                }
            },
            kcBodyClass: {
                height: "100%",
                width: "100%",
                color: theme.palette.text.primary,
                background: `url(${backgroundJpgUrl}) no-repeat center center fixed`,
                backgroundSize: "100vw 100vh",
                margin: 0,
                padding: 0, 
                fontFamily: "Rubik, sans-serif",
                fontWeight: "bold",
                overflow: "hidden", 
                "-webkit-overflow-scrolling": "touch", 
                "&.kcHideScrollbar": {
                    "&::-webkit-scrollbar": {
                        display: "none" 
                    }
                }
            }
        }) satisfies { [key in ClassKey]?: unknown }
);
