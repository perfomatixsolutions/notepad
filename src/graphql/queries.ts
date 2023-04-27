import { gql } from '@apollo/client';

export const GET_Notepad = gql`
	query GetNotepad {
		notepad {
			notes
			userName
			id
			createAt
			completed
		}
	}
`;

export const ADD_Notepad = gql`
	mutation InsertNotepad($notes: String!) {
		insert_notepad(objects: { notes: $notes }) {
			affected_rows
			returning {
				notes
				userName
				id
				createAt
				completed
			}
		}
	}
`;

export const edit_notes = gql`
	query GetNotepad {
		notepad_by_pk(id: 1) {
			id
			notes
			userName
			createAt
			completed
		}
	}
`;
