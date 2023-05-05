/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LoginWrapper } from './loginStyle';
import { Button, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import { GET_Notepad } from '../../graphql/queries';
import Notepadinput from '../notepad/notepadinput';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { loading, error, data } = useQuery(GET_Notepad);
	const [userlogin, setUserlogin] = useState(false);
	const [name, setName] = useState('');
	const [id, setId] = useState('');
	const [notes, setNotes] = useState('');

	if (loading) {
		return <div className="tasks">Loading...</div>;
	}
	if (error) {
		return <div className="tasks">Error!</div>;
	}

	const userDate = data?.notepad;
	const submitTask = () => {
		const todos = userDate.filter(
			(item: any) => item.username == username && item.password == password
		);
		console.log(todos, 'id');
		if (todos.length === 0) {
			alert('user name or password is wrong');
		}

		try {
			setName(todos.map((item: { username: string }) => item.username));
			setId(todos.map((item: { id: number }) => item.id));
			setNotes(todos.map((item: { notes: string }) => item.notes));
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
				<Notepadinput name={name} userId={id} notepad={notes} />
			)}
		</div>
	);
}

export default Login;
