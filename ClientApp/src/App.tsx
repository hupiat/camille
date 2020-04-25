import React from "react";
import NavMenu from "./components/SearchAppBar";
import Home from "./components/Home";
import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider,
} from "@material-ui/core/styles";

let theme = createMuiTheme({
	palette: {
		primary: {
			main: "#673AB7",
			light: "#D1C4E9",
			dark: "#512DA8",
		},
		secondary: {
			main: "#03A9F4",
			light: "#B3E5FC",
			dark: "#0288D1",
		},
	},
});

theme = responsiveFontSizes(theme);

export const App = () => (
	<ThemeProvider theme={theme}>
		<NavMenu />
		<Home />
	</ThemeProvider>
);

export default App;
