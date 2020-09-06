import {useContext} from "react";
import {getBooksByAttr, getBooksByGroupAttr} from "_src/data/Datastore";
import {Book, VIEW} from "_src/component/Book";

import {AppContext} from "_src/AppContext";
import {DATA} from "_src/data/Data";


const DEFAULT_FILTER = 'categories';
const SAMPLE_BOOK = DATA.books[0];
const SAMPLE_CATEGORY = 'art';


import "./showcase.scss";

/**
 *
 * @returns {*}
 */
export default () => {

    let {data} = useContext(AppContext),
        book = data.currentBook || SAMPLE_BOOK,
        category = data.currentBook
            ? data.currentBook.categories[0]
            : SAMPLE_CATEGORY


    return (
        <article id='page-showcase'>

            <section className='page-book'>

                <Book book={book}/>

            </section>


            <div className='prompt'>Other Book you may like</div>

            <section className='page-suggest'>


                <div>
                    {
                        getBooksByGroupAttr(category, DEFAULT_FILTER).map(
                            book => (
                                <div className='wrap-book-min'>
                                    <Book book={book} view={VIEW.MIN}/>
                                </div>
                            )
                        )
                    }
                </div>

            </section>


        </article>
    )

}


