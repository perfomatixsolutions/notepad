/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Typography, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';

import { GET_Notepad, ADD_Notepad } from '../../graphql/queries';

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

export default function Notepadinput() {
	const [notes, setNotes] = useState('');
	const [addTodo] = useMutation(ADD_Notepad, { update: updateCache });

	const submitTask = () => {
		addTodo({ variables: { notes } });
		setNotes('');
	};

	return (
		<div>
			<Grid container>
				<Grid item lg={3}></Grid>
				<Grid item lg={7}>
					<Stack direction="column" spacing={2}>
						<Typography>notes</Typography>
						<TextField
							placeholder="Add a new task"
							id="outlined-multiline-flexible"
							label="notes"
							value={notes}
							multiline
							rows={5}
							fullWidth
							onChange={(e) => setNotes(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === 'Enter') submitTask();
							}}
						/>
						<button onClick={submitTask}>added</button>
					</Stack>
				</Grid>
				<Grid item lg={2}>
					<Button variant="contained">logout</Button>
				</Grid>
			</Grid>
		</div>
	);
}
