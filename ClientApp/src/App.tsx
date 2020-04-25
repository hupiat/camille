import React, { useState } from "react";
import { SnackbarProvider } from "notistack";
import Home from "./components/Home";
import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider,
} from "@material-ui/core/styles";
import SearchAppBar from "./components/SearchAppBar";

let theme = createMuiTheme({
	palette: {
		primary: {
			main: "#673AB7",
			light: "#D1C4E9",
			dark: "#512DA8",
		},
		secondary: {
			main: "#880e4f",
			light: "#bc477b",
			dark: "#560027",
		},
	},
});

theme = responsiveFontSizes(theme);

export const App = () => {
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const [query, setQuery] = useState<string>("");

	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				maxSnack={5}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				draggable
			>
				<SearchAppBar
					query={query}
					onSearch={setQuery}
					isVisible={!isDrawing}
				/>
				<Home query={query} isDrawing={isDrawing} setIsDrawing={setIsDrawing} />
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default App;
