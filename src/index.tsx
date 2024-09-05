import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';

import { Home } from './pages/Home';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import {useEffect, useState} from 'react';
import {SimpleGitIntro} from './pages/Articles/SimpleGitIntro';

export function App() {
	const [timeAsHex, setTimeAsHex] = useState(getTimeAsHex())

	useEffect(() => {
		setInterval(() => setTimeAsHex(getTimeAsHex()), 1000)
	}, []);

	useEffect(() => {
		document.getElementById('app').style.backgroundColor = timeAsHex
	}, [timeAsHex]);

	function getTimeAsHex() {
		const date = new Date();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		return `#${hours}${minutes}${seconds}`;
	}

	return (
		<LocationProvider>
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/simple-intro-to-git" component={SimpleGitIntro} />
					<Route default component={NotFound} />
				</Router>
				<p style={{fontSize: `0.75rem`}}>The current time colour is: {getTimeAsHex()}</p>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
