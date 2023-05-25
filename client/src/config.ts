export const CONFIG: Config = (() => {
    switch (window.location.hostname) {
        case 'localhost':
        case '127.0.0.1':
            return {
                REQUEST_INVITE_ENDPOINT: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
            };
        // This is just an example of PROD config
        case 'broccoli.com':
            return {
                REQUEST_INVITE_ENDPOINT: 'https://api.broccoli.com/api/request-invite',
            };
        default:
            throw new Error(`Invalid hostname: ${window.location.hostname}`);
    }
})();

type Config = {
    REQUEST_INVITE_ENDPOINT: string;
};
