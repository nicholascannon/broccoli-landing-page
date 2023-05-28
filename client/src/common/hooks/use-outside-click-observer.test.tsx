import '@testing-library/jest-dom';
import { useRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useOutsideClickObserver } from './use-outside-click-observer';

describe('useOutsideClickObserver', () => {
    const TestComponent = () => {
        const [renderB, setRenderB] = useState(true);
        const ref = useRef(null);
        useOutsideClickObserver(ref, () => setRenderB(false));

        return (
            <>
                <div data-testid="a" style={{ height: '100px' }}></div>
                {renderB && <div ref={ref} data-testid="b" style={{ height: '100px' }}></div>}
            </>
        );
    };

    test(`
        GIVEN a TestComponent that renders two divs a and b, 
        AND div b uses the outside click observer
        WHEN clicking inside div b
        THEN both divs should remain visible
    `, () => {
        render(<TestComponent />);

        const divA = screen.getByTestId('a');
        const divB = screen.getByTestId('b');

        fireEvent.click(divB);

        expect(divA).toBeVisible();
        expect(divB).toBeVisible();
    });

    test(`
        GIVEN a TestComponent that renders two divs a and b, 
        AND div b uses the outside click observer
        WHEN clicking div a (outside div b)
        THEN div b should not be visible
    `, () => {
        render(<TestComponent />);

        const divA = screen.getByTestId('a');
        const divB = screen.getByTestId('b');

        fireEvent.mouseDown(divA);

        expect(divA).toBeVisible();
        expect(divB).not.toBeVisible();
    });
});
