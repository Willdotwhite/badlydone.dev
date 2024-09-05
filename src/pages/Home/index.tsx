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
			<section id="profile" class="mb-mid">
				<h2>Hi there! I'm Will.</h2>
				<p>I'm a Principal Software Engineer at the BBC, working on the Search platform and the data science platform behind it.</p>
				<p>I also run the <b>findyourjam.team</b> website (previously the GMTK Team Finder) and am working on a 2d jigsaw puzzle game called Squarepinski.</p>
				<p>This site is still <code>v1.0.0</code> - I'm intending to write up a couple of small articles in the coming weeks!</p>
			</section>
			<section class="mb-mid">
				<ItemCard imgSrc={teamFinderLogo} title="findyourjam.team" subtitle="Open source team building tool" copy="A matchmaking website for game jammers that's run alongside the four biggest ever game jams on itch.io.\n2024 record: 39k logins, 1.3k posts, and more than 100k total searches!" url="https://findyourjam.team" />
				<ItemCard imgSrc={dotwogamesImage} title="dotwo.games" subtitle="My games jam projects and prototypes" copy="A collection of game jam entries and prototypes I didn't have time to finish before the baby arrived!\nExpect long term progress, and see my [soon-to-be-written] thoughts on overcoming prototyping woes!" url="https://dotwo.games" />
				<ItemCard imgSrc={squarepinskiImage} title="Squarepinski" subtitle="(Under development)" copy="A relaxed jigsaw puzzle game with square pieces. Our GMTK Game Jam 2024 entry, it placed #177 out of 7628.\nDevelopment is ongoing, with a Steam release planned for 2025. Click to play the demo!" url="https://dotwogames.itch.io/squarepinski" />
			</section>
			<footer>
				<ExternCTA imgSrc={githubImage} url="https://github.com/Willdotwhite/" alt="GitHub Profile" />
				<ExternCTA imgSrc={linkedInImage} url="https://www.linkedin.com/in/williampaulwhite/" alt="LinkedIn Profile" />
			</footer>
		</div>
	);
}

export function SillyTitle() {
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
			{copy.split("\\n").map(((line, index) => <p key={`line-${title}-${index}`} className="copy">{line}</p>))}
		</a>
	)
}

export function ExternCTA({imgSrc, url, alt}) {
	return (
		<a href={url}>
			<img src={imgSrc} alt={alt} width={32} height={32} />
		</a>
	)
}