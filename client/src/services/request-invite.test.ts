import { requestInvite } from './request-invite';

describe('request-invite', () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: true } as Response));

    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    afterAll(() => {
        (fetch as jest.Mock).mockRestore();
    });

    test(`
        GIVEN a successful response from the invite API
        THEN the requestInvite function should not throw an error
    `, async () => {
        expect(requestInvite('Bob', 'bob@gmail.com')).resolves.not.toThrow();
    });

    test(`
        GIVEN a 400 BAD REQUEST response from the invite API
        THEN the requestInvite function should throw an error with the message from the response
    `, async () => {
        (fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 400,
                json: () => Promise.resolve({ errorMessage: 'error message' }),
            } as Response)
        );
        expect(requestInvite('Bob', 'bob@gmail.com')).rejects.toThrow('error message');
    });

    test(`
        GIVEN an error from the invite API that is NOT a 400
        THEN the requestInvite function should throw an error with the default error message
    `, async () => {
        (fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                status: 500,
            } as Response)
        );
        expect(requestInvite('Bob', 'bob@gmail.com')).rejects.toThrow('Unable to request invite. Please try again.');
    });

    test(`
        GIVEN a fetch API error (no internet, CORs etc.)
        THEN the requestInvite function should throw an error with the default error message
    `, async () => {
        (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('Unable to fetch')));
        expect(requestInvite('Bob', 'bob@gmail.com')).rejects.toThrow('Unable to request invite. Please try again.');
    });
});
