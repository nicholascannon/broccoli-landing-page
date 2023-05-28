/* eslint-disable @typescript-eslint/no-empty-function */
import renderer from 'react-test-renderer';
import { RequestInviteModalView } from './request-invite-view';

test(`
    GIVEN RequestInviteModalView component
    WHEN loading is false and there are no errors
    THEN rendering it should match the snapshot
`, () => {
    const tree = renderer.create(<RequestInviteModalView loading={false} onRequestInvite={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test(`
    GIVEN RequestInviteModalView component
    WHEN loading is true and there are no errors
    THEN rendering it should match the snapshot
`, () => {
    const tree = renderer.create(<RequestInviteModalView loading={true} onRequestInvite={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
});

test(`
    GIVEN RequestInviteModalView component
    WHEN loading is false and there is a server error
    THEN rendering it should match the snapshot
`, () => {
    const tree = renderer
        .create(<RequestInviteModalView loading={false} onRequestInvite={() => {}} serverError="Error" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test(`
    GIVEN RequestInviteModalView component
    WHEN loading is false and there is form errors
    THEN rendering it should match the snapshot
`, () => {
    const tree = renderer
        .create(
            <RequestInviteModalView
                loading={false}
                onRequestInvite={() => {}}
                formErrors={{
                    name: 'Error',
                    email: 'Error',
                    confirmEmail: 'Error',
                }}
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
