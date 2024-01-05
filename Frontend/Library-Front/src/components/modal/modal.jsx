/* eslint-disable */
import { ReactComponent as CloseModal } from '../../imgs/icons/closeModal.svg';

import './modal.scss'

export const Modal = ({isModalActive, setModalActive, children, title, bigModal}) => 
  (isModalActive ?
      <div className='modal modal-active' data-test-id='modal-outer' onClick={() => setModalActive(false)}>
        <div data-test-id='booking-modal' className={isModalActive ? `${!bigModal ? 'modal-content' : 'big-modal-content'} modal-content-active` : 'modal-content'} onClick={(e) => e.stopPropagation()}>
          <button data-test-id='modal-close-button' type='button' className='close-modal-btn' onClick={() => setModalActive(false)}><CloseModal/></button>
          <h2 data-test-id='modal-title' className='modal-title'>{title}</h2>
          {children}
        </div>
      </div> :
      null
    )



// data-test-id='modal-rate-book' для рейтинга