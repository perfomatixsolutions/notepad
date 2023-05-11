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
interface Props {
	name: string;
	userId: string;
	notepad: string;
}
const Notepadinput: React.FC<Props> = ({ name, userId, notepad }) => {
	const [newnotes, setNewNotes] = useState(notepad);
	const [addTodo] = useMutation(ADD_Notepad, { update: updateCache });

	const submitTask = () => {
		const notes = newnotes.toString();
		const id = userId.toString();
		try {
			addTodo({ variables: { notes, id } });
		} catch (error) {
			console.error('Something bad happened');
			console.error(error);
		}
	};

	const refresh = () => {
		window.location.reload();
	};

	return (
		<div>
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
							onKeyUp={submitTask}
						/>
					</Stack>
				</Grid>

				<Grid item lg={2}>
					<Button variant="contained" onClick={() => refresh()}>
						logout
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};
export default Notepadinput;
