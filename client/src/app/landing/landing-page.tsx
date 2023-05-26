import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import { useShowModal } from '../../common/modals/modal-engine';
import { RequestInviteModal } from './modals/request-invite-modal';

import styles from './landing-page.module.css';

export const LandingPage = () => {
    const showModal = useShowModal();

    const callToAction = () => showModal(RequestInviteModal);

    return <LandingPageView callToAction={callToAction} />;
};

const LandingPageView = (props: ViewProps) => {
    return (
        <div className={styles.layout}>
            <Header />

            <main className={styles.main}>
                <section className={styles.content}>
                    <h1>A better way to enjoy every day.</h1>
                    <p>Be the first to know when we launch.</p>

                    <button onClick={props.callToAction}>Request an invite</button>
                </section>
            </main>

            <Footer />
        </div>
    );
};

type ViewProps = {
    callToAction: () => void;
};
