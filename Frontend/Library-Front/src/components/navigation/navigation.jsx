import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Tile } from '../../imgs/icons/tile.svg';
import { ReactComponent as List } from '../../imgs/icons/list.svg';
import { ReactComponent as Asc } from '../../imgs/icons/sort-asc.svg';
import { ReactComponent as Desc } from '../../imgs/icons/sort-desc.svg';

import { useResize } from '../../hooks/use-resize'

import { selectField, selectSearch, selectSort, setSearch, setSort, setField } from '../../features/controls/controls-slice';
import './navigation.scss';

export const Navigation = ({onChangeView}) => {
const dispatch = useDispatch();
const search =  useSelector(selectSearch);
const sort = useSelector(selectSort);
const field = useSelector(selectField)
const [orange, setOrange] = useState(false);

const handleSearch = (e) => {
  dispatch(setSearch(e.target.value));
}

const handleSelectField = (field) => {
  dispatch(setField(field));
} 

const toogleSort = () => {
  dispatch(setSort(sort === 'desc' ? 'asc' : 'desc'))
}

  const [btns, setBtns] = useState([
      { btnId: 0, img: <Tile className='view'/>, status: true, dataTestId: 'button-menu-view-window' },
      { btnId: 1, img: <List className='view'/>, status: false, dataTestId: 'button-menu-view-list' }
    ]);
    const { isScreenSm} = useResize();
    const [searchIsActive, setSearchIsActive] = useState(false);

  const choosebtn = (img) => {
    const newArr = btns.map((btn) =>
      btn.img === img ? { ...btn, status: true } : { ...btn, status: false }
    );
    setBtns(newArr);
  };

return (
  <nav className='navigation'>
    <form className='form'>
      <div className={isScreenSm && searchIsActive ? 'search active' : 'search'}>
        <button type='button' aria-label='search' data-test-id='button-search-open' className={isScreenSm && searchIsActive ? 'invisible' : orange ? 'icon-orange' : 'icon'} onClick={() => setSearchIsActive(true)}/>
        <div className='input'>
          <input onFocus={() => setOrange(true)} onBlur={() => setOrange(false)}type='text' placeholder='Поиск книги или автора…' data-test-id='input-search' className={isScreenSm && !searchIsActive ? 'invisible' : 'input-search'} onChange={handleSearch} value={search}/>
          <button className='clear' type='button' aria-label='clear' data-test-id='button-search-close' onClick={() => setSearchIsActive(false)}/>
        </div>
      </div>
      <button type='button' aria-label='select' className={isScreenSm && searchIsActive ? 'invisible' : 'select'} data-test-id='sort-rating-button' onClick={(e) => {toogleSort(); handleSelectField('rating')}}>{sort === 'asc' ? <Asc className='select-icon'/> : <Desc className='select-icon'/>} <span className={isScreenSm  ? 'invisible' : ''}>По рейтингу</span></button>
    </form>
    <div className={isScreenSm && searchIsActive ? 'invisible' : 'btns'}>
      {btns.map((btn) => (
          <button key={btn.btnId} data-test-id={btn.dataTestId} className={btn.status ? 'btn-active' : 'btn'} type='button' 
          onClick={
            () => {
              choosebtn(btn.img);
              onChangeView(btn.btnId)
            }
          }>{btn.img}</button>
        ))}
    </div>
  </nav>
  )
};


/*  <div className={isScreenSm && searchIsActive ? 'invisible' : 'select'}>
<button type='button' aria-label='select' className='select-icon' data-test-id='sort-rating-button' onClick={toogleSort}>{sort === 'asc' ? <Asc/> : <Desc/>}</button>
  <select onChange={handleSelectField} value={field}>
    <option value='rating'>По рейтингу</option>
    <option value='authors'>По автору</option>
    <option value='title'>По алфавиту</option>
  </select>
</div> */