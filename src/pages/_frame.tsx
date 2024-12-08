import {GetCoordsInUnitCircle} from '../utils/maths';
import {useEffect, useState} from 'react';

import githubImage from '../assets/github-white.png';
import linkedInImage from '../assets/linkedin-white.png';

export function Frame(props) {

    return (
        <div class="home">
            <header class="mb-big">
                <SillyTitle />
            </header>
            {props.children}
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
        setInterval(() => setTitleRedraw(Math.random()), 1000)
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

function ExternCTA({imgSrc, url, alt}) {
    return (
        <a href={url}>
            <img src={imgSrc} alt={alt} width={32} height={32} />
        </a>
    )
}