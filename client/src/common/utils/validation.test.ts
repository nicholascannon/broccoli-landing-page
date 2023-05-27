import { isMinimumLength, isNotBlank, isValidEmail, mustMatch } from './validation';

describe('validation', () => {
    describe('isNotBlank', () => {
        test(`
            GIVEN a blank value
            WHEN calling isNotBlank
            THEN it should return the expected error message
        `, () => {
            expect(isNotBlank('')).toBe('Field required.');
        });

        test(`
            GIVEN a white space only value
            WHEN calling isNotBlank
            THEN it should return the expected error message
        `, () => {
            expect(isNotBlank('    ')).toBe('Field required.');
        });

        test(`
            GIVEN a value with text but surrounding white space
            WHEN calling isNotBlank
            THEN it should return undefined
        `, () => {
            expect(isNotBlank('  hello   ')).toBeUndefined();
        });

        test(`
            GIVEN a value with text
            WHEN calling isNotBlank
            THEN it should return undefined
        `, () => {
            expect(isNotBlank('hello')).toBeUndefined();
        });
    });

    describe('isValidEmail', () => {
        const invalidEmails = ['test', 'test@test', '@test.com', 'test@.com', 'test@test.'];
        test.each(invalidEmails)(
            `
            GIVEN an invalid email (%s)
            WHEN calling isValidEmail
            THEN return the expected error message
            `,
            (invalidEmail) => {
                expect(isValidEmail(invalidEmail)).toBe('Please provide a valid email address.');
            }
        );

        const validEmails = ['test@test.com', 'john.doe@gmail.com', 'info@test.co', 'bob5@sub.test.com'];
        test.each(validEmails)(
            `
            GIVEN a valid email (%s)
            WHEN calling isValidEmail
            THEN return undefined
            `,
            (validEmail) => {
                expect(isValidEmail(validEmail)).toBeUndefined();
            }
        );
    });

    describe('isMinimumLength', () => {
        const MIN_LENGTH = 3;

        test(`
            GIVEN a blank value
            WHEN calling isMinimumLength
            THEN it should return the expected error message
        `, () => {
            expect(isMinimumLength('', MIN_LENGTH)).toBe(`Must be at least ${MIN_LENGTH} character(s).`);
        });

        test(`
            GIVEN a white space only value
            WHEN calling isNotBlank
            THEN it should return the expected error message
        `, () => {
            expect(isMinimumLength('    ', MIN_LENGTH)).toBe(`Must be at least ${MIN_LENGTH} character(s).`);
        });

        test(`
            GIVEN a value with not enough characters + white space
            WHEN calling isNotBlank
            THEN it should return the expected error message
        `, () => {
            expect(isMinimumLength(' ab   ', MIN_LENGTH)).toBe(`Must be at least ${MIN_LENGTH} character(s).`);
        });

        test(`
            GIVEN a value with not enough characters
            WHEN calling isNotBlank
            THEN it should return the expected error message
        `, () => {
            expect(isMinimumLength('ab', MIN_LENGTH)).toBe(`Must be at least ${MIN_LENGTH} character(s).`);
        });

        test(`
            GIVEN a value with enough characters
            WHEN calling isNotBlank
            THEN it should undefined
        `, () => {
            expect(isMinimumLength('abc', MIN_LENGTH)).toBeUndefined();
        });
    });

    describe('mustMatch', () => {
        test(`
            GIVEN a value that does not match it's target value
            WHEN calling mustMatch
            THEN it should return the expected error message
        `, () => {
            expect(mustMatch('abc', 'ab', 'target')).toBe('Must match target.');
        });

        test(`
            GIVEN a value that matches it's target value
            WHEN calling mustMatch
            THEN it should return undefined
        `, () => {
            expect(mustMatch('abc', 'abc', 'target')).toBeUndefined();
        });
    });
});
