/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LoginWrapper } from './loginStyle';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { GET_Notepad, Sign_Up } from '../../graphql/queries';

const updateCache = (
	cache: {
		readQuery: (arg0: { query: any }) => any;
		writeQuery: (arg0: { query: any; data: { notepad: any[] } }) => void;
	},
	{ data }: any
) => {
	const existingNotepad = cache.readQuery({
		query: GET_Notepad,
	});

	const newNotepad = data.insert_notepad;
	console.log(existingNotepad);
	cache.writeQuery({
		query: GET_Notepad,
		data: { notepad: [...existingNotepad.notepad, newNotepad] },
	});
};
function SignUp() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [Login] = useMutation(Sign_Up, { update: updateCache });
	const navigate = useNavigate();
	const submitTask = () => {
		Login({ variables: { username, password } });
		setPassword('');
		setUsername('');

		try {
			Login({ variables: { username, password } });
			setPassword('');
			setUsername('');
			navigate('/');
		} catch (error) {
			console.error('Something bad happened');
			console.error(error);
		}
	};
	return (
		<div>
			<Grid container>
				<Grid item lg={3}></Grid>
				<Grid item lg={6}>
					<LoginWrapper>
						<Stack direction="column" spacing={2}>
							<Typography>Sign Up here</Typography>

							<TextField
								id="outlined-multiline-flexible"
								label="username"
								multiline
								rows={1}
								fullWidth
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<TextField
								id="outlined-multiline-flexible"
								label="Password"
								multiline
								rows={1}
								fullWidth
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Button variant="contained" onClick={submitTask}>
								Sign Up
							</Button>
						</Stack>
					</LoginWrapper>
				</Grid>
				<Grid item lg={3}></Grid>
			</Grid>
		</div>
	);
}

export default SignUp;
