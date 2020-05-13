import React, { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import Home from './components/Home';
import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@material-ui/core/styles';
import { WorkflowStep } from './types/Commons';
import SearchAppBar from './components/SearchAppBar';

let theme = createMuiTheme({
	palette: {
		primary: {
			main: '#673AB7',
			light: '#D1C4E9',
			dark: '#512DA8',
		},
		secondary: {
			main: '#0d47a1',
			light: '#5472d3',
			dark: '#002171',
		},
	},
});

theme = responsiveFontSizes(theme);

export const App = () => {
	const [query, setQuery] = useState<string>('');
	const [workflow, setWorkflow] = useState<WorkflowStep>('reading');

	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				maxSnack={5}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
			>
				<SearchAppBar
					query={query}
					onSearch={setQuery}
					willShow={workflow !== 'drawing' && workflow !== 'adding'}
				/>

				<Home query={query} workflow={workflow} setWorkflow={setWorkflow} />
			</SnackbarProvider>
		</ThemeProvider>
	);
};

export default App;
