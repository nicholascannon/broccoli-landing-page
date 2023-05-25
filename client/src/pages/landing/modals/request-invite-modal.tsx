import { useState } from 'react';
import { GenericModalView } from '../../../modals/generic-modal-view';
import { ModalComponent, useReplaceAndShowModal } from '../../../modals/modal-engine';
import { InviteSuccessModal } from './invite-success-modal';

import styles from './request-invite-modal.module.css';

export const RequestInviteModal: ModalComponent = () => {
    const replaceAndShowModal = useReplaceAndShowModal();
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        setLoading(true);

        // TODO: get rid of latency simulation
        setTimeout(() => {
            setLoading(false);
            replaceAndShowModal(InviteSuccessModal);
        }, 500);
    };

    return <RequestInviteModalView onSubmit={onSubmit} loading={loading} />;
};

const RequestInviteModalView = (props: ViewProps) => {
    const { loading } = props;

    return (
        <GenericModalView>
            <div className={styles.content}>
                <h2>Request an invite</h2>

                <form className={styles.requestForm} onSubmit={props.onSubmit}>
                    <input type="text" name="name" id="name" placeholder="Full name" required readOnly={loading} />
                    <input type="email" name="email" id="email" placeholder="Email" required readOnly={loading} />
                    <input
                        type="email"
                        name="confirm-email"
                        id="confirm-email"
                        placeholder="Confirm email"
                        required
                        readOnly={loading}
                    />

                    <div className={styles.callToAction}>
                        {/* TODO: replace span with SVG animation */}
                        {loading ? <span>sending invite...</span> : <button type="submit">Request</button>}
                    </div>
                </form>
            </div>
        </GenericModalView>
    );
};

type ViewProps = {
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    loading: boolean;
};
