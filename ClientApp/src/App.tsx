import React, { useState } from "react";
import SearchAppBar from "./components/SearchAppBar";
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

export const App = () => {
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const [query, setQuery] = useState<string>("");

	return (
		<ThemeProvider theme={theme}>
			<SearchAppBar query={query} onSearch={setQuery} isVisible={!isDrawing} />
			<Home query={query} />
		</ThemeProvider>
	);
};

export default App;
