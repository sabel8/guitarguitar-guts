import Container from '@mui/material/Container';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, Stack } from '@mui/material';
import { Header } from './Header';

interface IProps {
}

@observer
export class Home extends React.Component<IProps> {
	render() {
		return (
			<ThemeProvider theme={{}}>
				<CssBaseline />
				<Header />
				<Container maxWidth={'sm'} sx={{ margin: '16pt auto' }}>
					<Stack spacing={2}>
						
					</Stack>
				</Container>
			</ThemeProvider>
		);
	}
}
