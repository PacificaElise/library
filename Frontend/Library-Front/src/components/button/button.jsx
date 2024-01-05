/* eslint-disable */

import './button.scss';

export const Button = (props) => {
  const {children, className, onClick, disabled, id} = props;

  return (
    <button id={id} type='button' className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
  

