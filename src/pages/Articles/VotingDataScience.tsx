import {Frame} from '../_frame';
import {CollapsableSidebar} from './_common';
import './articles.css'

export const VotingDataScience = () => {

    return (
        <Frame>
            <article style={{textAlign: "left"}}>
                <h1 id="data-science-experiment">My First Data Science Experiment</h1>
                <p style={{textAlign: "center"}}>Why a home-rolled voting system for ~150 people finally made me learn some data science basics.</p>


                <h2 id="i-dont-understand-data-science">I Don't Understand Data Science</h2>
                <p>Data Science: I don't know how to do it. I get the concepts, I have a hazy memory of various
                    statistics classes from a decade or two ago, and I've even brushed up on how a lot of the tech
                    required for a machine learning platform to run models and perform inference at scale.</p>
                <p>But I don't know how to <em>do</em> the Data Science process; with programming tasks, I've
                    understand how to break down work into smaller chunks, and I have a (for wont of a better word) vibe for
                    what does and doesn't make sense. I can look at the debugger and have a feel for if something
                    doesn't add up. I have no idea how to look at the results of some ✨ maths ✨ and
                    think "Ok, this does(n't) make sense, so next I'll do..." something, I guess.</p>
                <p>And I want to learn that - my team is building out a Data Science platform from scratch, and I'd love
                    to have more than just a theoretical understanding of how this all works. I don't expect to be
                    writing any of the actual model logic itself - something would have to go _very_ wrong for that to happen! - but I'd love to be able to ask much more insightful questions
                    if I had some experience with the process of getting to an answer.</p>
                <p>So let's remedy that shall we?</p>


                <h2 id="the-game-makers-toolkit-patron-jam">The Game Maker's Toolkit Patron Jam</h2>
                <p>I'm a member of the amazing Game Maker's Toolkit (GMTK) Patron community on Discord. This
                    December the community are running a seven day game jam (think 'hackathon where everyone makes a
                    game to a theme'), with a theme voted for by the community - and, uhh, picked by me!</p>
                <p>Link: <a href="https://itch.io/jam/gmtk-patreon-2024">https://itch.io/jam/gmtk-patreon-2024</a></p>
                <p>Well, that's not quite right; I've been running the theme submission/voting website (on this very
                    site! <a href="https://themes.badlydone.dev/">https://themes.badlydone.dev/</a>), and because I
                    won't be participating in the jam itself I'll be the one to announce which theme has won the
                    voting. I won't be picking my favourite theme or anything, just announcing which theme was the
                    best as decided by community voting.</p>
                <p>One small problem: the voting system we picked was... suboptimal.</p>
                <p>We allowed everything to submit up to three themes - come the end of the submission window, we have 223
                    themes under consideration. We build a ranked voting system where every participant gets a
                    deterministically random set of ten themes from the pool, and they rank them from best to worst.</p>
                <p>[NOTE: Detail on how voting works]</p>

                <CollapsableSidebar title="What Do You Mean By 'Theme' Anyway?">
                <p>The theme for a game jam is the inspiration for the games that people are making - it can be basically
                    anything, but the best themes straddle the line between "vague enough to give developers creative
                    control" and "limiting enough that it inspires creativity".</p>
                <p>For reference, here are the last few themes the annual GMTK jam has used:</p>
                <ul>
                    <li>Built to Scale</li>
                    <li>Roles Reversed</li>
                    <li>Roll of the Dice</li>
                    <li>Joined Together</li>
                    <li>Out of Control</li>
                </ul>
                <p>These are all solid themes! Each one has a nugget of inspiration for where your game might go, but
                    they're not so prescriptive that you have to make a game in a specific lane or with specific
                    concerns (the much maligned GGJ 2024 theme "Make Me Laugh" is an example of this; to adhere to
                    the theme, you game might need some element of comedic writing, which is one hell of a restriction).</p>
                <p>So as humans with human brains here, we can evaluate our nascent Data Science efforts by judging the top
                    themes from our experiments to judge if they're in the sweet spot of "not too vague to be
                    meaningless" and "not too specific to limit freedom".</p>
                </CollapsableSidebar>

                <h3 id="data-problem-1-we-had-120-people-voting-on-240-themes">Data Problem #1: We had ~120 people voting on
                    ~240 themes</h3>
                <p>By limiting users to 10 themes to vote across, we've massively limited how many votes each theme can
                    get. For the 200+ themes in the pool, the most votes a specific theme got was <em>10</em>.</p>
                <p>The average number of votes each theme got was XXX.</p>
                <p>As you might imagine, this left me with some pretty suspect numbers. </p>
                <p>How do you pick between a theme which gets four 5 star votes and a theme which gets ten votes of 3, 4,
                    5?</p>
                <p>Well, let's start simple and see where that gets us.</p>


                <h2 id="trying-stuff-and-seeing-why-its-garbage">Trying Stuff And Seeing Why It's Garbage</h2>
                <h3 id="attempt-the-first-raw-score">Attempt The First: Raw Score</h3>
                <div style={{display: 'flex'}}>
                    <div style={{width: '50%'}}>
                        <p>Results:</p>
                        <table>
                            <thead>
                            <tr>
                                <th>Theme</th>
                                <th>Score</th>
                                <th>Votes (top: +5, bottom: -4)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Indirect Control</td>
                                <td>25</td>
                                <td>5, 5, 5, 4, 4, 3, 1, 0, -2</td>
                            </tr>
                            <tr>
                                <td>Don't Stop</td>
                                <td>23</td>
                                <td>5, 5, 5, 4, 2, 2, 1, 0, -1</td>
                            </tr>
                            <tr>
                                <td>No Straight Lines</td>
                                <td>22</td>
                                <td>5, 5, 4, 3, 3, 2</td>
                            </tr>
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>Bending the rules</td>
                                <td>13</td>
                                <td>5, 4, 4</td>
                            </tr>
                            <tr>
                                <td>...</td>
                                <td>...</td>
                                <td>...</td>
                            </tr>
                            <tr>
                                <td>(Redacted)</td>
                                <td>-27</td>
                                <td>0, 0, -1, -3, -3, -4, -4, -4, -4, -4</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{width: '50%'}}>
                        <p>Pseudocode:</p>
                        <pre>
                            <code dangerouslySetInnerHTML={{
                                __html: `// I did this in Kotlin locally, but it's a nightmare
// to read if you don't know it, so this is all fake.
for (theme in themes) {
    theme.score = sumOf(theme.votes[].score)
}

themes.sortBy(score)
`
                            }}
                            />
                        </pre>
                    </div>
                </div>
                        <p>Get all the votes for each theme, sum them together, take the theme with the highest
                            total.</p>
                        <p>Quick, simple, easy, and hideously biased. </p>
                        <p>Why? Well, indulge me a quick sidebar:</p>


                        <CollapsableSidebar title="Data Problem #2: The Enormous Range Of Votes Cast">
                        <p>Each voter got their themes in the laziest way I could think of:</p>
                        <pre><code>random = Random(userId)
    themes = database.getAllThemes().shuffle(random).subList(0, 10)
    </code></pre>
                        <p>By using the <code>userId</code> to seed the PRNG we should be sure each voter always saw the
                            same ten
                            themes. We assumed this would lead to a broadly even distribution of votes, which it did:
                        </p>
                        <p>[GRAPH]</p>
                        <p>The problem here is that because we have so many themes, there just weren't enough votes to
                            go
                            around. That normal distribution peaks around 4.5 votes per theme, which just isn't very
                            much
                            information at all.</p>
                        <p>[Example of two themes and votes cast]</p>
                        </CollapsableSidebar>

                        <p><strong>Summary</strong>: Raw score biased too heavily for themes that just happened to be seen more.</p>

                        <h3 id="attempt-the-second-average-score">Attempt The Second: Average Score</h3>
                        <p>High school stats class here I come! Let's try to account for the inconsistent vote totals by
                            calculating the average score for each theme, and go from there.</p>
                        <p>The results:</p>
                        <pre><code /></pre>
                        <p>Hmm. Well those certainly are <em>different</em>, but I'm a bit concerned we've gone too far
                            in
                            the other direction; instead of biasing towards themes that happened to be seen by lots of
                            people, it
                            looks like we're now biasing towards themes that (by chance) happened to only be seen by a
                            small
                            number of people who really liked the theme. </p>
                        <p>If all votes had been seen by 10, 20, 50 people, then I'd be a bit more relaxed about this.
                            But two
                            +5 votes defining the "best theme" doesn't quite add up; we've swung too far in the
                            other direction.</p>
                        <p>Maybe we can adjust for how many votes each theme got?</p>


                        <h3 id="attempt-the-second-point-two-weighted-average-score">Attempt The Second-Point-Two:
                            Weighted Average
                            Score</h3>
                        <pre><code /></pre>
                        <p>I won't waste your time here; it's like using the average score, but with a multiplier that
                            tries
                            to account for the very different numbers of votes. But how?</p>
                        <p>Penalising themes with fewer votes just lead back to the first attempt, where more votes was
                            broadly
                            better. Boosting themes with fewer votes just exacerbated the issue with average score
                            above, where a
                            few good votes was all that was needed.</p>
                        <p>Trying to figure out what a "good" vote was highlighted the two major fallacies I'd not
                            address up until this point:</p>


                        <h3 id="data-problem-3-the-scores-dont-mean-shit">Data Problem #3: The Scores Don't Mean
                            Shit</h3>
                        <p>As mentioned at the top, everyone's ranked votes were submitted from +5 to -4 (no, I don't
                            remember why we did this). The ranked voting system means all the votes are submitted
                            relative to each
                            other; there's no way real way to have comparable scores between themes (and between
                            people).</p>
                        <p>What do I mean by that?</p>
                        <p>If someone gets four brilliant themes in their selection, the scores those brilliant theme
                            will be given
                            are +5, +4, +3, and +2, and so on.</p>
                        <p>If someone gets one excellent theme, one ok theme, and a handful of complete duds? You
                            guessed it: +5,
                            +4, +3 and so on.</p>
                        <p>And even worse: if someone gets one "meh" theme and nine complete stinkers? You better
                            believe
                            those stinkers are scoring just as highly as someone else's 2nd/3rd/4th votes.</p>
                        <h3 id="data-problem-32-you-cant-do-maths-on-relative-numbers">Data Problem #3.2: You Can't Do
                            Maths On
                            Relative Numbers</h3>
                        <p>I expect any seasoned data scientists reading have been waiting for this clanger to drop for
                            some time
                            now: the numbers are all relative, I shouldn't be trying to directly compare them. If my 3rd
                            place
                            vote was great but not quite excellent, and your 3rd place was the ok-ist of a mediocre
                            bunch, why are
                            we trying to equate those votes together?</p>
                        <p>Moreover, consider this:</p>


                        <pre className="theme-atom-one-dark"><code dangerouslySetInnerHTML={{
                            __html: `{
    "theme": "Nothing But Crabs"
    "votes": [
        {
            "userId": "user-id-1",
            "score": 5
        },
        {
            "userId": "user-id-2",
            "score": 3
        },
        {
            "userId": "user-id-3",
            "score": 3
        }
    ]
}`
                        }} /></pre>
                        <p>User 1 ranked this theme as their top pick, that's not too troublesome.</p>
                        <p>Users 2 and 3 voted them in the same place, but... are they the same? I don't think we can
                            say
                            that.</p>
                        <h3 id="attempt-i-dont-know-which-relative-positions-table">Attempt I Don't Know Which: Relative
                            Positions Table</h3>
                        <p>When users rank their votes, the scores themselves are meaningless as scores; all they tell
                            us are the
                            order a specific user rated their themes.</p>
                        <p>So maybe our definition of "the best theme" is "the theme that was rated above others most
                            consistently"?</p>
                        <p>This was a bit more involved (read: I had a proper data scientist help me with this), but
                            what we build
                            is this:</p>
                        <table>
                            <thead>
                            <tr>
                                <th>Theme (+1 when row appears above column)</th>
                                <th>The Other Way</th>
                                <th>Divide and conquer</th>
                                <th>Return to Sender</th>
                                <th>...</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>The Other Way</td>
                                <td>x</td>
                                <td>-1, -1, 1</td>
                                <td>-1, 1, -1, 1</td>
                                <td />
                            </tr>
                            <tr>
                                <td>Divide and conquer</td>
                                <td>1, 1, -1</td>
                                <td>x</td>
                                <td>-1</td>
                                <td />
                            </tr>
                            <tr>
                                <td>Return to Sender</td>
                                <td>1, -1, 1, -1</td>
                                <td>1</td>
                                <td>x</td>
                                <td />
                            </tr>
                            <tr>
                                <td>...</td>
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                            </tbody>
                        </table>
                        <p>For every theme, we calculate how often it appeared <em>above</em> every other theme,
                            regardless of the
                            specific position of that theme in the list. The thinking being, the theme which comes out
                            on top most
                            consistently against other themes would be a strong theme suggestion, even if it didn't
                            always get
                            the highest score possible.</p>
                        <p>What we then do is sum up each row of the table: this gives us a numeric score for how often
                            this theme
                            appeared above other themes, something something something.</p>
                        <p>The pseudocode looks like this:</p>
                        <pre><code dangerouslySetInnerHTML={{
                            __html: `var dataTable: Map&lt;Pair&lt;String, String&gt;, List&lt;Int&gt;&gt;
    
for (voteX in allVotesCast) {
    for (voteY in allVotesCast) {
        if (voteX.themeId == voteY.themeId) {continue}

        comparativeVotes = dataTable[voteX.themeId to voteY.themeId]
        comparativeVotes.add(if (voteX.score &gt; voteY.score) 1 else -1)
    }
}`
                        }} /></pre>
                        <p>The theme that comes out on top compared to the most other themes, most often, seems like a
                            strong
                            contender for the best theme.</p>
                        <h3 id="data-problem-1-again">Data Problem #1 (Again):</h3>
                        <p>Sadly, we just can't get around the fact that limiting each person to ten themes just doesn't
                            give us enough data to work with. When we calculate <code>dataTable</code> and build our
                            grid of
                            comparative checks, we see the most that two themes appeared in the same list is... 3 times.
                        </p>
                        <p>Each <code>comparativeVotes</code> array is bound for the express checkout, with three items
                            or fewer!
                        </p>
                        <p>So we can sum each row of the table to find some number that I'm not even sure I understand
                            again.</p>
                        <p>The theme it gives us?</p>
                        <pre><code /></pre>
                        <p>Hmm. High average score, but very low total score. It appeared a total of 27 times compared
                            to other
                            themes. Of the 223 themes, the average is 47.</p>


                        <h2 id="attempt-the-last-plackett-luce-model">Attempt The Last: Plackett-Luce model</h2>
                        <p>I'm on shaky ground here; throughout this process a wonderful colleague of mine Hollie was
                            supporting
                            me as I figured out what questions to ask and how to go about answering them. I was more or
                            less
                            following along, until one morning Hollie DM'd me saying "f"</p>


                        <h2 id="conclusion">Conclusion</h2>
                        <p>I still don't really know anything about anything, but I had a good time with this.</p>
                        <p>Blah. basic, sample markdown.</p>
            </article>
        </Frame>
    );
};