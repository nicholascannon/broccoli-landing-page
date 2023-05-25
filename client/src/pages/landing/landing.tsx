import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import { useShowModal } from '../../modal-engine/modal-engine';
import { RequestInviteModal } from './modals/request-invite-modal';

import styles from './landing.module.css';

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
                    <p>Lorem ipsum dolor sit amet.</p>

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
