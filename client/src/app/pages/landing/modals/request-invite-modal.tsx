import { useState } from 'react';
import { GenericModalView } from '../../../../common/modals/components/generic-modal-view';
import { ModalComponent, useReplaceAndShowModal } from '../../../../common/modals/modal-engine';
import { InviteSuccessModal } from './invite-success-modal';
import { CONFIG } from '../../../../config';

import styles from './request-invite-modal.module.css';

export const RequestInviteModal: ModalComponent = () => {
    const replaceAndShowModal = useReplaceAndShowModal();
    const [loading, setLoading] = useState<boolean>(false);

    const onRequestInvite = (name: string, email: string, _confirmEmail: string) => {
        setLoading(true);

        // TODO: validation

        fetch(CONFIG.REQUEST_INVITE_ENDPOINT, {
            body: JSON.stringify({ name, email }),
            method: 'POST',
        })
            .then(() => replaceAndShowModal(InviteSuccessModal))
            .catch(console.error) // TODO: handle error
            .finally(() => setLoading(false));
    };

    return <RequestInviteModalView onRequestInvite={onRequestInvite} loading={loading} />;
};

const RequestInviteModalView = (props: ViewProps) => {
    const { onRequestInvite, loading } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onRequestInvite(name, email, confirmEmail);
    };

    return (
        <GenericModalView>
            <div className={styles.content}>
                <h2>Request an invite</h2>

                <form className={styles.requestForm} onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        readOnly={loading}
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={loading}
                    />
                    <input
                        type="email"
                        name="confirm-email"
                        id="confirm-email"
                        placeholder="Confirm email"
                        required
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
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
    loading: boolean;
    onRequestInvite: (name: string, email: string, confirmEmail: string) => void;
};
