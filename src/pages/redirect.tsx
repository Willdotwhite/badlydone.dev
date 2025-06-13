import {Frame} from './_frame';

export const Redirect = () => {
    window.location.replace("https://docs.google.com/forms/d/e/1FAIpQLSfiZhW_rz4XykKZTTLBDhxTLteyIqLixxBWmbPQKXRfUHi2ug/viewform?usp=sharing&ouid=110216592993558946462");

    return (
        <Frame>
            <section id="profile" class="mb-mid">
                <h2>Hold tight!</h2>
                <p>You're being redirected now.</p>
                <p>Thanks for playing Squarepinksi!</p>
            </section>
        </Frame>
    );
}