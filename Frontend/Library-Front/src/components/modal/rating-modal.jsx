/* eslint-disable */
import { ReactComponent as CloseModal } from '../../imgs/icons/closeModal.svg';

import './modal.scss'

export const RatingModal = ({isRatingModalActive, setRatingModalActive, children, title, bigModal}) => 
  (isRatingModalActive ?
      <div className='modal modal-active' data-test-id='modal-outer' onClick={() => setRatingModalActive(false)}>
        <div data-test-id='modal-rate-book' className={isRatingModalActive ? `${!bigModal ? 'modal-content' : 'big-modal-content'} modal-content-active` : 'modal-content'} onClick={(e) => e.stopPropagation()}>
          <button data-test-id='modal-close-button' type='button' className='close-modal-btn' onClick={() => setRatingModalActive(false)}><CloseModal/></button>
          <h2 data-test-id='modal-title' className='modal-title'>{title}</h2>
          {children}
        </div>
      </div> :
      null
    )



// data-test-id='modal-rate-book' для рейтинга