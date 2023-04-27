import React from 'react';
import { LoginWrapper } from './loginStyle';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';

function Login() {
	return (
		<div>
			<Grid container>
				<Grid item lg={3}></Grid>
				<Grid item lg={6}>
					<LoginWrapper>
						<Stack direction="column" spacing={2}>
							<Typography>Login</Typography>
							<TextField
								id="outlined-multiline-flexible"
								label="Email"
								multiline
								rows={1}
								fullWidth
							/>
							<TextField
								id="outlined-multiline-flexible"
								label="Password"
								multiline
								rows={1}
								fullWidth
							/>
							<Button variant="contained">Login</Button>
						</Stack>
					</LoginWrapper>
				</Grid>
				<Grid item lg={3}></Grid>
			</Grid>
		</div>
	);
}

export default Login;
