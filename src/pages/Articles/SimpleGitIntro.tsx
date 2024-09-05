import './style.css';
import {ExternCTA, SillyTitle} from '../Home';

import githubImage from '../../assets/github-white.png';
import linkedInImage from '../../assets/linkedin-white.png';

export function SimpleGitIntro() {
    return (
        <div class="home">
            <header class="mb-big">
                <SillyTitle />
            </header>
            <section id="profile" class="mb-mid">
                <h2>The Simplest Possible Git Intro</h2>
                <p>This won't be a great way to <i>learn</i> the basics, but it will be a good way to <i>do</i> the basics.</p>
                <p>This article presumes you are a solo developer looking to use git for personal projects as an alternative to making loads of ZIP folders for backups.</p>
                <p>It won't discuss concepts like cloning or pull requests.</p>
                <small>Fair warning, I'm writing these almost exclusively just for Jason's benefit - YMMV!</small>
            </section>
            <article>
                <section>
                    <h3>The Core Concepts</h3>
                    <p>Repository: the name used for a project tracked by git. You want each project to be it's own repository.</p>
                    <p>Commit: Git works by </p>
                </section>
                <section>
                    <h3>The Core Commands</h3>
                    <p>You can get a long way in git with only a very small number of commands.</p>

                    <h4>git init</h4>
                    <p>This is how you tell git to start tracking the changes to a project on your machine.</p>
                    <p>Git works by creating a hidden folder in your project called <code>.git</code>, which you won't normally be able see.</p>
                    <p>When you do this, you can start making and tracking changes with git. This tends to be the first or second thing I do in a project - starting a new Unity game? Open Unity, create the project, then open a terminal and <code>git init</code>.</p>

                    <h4>git add</h4>
                    <p>As you work on your project, files of all kinds will be added, changed, and deleted.</p>
                    <p><code>git add</code> is </p>


                    <code>git checkout -b name_of_new_branch</code>
                    <code>git commit -m "..."</code>
                    <code>git push</code>
                </section>
            </article>
            <footer>
                <ExternCTA imgSrc={githubImage} url="https://github.com/Willdotwhite/" alt="GitHub Profile" />
                <ExternCTA imgSrc={linkedInImage} url="https://www.linkedin.com/in/williampaulwhite/" alt="LinkedIn Profile" />
            </footer>
        </div>
    );
}