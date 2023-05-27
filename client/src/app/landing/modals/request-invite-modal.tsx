import { useState } from 'react';
import { GenericModalView } from '../../../common/modals/components/generic-modal-view';
import { ModalComponent, useReplaceAndShowModal } from '../../../common/modals/modal-engine';
import { InviteSuccessModal } from './invite-success-modal';
import { CONFIG } from '../../../config';
import { Button } from '../../../common/components/button';

import styles from './request-invite-modal.module.css';

export const RequestInviteModal: ModalComponent = () => {
    const replaceAndShowModal = useReplaceAndShowModal();
    const [loading, setLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | undefined>(undefined);

    const onRequestInvite = (name: string, email: string, _confirmEmail: string) => {
        setLoading(true);

        // TODO: validation

        fetch(CONFIG.REQUEST_INVITE_ENDPOINT, {
            body: JSON.stringify({ name, email }),
            method: 'POST',
        })
            .then(async (response) => {
                if (response.ok === false) {
                    if (response.status === 400) {
                        const data = await response.json();
                        setServerError(data.errorMessage || DEFAULT_ERROR_MESSAGE);
                    } else {
                        setServerError(DEFAULT_ERROR_MESSAGE);
                    }

                    return;
                }

                replaceAndShowModal(InviteSuccessModal);
            })
            .catch(() => setServerError(DEFAULT_ERROR_MESSAGE))
            .finally(() => setLoading(false));
    };

    return <RequestInviteModalView onRequestInvite={onRequestInvite} loading={loading} serverError={serverError} />;
};

const DEFAULT_ERROR_MESSAGE = 'Unable to request invite. Please try again.';

const RequestInviteModalView = (props: ViewProps) => {
    const { onRequestInvite, loading, serverError: error } = props;

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

                    <Button fullWidth type="submit" className={styles.callToAction} disabled={loading}>
                        {loading ? 'Sending, please wait...' : 'Send'}
                    </Button>
                </form>

                {error && <span className={styles.serverError}>{error}</span>}
            </div>
        </GenericModalView>
    );
};

type ViewProps = {
    loading: boolean;
    serverError?: string;
    onRequestInvite: (name: string, email: string, confirmEmail: string) => void;
};
