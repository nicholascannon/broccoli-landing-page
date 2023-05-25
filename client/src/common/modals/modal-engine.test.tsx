import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useEffect } from 'react';
import { MODAL_PORTAL_ID, ModalComponent, ModalEngine, useReplaceAndShowModal, useShowModal } from './modal-engine';

describe('ModalEngine', () => {
    beforeEach(() => {
        const portal = document.createElement('div');
        portal.id = MODAL_PORTAL_ID;
        document.body.appendChild(portal);
    });

    afterEach(() => {
        document.getElementById(MODAL_PORTAL_ID)?.remove();
    });

    test(`
        GIVEN a ModalEngine
        WHEN rendering it with children
        THEN the children should be visible in the document
    `, () => {
        render(
            <ModalEngine>
                <div data-testid="child">Child Component</div>
            </ModalEngine>
        );

        const child = screen.getByTestId('child');
        expect(child).toBeInTheDocument();
    });

    test(`
        GIVEN a TestComponent that renders a button to trigger a modal
        WHEN clicking the button
        THEN it should render the modal
    `, () => {
        const TestComponent = () => {
            const showModal = useShowModal();
            const TestModal = () => <p data-testid="modal">Modal</p>;

            return (
                <button data-testid="modal-button" onClick={() => showModal(TestModal)}>
                    show modal
                </button>
            );
        };

        render(
            <ModalEngine>
                <TestComponent />
            </ModalEngine>
        );

        expect(() => screen.getByTestId('modal')).toThrow();
        fireEvent.click(screen.getByTestId('modal-button'));
        expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    test(`
        GIVEN a TestComponent that renders a modal component with a close button
        WHEN clicking the close button
        THEN it should close the modal
    `, () => {
        const TestModal: ModalComponent = (props) => (
            <div data-testid="modal">
                <button data-testid="modal-close" onClick={props.closeModal}>
                    close
                </button>
            </div>
        );

        const TestComponent = () => {
            const showModal = useShowModal();
            useEffect(() => showModal(TestModal), [showModal]);

            return <div data-testid="page-content">Page content</div>;
        };

        render(
            <ModalEngine>
                <TestComponent />
            </ModalEngine>
        );

        fireEvent.click(screen.getByTestId('modal-close'));
        expect(() => screen.getByTestId('modal')).toThrow();
        expect(screen.getByTestId('page-content')).toBeInTheDocument();
    });

    test(`
        GIVEN a TestComponent that renders a modal with a button that replaces it with another modal
        WHEN clicking the button
        THEN it should remove the current modal from view and render the new modal
    `, () => {
        const FirstModal: ModalComponent = () => {
            const replaceAndShowModal = useReplaceAndShowModal();
            return (
                <div data-testid="first-modal">
                    <button data-testid="second-modal-open" onClick={() => replaceAndShowModal(SecondModal)}>
                        show other modal
                    </button>
                </div>
            );
        };

        const SecondModal: ModalComponent = () => <div data-testid="second-modal">Second modal</div>;

        const TestComponent = () => {
            const showModal = useShowModal();
            useEffect(() => showModal(FirstModal), [showModal]);

            return <div data-testid="page-content">Page content</div>;
        };

        render(
            <ModalEngine>
                <TestComponent />
            </ModalEngine>
        );

        fireEvent.click(screen.getByTestId('second-modal-open'));
        expect(() => screen.getByTestId('first-modal')).toThrow();
        expect(screen.getByTestId('second-modal')).toBeInTheDocument();
    });
});
