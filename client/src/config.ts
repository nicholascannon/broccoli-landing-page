export const CONFIG: Config = (() => {
    switch (window.location.hostname) {
        case 'localhost':
        case '127.0.0.1':
            return {
                API_HOST: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com',
            };
        // This is just an example of PROD config
        case 'broccoli.com':
            return {
                API_HOST: 'https://api.broccoli.com',
            };
        default:
            throw new Error(`Invalid hostname: ${window.location.hostname}`);
    }
})();

type Config = {
    API_HOST: string;
};
