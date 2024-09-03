import './style.css';
import {GetCoordsInUnitCircle} from '../../utils/maths';
import {useEffect, useState} from 'react';

import teamFinderLogo from '../../assets/team-finder-logo.png';
import dotwogamesImage from '../../assets/dotwogames-logo.png';
import squarepinskiImage from '../../assets/squarepinski-logo.png';
import githubImage from '../../assets/github-white.png';
import linkedInImage from '../../assets/linkedin-white.png';

export function Home() {

	return (
		<div class="home">
			<header class="mb-big">
				<SillyTitle />
			</header>
			<section class="mb-mid">
				<ItemCard imgSrc={teamFinderLogo} title="findyourjam.team" subtitle="Open source team building tool" copy="A sidecar website that's helped jammers on the four biggest ever game jams on itch.io. Just promise me you won't read the source code." url="https://findyourjam.team" />
				<ItemCard imgSrc={dotwogamesImage} title="dotwo.games" subtitle="Mostly terrible games, but who's counting?" copy="It's full of jam games and Unity projects I never figured out how to finish. I have a better system now, but absolutely no time to do gamedev with a baby in the house." url="https://dotwo.games" />
				<ItemCard imgSrc={squarepinskiImage} title="Squarepinski" subtitle="My one good game (Under development)" copy="A jigsaw puzzle with square pieces. Actually the best game I've ever made. Don't look at the source code for this either. Steam release 2025" url="https://dotwogames.itch.io/squarepinski" />
			</section>
			<footer>
				<ExternCTA imgSrc={githubImage} url="https://github.com/Willdotwhite/" alt="GitHub Profile" />
				<ExternCTA imgSrc={linkedInImage} url="https://www.linkedin.com/in/williampaulwhite/" alt="LinkedIn Profile" />
			</footer>
		</div>
	);
}

function SillyTitle() {
	const [titleRedraw, setTitleRedraw] = useState(Math.random());

	useEffect(() => {
		setInterval(() => setTitleRedraw(Math.random()), 5000)
	}, [])

	function SillyTitleLetter({char}) {
		const coords = GetCoordsInUnitCircle()
		const angleRange = 15;
		const angle = -angleRange + (Math.random() * angleRange * 2);
		const scale = 2.5;

		return (
			<span
				data-redraw-key={titleRedraw}
				style={{
					display: 'inline-block',
					paddingTop: `${coords.y * scale}px`,
					paddingRight: `${-coords.x * scale}px`,
					transform: `rotate(${angle}deg)`
				}}
			>
				<span>{char}</span>
			</span>
		)
	}

	return (
		<h1 id="silly-title">
			{'badlydone.dev'.toUpperCase().split('').map((char, index) =>
				<SillyTitleLetter key={`st-${char}-${index}`} char={char} />
			)}
		</h1>
	)
}

function ItemCard({imgSrc, title, subtitle, copy, url}) {
	return (
		<a href={url}>
			<div style={{margin: '0 auto', width: '240px', height: '180px', overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
				<img src={imgSrc} alt={title} height={180} />
			</div>
			<h2>{title}</h2>
			<h3>{subtitle}</h3>
			<p class="copy">{copy}</p>
		</a>
	)
}

function ExternCTA({imgSrc, url, alt}) {
	return (
		<a href={url}>
			<img src={imgSrc} alt={alt} width={32} height={32} />
		</a>
	)
}