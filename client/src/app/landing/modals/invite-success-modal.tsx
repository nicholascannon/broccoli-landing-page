import { Button } from '../../../common/components/button';
import { GenericModalView } from '../../../common/modals/components/generic-modal-view';
import { ModalComponent } from '../../../common/modals/modal-engine';

import styles from './invite-success-modal.module.css';

export const InviteSuccessModal: ModalComponent = (props) => {
    return (
        <GenericModalView>
            <div className={styles.content}>
                <h2>All done!</h2>
                <p>You will be one of the first to experience Broccoli &amp; Co. when we launch.</p>
                <Button fullWidth onClick={props.closeModal}>
                    ok
                </Button>
            </div>
        </GenericModalView>
    );
};
