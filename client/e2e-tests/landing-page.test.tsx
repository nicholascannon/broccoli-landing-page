import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../src/app/app';
import { MODAL_PORTAL_ID } from '../src/common/modals/modal-engine';

describe('Landing page integration tests', () => {
    beforeEach(() => {
        const portal = document.createElement('div');
        portal.id = MODAL_PORTAL_ID;
        document.body.appendChild(portal);
    });

    afterEach(() => {
        document.getElementById(MODAL_PORTAL_ID)?.remove();
    });

    test(`
        GIVEN the application component
        WHEN rendering it
        THEN the landing page content should be visible
        AND the call to action button should be displayed
    `, () => {
        render(<App />);

        expect(screen.getByText('A better way to enjoy every day.')).toBeVisible();
        expect(screen.getByText('Request an invite')).toBeInTheDocument();
    });

    describe(`
        GIVEN the application component
        AND the request invite API
    `, () => {
        window.fetch = jest.fn(() => Promise.resolve({ ok: true } as Response));

        beforeEach(() => {
            (fetch as jest.Mock).mockClear();
        });

        afterAll(() => {
            (fetch as jest.Mock).mockRestore();
        });

        test(`
            WHEN requesting an invite with a successful response
            THEN the user should be presented a success modal
            AND they should be able to dismiss it
        `, async () => {
            render(<App />);

            // Open modal
            await userEvent.click(screen.getByText('Request an invite'));

            // Fill out form
            await userEvent.type(screen.getByPlaceholderText('Full name'), 'Bob');
            await userEvent.type(screen.getByPlaceholderText('Email'), 'bob@gmail.com');
            await userEvent.type(screen.getByPlaceholderText('Confirm email'), 'bob@gmail.com');

            // Submit form
            await userEvent.click(screen.getByText('Send'));

            expect(screen.getByText('All done!')).toBeVisible();

            // Close confirmation modal
            await userEvent.click(screen.getByText('ok'));

            expect(screen.getByText('A better way to enjoy every day.')).toBeVisible();
        });

        test(`
            WHEN requesting an invite without entering the form
            THEN the user should be presented with inline error messages
            AND the invite API should not have been called
        `, async () => {
            render(<App />);

            // Open modal
            await userEvent.click(screen.getByText('Request an invite'));

            // Submit form
            await userEvent.click(screen.getByText('Send'));

            expect(window.fetch).not.toHaveBeenCalled();
            expect(screen.getAllByText('Field required.').length).toBe(3);
        });
    });
});
