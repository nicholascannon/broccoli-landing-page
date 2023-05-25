import { GenericModalView } from '../../../modals/generic-modal-view';
import { ModalComponent } from '../../../modals/modal-engine';

import styles from './request-invite-modal.module.css';

export const RequestInviteModal: ModalComponent = () => {
    return (
        <GenericModalView>
            <div className={styles.content}>
                <h2>Request an invite</h2>

                <form className={styles.requestForm}>
                    <input type="text" name="name" id="name" placeholder="Full name" />
                    <input type="email" name="email" id="email" placeholder="Email" />
                    <input type="email" name="confirm-email" id="confirm-email" placeholder="Confirm email" />
                    <button type="submit">Request</button>
                </form>
            </div>
        </GenericModalView>
    );
};
