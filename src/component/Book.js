/********************************************************************
 *
 "BOOK" COMPONENT
 *********************

 COMPONENT CARRIES 3 DISTINCT VIEW TYPES THAT  SERVE DIFFERENT ASPECTS  OF THE APP
 - FULL => USED BY 'SHOWCASE' PAGE WHERE A FULL DESCRIPTION OF THE BOOK IS DISPLAYED
 - MID  =>   USED BY 'SEARCH' PAGE, WHERE SEARCH RESULTS ARE LISTED ACCORDING TO USER 'SEARCH' FILTERING
 - MIN   =>  USED BY 'SHOWCASE' PAGE BOTTOM AREA, WHERE SUGGESTIONS BOOKS ARE LISTED BASED ON 'NAVIGATION' CRITERIA
 *
 *
 ***************************************************************************** */

import {useContext} from 'react';
import {AppContext} from "_src/AppContext";
import {APPVIEW} from "_src/App";


import "./book.scss";

/*

 */
export const VIEW = {
    FULL: 0,
    MID: 1,
    MIN: 2
}


/**
 *
 * @param book
 * @param view
 * @returns {*}
 * @constructor
 */
export const Book = ({book, view = null}) => {

    let {action} = useContext(AppContext)

    if (view === VIEW.MIN) return <ViewMin book={book} action={action}/>

    if (view === VIEW.MID) return <ViewMid book={book} action={action}/>

    return <ViewFull book={book}/>

}


/**
 *
 * @param book
 * @returns {*}
 * @constructor
 */
const ViewFull = ({book}) => {

    return (
        <article className='book-view-full'>

            <div className='book-vfl-row1'>

                <div className='book-vfl-col1'>
                    {book.image && <img src={book.image}/> || <span className='no-image'>No Image Available</span>}
                </div>

                <div className='book-vfl-col2'>

                    <div className='book-vfl-title'>
                        <h1>{book.title}</h1>
                    </div>

                    <div className='book-vfl-description'>
                        <p>{book.description}</p>
                    </div>

                    <div className='book-vfl-socials'>
                        <button>favourity</button>
                        <button>share</button>
                    </div>

                    <div className='book-vfl-category'>
                        <span>Category:</span><span>{book.categories.join(", ")}</span>
                    </div>

                    <div className='book-vfl-year'>
                        <span>Year:</span><span>{book.year}</span>
                    </div>

                    <div className='book-vfl-pages'>
                        <span>Number of Pages:</span><span>{book.pages}</span>
                    </div>

                    <div className='book-vfl-publisher'>
                        <span>Publisher:</span><span>{book.publisher}</span>
                    </div>

                    <div className='book-vfl-isbn10'>
                        <span>ISBN-10:</span><span>{book.isbn10}</span>
                    </div>

                    <div className='book-vfl-isbn13'>
                        <span>ISBN-13:</span><span>{book.isbn13}</span>
                    </div>

                    <div className='book-vfl-buy'>
                        <button>BUY</button>
                    </div>

                </div>

            </div>

            <div className='book-vfl-row2'>

                <div className='book-vfl-author'>
                    {book.authors.join(', ')}
                </div>

                {/*<div className='book-vfl-stars'>*/}
                {/*    <StarRate/>*/}
                {/*</div>*/}

            </div>


        </article>
    );

}


/**
 *
 * @param book
 * @param action
 * @returns {*}
 * @constructor
 */
const ViewMid = ({book, action}) => {

    return (
        <article className='book-view-mid'
                 onClick={() => showBook(book, action)}>

            <div>
                {book.image && <img src={book.image}/> || <span className='no-image'>No Image Available</span>}
            </div>

            <div>
                <h1>{book.title}</h1>
            </div>

            <div>
                <StarRate/>
            </div>

        </article>
    );

}


/**
 *
 * @param book
 * @param action
 * @returns {*}
 * @constructor
 */
const ViewMin = ({book, action}) => {

    return (
        <article className='book-view-min'
                 onClick={() => showBook(book, action)}>

            <div>
                {book.image && <img src={book.image}/> || <span className='no-image'>No Image Available</span>}
            </div>

            <div>
                <h1>{book.title}</h1>
            </div>

        </article>
    );

}


/**
 *
 * @param book
 * @param action
 */
const showBook = (book, action) => {

    let clone = action.cloneState();

    clone.data.currentBook = book;
    clone.ui.currentPage = APPVIEW.SHOWCASE;

    action.updateState(clone)
}


/*

 */
const StarRate = () => 'Stars';
