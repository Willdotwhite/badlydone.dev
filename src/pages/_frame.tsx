import {GetCoordsInUnitCircle} from '../utils/maths';
import {useEffect, useState} from 'react';

import githubImage from '../assets/github-white.png';
import linkedInImage from '../assets/linkedin-white.png';
import {RingEntry} from '../components/types';

export function Frame(props) {
    const [ringData, setRingData] = useState<RingEntry[]>([]);
    const [leftRing, setLeftRing] = useState<RingEntry>();
    const [rightRing, setRightRing] = useState<RingEntry>();

    useEffect(() => {
        const possibleData = window.sessionStorage.getItem('ringData');
        if (possibleData) {
            setRingData(JSON.parse(possibleData));
            return;
        }

        fetch('https://willdotwhite.github.io/webring/data.json')
            .then(async res => setRingData(await res.json()));
    }, []);

    useEffect(() => {
        if (!ringData) return;

        window.sessionStorage.setItem('ringData', JSON.stringify(ringData));

        function shuffle(array: any[], seed: number) {
            let m: any = array.length, t: any, i: number;

            // While there remain elements to shuffle…
            while (m) {

                // Pick a remaining element…
                i = Math.floor(random(seed) * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
                ++seed;
            }

            return array;
        }

        function random(seed: number) {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        }

        const rightNow = new Date();
        const dayString = rightNow.toISOString().slice(0, 10).replace(/-/g, '');
        const shuffledArray = shuffle(ringData.filter(el => !el.url.includes('badlydone.dev')), parseInt(dayString));
        setLeftRing(shuffledArray[0]);
        setRightRing(shuffledArray[shuffledArray.length - 1]);

    }, [ringData]);

    return (
        <div class="home">
            <header class="mb-mid">
                <SillyTitle />
            </header>
            <hr className="mb-mid" />
            {props.children}
            <hr className="mb-small"/>

            <div className="mb-small">
                <h3>Part of the unofficial GMTK Webring!</h3>
                <p>
                    {leftRing && (
                        <a style={{width: '50%', display: 'inline-block'}} href={leftRing.url}>
                            <span style={{fontWeight: 'bold'}}>&larr; {leftRing.name} </span><br/>
                            {leftRing.description}
                        </a>
                    )}
                    {rightRing && (
                        <a style={{width: '50%', display: 'inline-block'}} href={rightRing.url}>
                            <span style={{fontWeight: 'bold'}}>{rightRing.name} &rarr;</span><br/>
                            {rightRing.description}
                        </a>
                    )}
                </p>
            </div>

            <footer>
                <ExternCTA imgSrc={githubImage} url="https://github.com/Willdotwhite/" alt="GitHub Profile" />
                <ExternCTA imgSrc={linkedInImage} url="https://www.linkedin.com/in/williampaulwhite/"
                           alt="LinkedIn Profile" />
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
