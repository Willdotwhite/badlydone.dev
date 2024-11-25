import {Frame} from '../_frame';
import {ItemCard} from '../utils';

import howToBuildSoftware from '../../assets/presentations/how-to-build-software__image.png'
import howToBuildSoftwarePdf from '../../assets/presentations/how-to-build-software--UoS-Q4-2024__web.pdf'

export function Presentations() {

    return (
        <Frame>
            <section id="profile" class="mb-mid">
                <h2>Presentations</h2>
                <p>This is an archive of presentations and talks I've given since creating this website.</p>
            </section>
            <section class="mb-mid">
                <ItemCard
                    imgSrc={howToBuildSoftware}
                    title={"How to build software"}
                    subtitle={"University of Sheffield, CompSci Department"}
                    copy={"50% general software development skills, 50% prep for the upcoming Software Hut group project.\\nGiven November 2024."}
                    url={howToBuildSoftwarePdf}
                    download={"how-to-build-software--UoS-Q4-2024__web.pdf"} />
            </section>
        </Frame>
    );
}
