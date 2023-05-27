import { useCallback, useState } from 'react';
import { ModalComponent, useReplaceAndShowModal } from '../../../../common/modals/modal-engine';
import { InviteSuccessModal } from '../invite-success/invite-success-modal';
import { isMinimumLength, isNotBlank, isValidEmail, mustMatch } from '../../../../common/utils/validation';
import { RequestInviteError, requestInvite } from '../../../../services/request-invite';
import { RequestInviteModalView } from './request-invite-view';

export const RequestInviteModal: ModalComponent = () => {
    const replaceAndShowModal = useReplaceAndShowModal();
    const [loading, setLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | undefined>(undefined);
    const [formErrors, setFormErrors] = useState<RequestFormErrors>({});

    const onRequestInvite = useCallback(
        (name: string, email: string, confirmEmail: string) => {
            setServerError(undefined);

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
            requestInvite(name, email)
                .then(() => replaceAndShowModal(InviteSuccessModal))
                .catch((error: RequestInviteError) => setServerError(error.message))
                .finally(() => setLoading(false));
        },
        [replaceAndShowModal]
    );

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

const validateName = (name: string) => isNotBlank(name) || isMinimumLength(name, MIN_NAME_LENGTH);
const validateEmail = (email: string) => isNotBlank(email) || isValidEmail(email);
const validateConfirmEmail = (email: string, confirmEmail: string) =>
    isNotBlank(confirmEmail) || mustMatch(email, confirmEmail, 'email');

const MIN_NAME_LENGTH = 3;
