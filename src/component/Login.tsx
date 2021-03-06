import React from 'react';
import {Button, TextField} from "@material-ui/core";
import {UserCredentials} from "../model/UserCredentials";
import AuthenticationService from "../service/AuthenticationService";
import translate from "../i18n/translate";

type Props = {
	onLogin(): void;
}

const Login: React.FC<Props> = ({onLogin}) => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const login = () => {
		const user = {username: username, password: password} as UserCredentials;
		AuthenticationService.login(user)
			.then(res => {
				const jwtToken = res.headers.authorization;
				if (jwtToken !== null) {
					AuthenticationService.registerLogin(username, jwtToken);
					onLogin();
				}
			})
			.catch(err => console.error(err)) // TODO show proper error message
	};

	return (
		<div>
			<TextField
				autoFocus
				id="username"
				label={translate({id: 'username'})}
				type="text"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<br/>
			<TextField
				id="password"
				label={translate({id: 'password'})}
				type="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<br/>
			<Button onClick={login} color="primary">{translate({id: 'login'})}</Button>
		</div>
	);
};

export default Login;
