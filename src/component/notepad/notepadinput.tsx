/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';

import { GET_Notepad, ADD_Notepad } from '../../graphql/queries';
import Login from '../Login/login';

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
	cache.writeQuery({
		query: GET_Notepad,
		data: { notepad: [...existingNotepad.notepad, newNotepad] },
	});
};
interface Props {
	name: string;
	userId: string;
	notepad: string;
}
const Notepadinput: React.FC<Props> = ({ name, userId, notepad }) => {
	console.log(name);
	const [newnotes, setNewNotes] = useState(notepad);
	const [addTodo] = useMutation(ADD_Notepad, { update: updateCache });
	const [logout, setLogout] = useState(false);

	const submitTask = () => {
		const notes = newnotes.toString();
		console.log(newnotes);
		const id = userId.toString();

		addTodo({ variables: { notes, id } });
	};
	return (
		<div>
			{logout === true ? (
				<Login />
			) : (
				<Grid container>
					<Grid item lg={3}></Grid>
					<Grid item lg={7}>
						<Stack direction="column" spacing={2}>
							<Typography>Hi,{name} write you notes here</Typography>
							<TextField
								id="outlined-helperText"
								value={newnotes}
								multiline
								rows={5}
								fullWidth
								onChange={(e) => setNewNotes(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === 'Enter') submitTask();
								}}
							/>

							<button onClick={submitTask}>added</button>
						</Stack>
					</Grid>

					<Grid item lg={2}>
						<Button variant="contained" onClick={() => setLogout(true)}>
							logout
						</Button>
					</Grid>
				</Grid>
			)}
		</div>
	);
};
export default Notepadinput;
