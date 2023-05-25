import { GenericModalView } from '../../../../common/components/generic-modal-view';
import { ModalComponent } from '../../../../common/modals/modal-engine';

import styles from './invite-success-modal.module.css';

export const InviteSuccessModal: ModalComponent = (props) => {
    return (
        <GenericModalView>
            <div className={styles.content}>
                <h2>All done!</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non, explicabo.</p>
                <button onClick={props.closeModal}>ok</button>
            </div>
        </GenericModalView>
    );
};
