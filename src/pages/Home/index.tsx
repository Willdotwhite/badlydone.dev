import '../style.css';

import teamFinderLogo from '../../assets/team-finder-logo.png';
import dotwogamesImage from '../../assets/dotwogames-logo.png';
import squarepinskiImage from '../../assets/squarepinski-logo.png';
import {Frame} from '../_frame';
import {ItemCard} from '../utils';
import howToBuildSoftware from '../../assets/presentations/how-to-build-software__image.png';
import howToBuildSoftwarePdf from '../../assets/presentations/how-to-build-software--UoS-Q4-2024__web.pdf';

export function Home() {

	return (
		<Frame>
			<section id="profile" class="mb-mid">
				<h2>Hi there! I'm Will.</h2>
				<p>I'm a Principal Software Engineer at the BBC, working on the Search platform and the data science
					platform behind it.</p>
				<p>I also run the <b>findyourjam.team</b> website (previously the GMTK Team Finder) and am working on a
					2d jigsaw puzzle game called Squarepinski.</p>
				<p>This site is still <code>v1.0.0</code> - I'm intending to write up a couple of small articles in the
					coming weeks!</p>
			</section>
			<section class="mb-mid">
				<ItemCard imgSrc={teamFinderLogo} title="findyourjam.team" subtitle="Open source team building tool"
						  copy="A matchmaking website for game jammers that's run alongside the four biggest ever game jams on itch.io.\n2024 record: 39k logins, 1.3k posts, and more than 100k total searches!"
						  url="https://findyourjam.team" />
				<ItemCard imgSrc={dotwogamesImage} title="dotwo.games" subtitle="My games jam projects and prototypes"
						  copy="A collection of game jam entries and prototypes I didn't have time to finish before the baby arrived!\nExpect long term progress, and see my [soon-to-be-written] thoughts on overcoming prototyping woes!"
						  url="https://dotwo.games" />
				<ItemCard imgSrc={squarepinskiImage} title="Squarepinski" subtitle="(Under development)"
						  copy="A relaxed jigsaw puzzle game with square pieces. Our GMTK Game Jam 2024 entry, it placed #177 out of 7628.\nDevelopment is ongoing, with a Steam release planned for 2025. Click to play the demo!"
						  url="https://dotwogames.itch.io/squarepinski" />
			</section>

			<hr className="mb-mid" />

			<h2>Other Bits</h2>
			<p>I'm also using this site as a bit of a playground for other bits - why not take a look?</p>
			<section class="mb-mid two-ply">
				<ItemCard imgSrc="/articles/number-of-votes-per-theme.png" title="Latest article"
						  subtitle="I Don't Understand Data Science"
						  copy={'How we determined the GMTK Patron Jam theme for 2024!\\nContent warning: contains extremely poor data science.'}
						  url="/articles/voting-data-science" />
				<ItemCard
					imgSrc={howToBuildSoftware}
					title={'Latest talk'}
					subtitle={'How to build software (University of Sheffield, CompSci Department)'}
					copy={'50% general software development skills, 50% prep for the upcoming Software Hut group project.\\nGiven November 2024.'}
					url={howToBuildSoftwarePdf}
					download={'how-to-build-software--UoS-Q4-2024__web.pdf'} />
			</section>
		</Frame>
	);
}
