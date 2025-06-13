import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';

import { Home } from './pages/Home';
import { NotFound } from './pages/_404.jsx';
import {Presentations} from './pages/Presentations';
import {Article} from './pages/Articles/Article';
import {Footer} from './pages/_footer';
import {Redirect} from './pages/redirect';
import './style.css';

export function App() {
	return (
		<LocationProvider>
			<main>
				<Router>
					<Route path="/google-form-redirect" component={Redirect} />
					<Route path="/" component={Home} />
					<Route path="/presentations" component={Presentations} />
					<Route path="/articles/voting-data-science" component={Article} />
					<Route default component={NotFound} />
				</Router>
				<Footer />
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
