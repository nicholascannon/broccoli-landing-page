import React from 'react';
import { Header } from '../../common/components/header';
import { Footer } from '../../common/components/footer';
import { useShowModal } from '../../common/modals/modal-engine';
import { Button } from '../../common/components/button';

import styles from './landing-page.module.css';

const RequestInviteModal = React.lazy(() => import('./modals/request-invite/request-invite-modal'));

export const LandingPage = () => {
    const showModal = useShowModal();

    const callToAction = () => {
        showModal(RequestInviteModal);
    };

    return <LandingPageView callToAction={callToAction} />;
};

export const LandingPageView = (props: ViewProps) => {
    return (
        <div className={styles.layout}>
            <Header />

            <main className={styles.main}>
                <section className={styles.content}>
                    <h1>A better way to enjoy every day.</h1>
                    <p>Be the first to know when we launch.</p>

                    <Button onClick={props.callToAction}>Request an invite</Button>
                </section>
            </main>

            <Footer />
        </div>
    );
};

type ViewProps = {
    callToAction: () => void;
};
