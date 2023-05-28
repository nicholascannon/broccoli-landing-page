/* eslint-disable @typescript-eslint/no-empty-function */
import renderer from 'react-test-renderer';
import { LandingPageView } from './landing-page';

describe('LandingPageView', () => {
    test(`
        GIVEN LandingPageView component
        THEN rendering it should match the snapshot
    `, () => {
        const tree = renderer.create(<LandingPageView callToAction={() => {}} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
