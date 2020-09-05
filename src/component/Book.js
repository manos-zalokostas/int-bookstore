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

    if (view === VIEW.MIN) return <ViewMin book={book}/>

    if (view === VIEW.MID) return <ViewMid book={book}/>

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
        <article className='bokk-view-full'>

            <div className='book-vfl-row1'>

                <div className='book-vfl-col1'>
                    <img src={book.image} style={{width: 200, height: 100}}/>
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

                <div className='book-vfl-stars'>
                    <StarRate/>
                </div>

            </div>


        </article>
    );

}


/**
 *
 * @param book
 * @returns {*}
 * @constructor
 */
const ViewMid = ({book}) => {

    return (
        <article className='book-view-mid'>

            <div>
                <img src={book.image} style={{width: 100, height: 50}}/>
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
 * @returns {*}
 * @constructor
 */
const ViewMin = ({book}) => {

    return (
        <article className='book-view-min'>

            <div>
                <img src={book.image} style={{width: 100, height: 50}}/>
            </div>

            <div>
                <h1>{book.title}</h1>
            </div>

        </article>
    );

}


const StarRate = () => 'Stars';
