import { useState } from 'react';
import { GenericModalView } from '../../../common/modals/components/generic-modal-view';
import { ModalComponent, useReplaceAndShowModal } from '../../../common/modals/modal-engine';
import { InviteSuccessModal } from './invite-success-modal';
import { CONFIG } from '../../../config';
import { Button } from '../../../common/components/button';
import { isMinimumLength, isNotBlank, isValidEmail, mustMatch } from '../../../common/utils/validation';
import { FormInput } from '../../../common/form/form-input';

import styles from './request-invite-modal.module.css';

export const RequestInviteModal: ModalComponent = () => {
    const replaceAndShowModal = useReplaceAndShowModal();
    const [loading, setLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | undefined>(undefined);
    const [formErrors, setFormErrors] = useState<RequestFormErrors>({});

    const validateName = (name: string) => isNotBlank(name) || isMinimumLength(name, MIN_NAME_LENGTH);
    const validateEmail = (email: string) => isNotBlank(email) || isValidEmail(email);
    const validateConfirmEmail = (email: string, confirmEmail: string) =>
        isNotBlank(confirmEmail) || mustMatch(email, confirmEmail, 'email');

    const onRequestInvite = (name: string, email: string, confirmEmail: string) => {
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const confirmEmailError = validateConfirmEmail(email, confirmEmail);

        setFormErrors({
            name: nameError,
            email: emailError,
            confirmEmail: confirmEmailError,
        });

        const formHasErrors = [nameError, emailError, confirmEmailError].some((error) => error !== undefined);
        if (formHasErrors) {
            return;
        }

        setLoading(true);
        fetch(CONFIG.REQUEST_INVITE_ENDPOINT, {
            body: JSON.stringify({ name, email }),
            method: 'POST',
        })
            .then(async (response) => {
                // TODO: extract error handling process from here
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

    return (
        <RequestInviteModalView
            loading={loading}
            serverError={serverError}
            formErrors={formErrors}
            onRequestInvite={onRequestInvite}
        />
    );
};

type RequestFormErrors = {
    name?: string;
    email?: string;
    confirmEmail?: string;
};

const MIN_NAME_LENGTH = 3;

const DEFAULT_ERROR_MESSAGE = 'Unable to request invite. Please try again.';

const RequestInviteModalView = (props: ViewProps) => {
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
                <h2>Request an invite</h2>

                <form className={styles.requestForm} onSubmit={onSubmit} noValidate>
                    <FormInput
                        className={styles.formInput}
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
                        className={styles.formInput}
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
                        className={styles.formInput}
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

                {serverError && <span className={styles.errorMessage}>{serverError}</span>}
            </div>
        </GenericModalView>
    );
};

type ViewProps = {
    loading: boolean;
    serverError?: string;
    formErrors?: RequestFormErrors;
    onRequestInvite: (name: string, email: string, confirmEmail: string) => void;
};
