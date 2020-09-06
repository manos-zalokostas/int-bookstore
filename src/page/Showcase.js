import {useContext} from "react";
import {getBooksByAttr, getBooksByGroupAttr} from "_src/data/Datastore";
import {Book, VIEW} from "_src/component/Book";

import {AppContext} from "_src/AppContext";


const DEFAULT_FILTER = 'categories';


/**
 *
 * @returns {*}
 */
export default () => {

    let {data} = useContext(AppContext);


    return (
        <article className='page-showcase'>

            <section className='page-book'>

                <Book book={data.currentBook}/>

            </section>


            <section className='page-suggest'>

                <header>Other Book you may like</header>

                <div>
                    {
                        getBooksByGroupAttr(data.currentBook.categories[0], DEFAULT_FILTER).map(
                            book => (
                                <div>
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


