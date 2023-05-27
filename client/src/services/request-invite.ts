import { CONFIG } from '../config';

export const requestInvite = async (name: string, email: string) => {
    try {
        const response = await fetch(CONFIG.REQUEST_INVITE_ENDPOINT, {
            body: JSON.stringify({ name, email }),
            method: 'POST',
        });

        if (!response.ok) {
            if (response.status === 400) {
                const data = await response.json();
                throw new RequestInviteError(data.errorMessage || DEFAULT_ERROR_MESSAGE);
            }
            throw new RequestInviteError(DEFAULT_ERROR_MESSAGE);
        }
    } catch (error) {
        if (error instanceof RequestInviteError) throw error;
        throw new RequestInviteError(DEFAULT_ERROR_MESSAGE);
    }
};

export class RequestInviteError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

const DEFAULT_ERROR_MESSAGE = 'Unable to request invite. Please try again.';
