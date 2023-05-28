import { useState } from 'react';
import { Button } from '../../../../common/components/button';
import { FormInput } from '../../../../common/form/form-input';
import { GenericModalView } from '../../../../common/modals/components/generic-modal-view';

import styles from './request-invite-view.module.css';

export const RequestInviteModalView = (props: ViewProps) => {
    const { onRequestInvite, loading, serverError, formErrors } = props;

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
                <div>
                    <h2>Request an invite</h2>
                    <hr />
                </div>

                <form className={styles.requestForm} onSubmit={onSubmit} noValidate>
                    <FormInput
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value.trim())}
                        required
                        readOnly={loading}
                        error={formErrors?.name}
                    />

                    <FormInput
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        required
                        readOnly={loading}
                        error={formErrors?.email}
                    />

                    <FormInput
                        type="email"
                        name="confirm-email"
                        id="confirm-email"
                        placeholder="Confirm email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value.trim())}
                        required
                        readOnly={loading}
                        error={formErrors?.confirmEmail}
                    />

                    <Button fullWidth type="submit" className={styles.callToAction} disabled={loading}>
                        {loading ? 'Sending, please wait...' : 'Send'}
                    </Button>
                </form>

                {serverError && <span className={styles.serverError}>{serverError}</span>}
            </div>
        </GenericModalView>
    );
};

type ViewProps = {
    loading: boolean;
    serverError?: string;
    formErrors?: {
        name?: string;
        email?: string;
        confirmEmail?: string;
    };
    onRequestInvite: (name: string, email: string, confirmEmail: string) => void;
};
