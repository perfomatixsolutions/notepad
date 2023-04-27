import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Login from './component/Login/login';
import Notepadinput from './component/notepad/notepadinput';
import { hasuraScreet, hasuraURL } from './hasuraConstant';

const client = new ApolloClient({
	uri: hasuraURL,
	cache: new InMemoryCache(),
	headers: {
		'x-hasura-admin-secret': hasuraScreet,
	},
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<Login />
				<Notepadinput />
			</div>
		</ApolloProvider>
	);
}

export default App;
