import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';

import { Home } from './pages/Home';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import {useEffect, useState} from 'react';

export function App() {
	const [timeAsHex, setTimeAsHex] = useState(getTimeAsHex())

	useEffect(() => {
		setInterval(() => setTimeAsHex(getTimeAsHex()), 1000)
	}, []);

	useEffect(() => {
		document.getElementById('app').style.backgroundColor = timeAsHex
	}, [timeAsHex]);

	function getTimeAsHex() {
		return `#${new Date().toLocaleTimeString().replaceAll(":", "")}`;
	}

	return (
		<LocationProvider>
			<main>
				<Router>
					<Route path="/" component={Home} />
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
