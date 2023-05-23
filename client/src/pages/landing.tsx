import { Header } from '../components/header';
import { Footer } from '../components/footer';

import styles from './landing.module.css';

export const LandingPage = () => {
    return <LandingPageView />;
};

const LandingPageView = () => {
    return (
        <div className={styles.layout}>
            <Header />

            <main className={styles.main}>
                <section>
                    <h1>A better way to enjoy every day.</h1>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <button>Request an invite!</button>
                </section>
            </main>

            <Footer />
        </div>
    );
};
