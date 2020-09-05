import {Book, VIEW} from "_src/component/Book";
import {getBooksByAttr, getBooksByGroupAttr} from "_src/data/Datastore";
import {DATA} from "_src/data/Data";


export default () => {

    return (
        <article className='page-showcase'>

            <section className='page-book'>

                <Book book={SAMPLEBOOK}/>

            </section>


            <section className='page-suggest'>

                <header>Other Book you may like</header>

                <div>
                    {
                        getBooksByGroupAttr(SAMPLECATEGORY, SAMPLEFILTER).map(
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


const SAMPLEBOOK = DATA.books[0];
const SAMPLECATEGORY = 'art';
const SAMPLEFILTER = 'category';
