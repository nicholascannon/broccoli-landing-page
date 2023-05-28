export const isNotBlank = (value: string): string | undefined => {
    if (value.trim() === '') {
        return 'Field required.';
    }
    return undefined;
};

export const isValidEmail = (value: string): string | undefined => {
    if (/^\S+@\S+\.\S+$/.test(value) === false) {
        return 'Please provide a valid email address.';
    }
    return undefined;
};

export const isMinimumLength = (value: string, minLength: number): string | undefined => {
    if (value.trim().length < minLength) {
        return `Must be at least ${minLength} character(s).`;
    }

    return undefined;
};

export const mustMatch = <T>(value: T, target: T, targetName: string): string | undefined => {
    if (value !== target) {
        return `Must match ${targetName}.`;
    }

    return undefined;
};
