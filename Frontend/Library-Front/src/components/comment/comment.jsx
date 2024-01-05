/* eslint-disable */

import { Rating } from '../raiting/raiting';
import { BASE_URL } from '../../config';
import userAva from '../../imgs/user.jpg';

export const Comment = (props) => {
    const {user, createdAt, rating, text} = props;

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    
    return (
    <div className='comments-container'>
      <div className='user-profile'>
        <div className='image-container'><img src={user.avatarUrl === null ? userAva : BASE_URL+Object.values(user.avatarUrl)} alt='user avatar'/></div>
        <p data-test-id='comment-author' className='user-name'>{user.firstName} &#160; {user.lastName}</p>
        <p data-test-id='comment-date' className='user-date'>{new Date(createdAt).toLocaleDateString('ru-RU', options)}</p>
      </div>
      <div data-test-id='rating' className='user-raiting-container'><Rating rating={rating}/>{rating}</div>
      {text ? <p data-test-id=' comment-text' className='comment'>
      {text}
      </p>:null}
    </div>)
    }