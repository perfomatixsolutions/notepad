import { gql } from '@apollo/client';

export const GET_Notepad = gql`
	query GetNotepad {
		notepad {
			notes
			username
			id
			password
		}
	}
`;

export const ADD_Notepad = gql`
	mutation InsertNotepad($notes: String!) {
		insert_notepad(objects: { notes: $notes }) {
			affected_rows
			returning {
				notes
				username
				id
				password
			}
		}
	}
`;

export const Sign_Up = gql`
	mutation InsertNotepad($username: String!, $password: String!) {
		insert_notepad(objects: { username: $username, password: $password }) {
			affected_rows
			returning {
				notes
				username
				id
			}
		}
	}
`;

export const EDIT_NOTES = gql`
	mutation ($id: Int!) {
		edit_notepad_by_pk(id: $id) {
			id
		}
	}
`;
