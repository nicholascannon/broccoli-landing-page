/* eslint-disable @typescript-eslint/no-empty-function */
import renderer from 'react-test-renderer';
import { InviteSuccessModal } from './invite-success-modal';

test(`
    GIVEN InviteSuccessModal component
    THEN rendering it should match the snapshot
`, () => {
    const tree = renderer.create(<InviteSuccessModal closeModal={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
});
