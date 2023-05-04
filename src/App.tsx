import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './component/Login/login';
import { hasuraScreet, hasuraURL } from './hasuraConstant';
import SignUp from './component/Login/signup';

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
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login />}></Route>
						<Route path="signup" element={<SignUp />} />
					</Routes>
				</BrowserRouter>
			</div>
		</ApolloProvider>
	);
}

export default App;
