/* eslint-disable */

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories, selectAllCategories, selectCategoriesInfo } from '../../features/categories/categories-slice';
import { selectControls, setCategory, setPath } from '../../features/controls/controls-slice';
import { selectAllBooks, selectBooksInfo } from '../../features/books/books-slice';
import {setToogleErrorToast} from '../../features/toggle-error-toast/toggle-error-toast-slice'

import {ReactComponent as Arrow} from '../../imgs/icons/arrow.svg';

import './sidebar.scss';
import { selectIsAuth } from '../../features/auth/auth-slice';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const categories = useSelector(selectAllCategories);
  const {path} = useSelector(selectControls);
  const {statusCat, errorCat, qty} = useSelector(selectCategoriesInfo);
  const {error, status} = useSelector(selectBooksInfo);
  const isAuth = useSelector(selectIsAuth);

  const [dropdown, setDropdown] = useState(true);

  const removeErrorToast = () => dispatch(setToogleErrorToast(false))

  const toogleDropdown = () => {
    setDropdown(dropdown => !dropdown);
  }

  useEffect(() => {
    if (!qty && isAuth) {
      dispatch(loadCategories()); 
    };
  }, [qty, isAuth, dispatch]);


  useEffect(() => {
    if (errorCat || error) 
    {
      setDropdown(false)
    } else setDropdown(true)
  }, [errorCat, error, status, statusCat]);

  const handleSelectCategory = (category) => {
    dispatch(setCategory(category));
  } 

  const handleSelectPath = (path) => {
    dispatch(setPath(path))
  };

  const bookCategories = books.map(book => book.categories).flat();

  return (
    <aside className='sidebar'>
        <ul className='sidebar-list'>
          <li className={dropdown ? 'sidebar-title underline' : 'sidebar-title'}>
            <NavLink className={dropdown ? 'active-link' : ''} onClick={toogleDropdown} to={`/books/${path}`} data-test-id='navigation-showcase'>Витрина книг
            </NavLink>
            {errorCat || error || statusCat === 'loading' || status === 'loading' ? 
              null : (
                <button type='button' aria-label='dropdownMenu' onClick={() => toogleDropdown()}><Arrow className={dropdown ? 'arrow-up' : ''}/></button>
                )
            }
          </li>
            {status === 'recieved' && statusCat === 'recieved' ?  
              <ul className={dropdown ? 'sidebar-categories' : 'sidebar-categories-not-visible'}>
                <li className='sidebar-category'>
                  <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to='/books/all' data-test-id='navigation-books' onClick={(e) => {
                        handleSelectCategory(e.target.innerText); 
                        handleSelectPath('all')
                        }
                        }>Все книги</NavLink>
                </li>
                {
                  categories.map(category => 
                    <li className='sidebar-category' key={category.id}>
                      <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={`/books/${category.path}`} data-test-id={`navigation-${category.path}`} onClick={(e) => {
                        handleSelectCategory(e.target.innerText); 
                        handleSelectPath(category.path)
                        }
                        }>
                      {category.name}
                      </NavLink> 
                      <span data-test-id={`navigation-book-count-for-${category.path}`}> {
                        bookCategories.filter(bookCategory => category.name === bookCategory).length
                        }
                      </span>
                    </li>
                  )
                }
              </ul> : 
              null
            }
            <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/terms' 
            onClick={()=> {setDropdown(false); removeErrorToast(false)}} data-test-id='navigation-terms'>
              <li>Правила пользования</li>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/contract' 
            onClick={()=> {setDropdown(false); removeErrorToast(false)}} data-test-id='navigation-contract'>
              <li>Договор оферты</li>
            </NavLink>
        </ul>
    </aside>
  )
};
