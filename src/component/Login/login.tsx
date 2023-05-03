import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { LoginWrapper } from './loginStyle';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import {
	ADD_Notepad,
	EDIT_NOTES,
	GET_Notepad,
	Sign_Up,
} from '../../graphql/queries';
import Notepadinput from '../notepad/notepadinput';

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

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [Login] = useMutation(Sign_Up, { update: updateCache });
	const { loading, error, data } = useQuery(GET_Notepad);
	const [userdetails, setUserDetails] = useState([]);
	const [userlogin, setUserlogin] = useState(false);
	const [name, setName] = useState('');

	if (loading) {
		return <div className="tasks">Loading...</div>;
	}
	if (error) {
		return <div className="tasks">Error!</div>;
	}

	const userDate = data?.notepad;
	const userNameData = data.notepad.map((item: any) => item.username);
	const submitTask = () => {
		const todos = userDate.filter(
			(item: any) => item.username == username && item.password == password
		);
		console.log(todos, 'id');
		if (todos.length === 0) {
			alert('user name or password is wrong');
		}

		try {
			setUserDetails(todos);
			setName(todos.map((item: { username: string }) => item.username));
			console.log();
			setUserlogin(true);
			setPassword('');
			setUsername('');
		} catch (error) {
			console.error('Something bad happened');
			console.error(error);
		}
	};
	return (
		<div>
			{userlogin === false ? (
				<Grid container>
					<Grid item lg={3}></Grid>
					<Grid item lg={6}>
						<LoginWrapper>
							<Stack direction="column" spacing={2}>
								<Typography>Login</Typography>

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
									Login
								</Button>
								<Link to="/signup">sing up for new user</Link>
							</Stack>
						</LoginWrapper>
					</Grid>
					<Grid item lg={3}></Grid>
				</Grid>
			) : (
				<Notepadinput
					name={name}
					// id={userdetails.id}
					// notepad={userdetails.notes}
				/>
			)}
		</div>
	);
}

export default Login;
