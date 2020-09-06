/**********************************************************
 *
 *
 PAGE SEARCH
 ******************
 RETRIEVES ALL AVAILABLE BOOK ATTRIBUTES FROM DATASTORE AND CREATES FILTERS FOR THE USERS TO SELECT
 - USER SELECTION WILL POPULATE THE HTML SELECTLIST w/ ALL AVAILABLE ENTIES (UNIQUE)
 - SELECTION ENTRIES WILL FITLER DATA  AND EVENTUALLY ENUMERATE RESPECTIVE BOOKS ON DISPLAY
 - BOOK SELECTION WILL LEAD THE USER TO 'SHOWCASE' PAGE FOR RESPECTIVE BOOK

 ** ALL DATA QUERIES ARE CACHED AND WILL BE SERVERD IN A TIME-EFFICIENT MANNER AFTER THE INITIAL RETRIEVALS
 *
 *
 *********************************************************/


import {useContext} from 'react';

import {getBooksByAttr, getBookAttributes, getBooksByGroupAttr, getValidFilters} from "_src/data/Datastore";
import {Book, VIEW} from "_src/component/Book";

import {AppContext} from "_src/AppContext";


const MULTIVALUE_ATTRIBUTES = ['categories', 'authors'];


/**
 *
 * @returns {*}
 */
export default () => {

    let {data, action} = useContext(AppContext);


    return (
        <article>

            <header>SEARCH TO FIND YOUR NEW BOOK</header>

            <form>

                <SelectList cnf={{data, action}}/>

                <RadioButtons cnf={{data, action}}/>

            </form>

            <hr/>

            <BookList cnf={{data}}/>

        </article>
    )
}


/**
 * THE 'SELECTION-LIST' THAT GETS POPULATED w/ ENTRIES AFTER USER HAVE CHOSEN TO USE A CERTAIN FILTER
 *------------------------------------------------
 *
 * @param list
 * @returns {*}
 * @constructor
 */
const SelectList = ({cnf}) => {

    return (
        <>
            <input id='datalist' list="filters" placeholder='search . . . '
                   onChange={(evt) => populateFilteredBooks(
                       evt.target.value,
                       document.querySelector('[name]:checked').value,
                       cnf.action)}
                   onFocus={() => document.querySelector('input').value = ''}
            />
            <datalist id="filters">
                {cnf.data.datalist.map(type =>
                    <option value={type}/>
                )}
            </datalist>
        </>
    )

}


/**
 *  RADIO BUTTONS ARE BUILD BY 'BOOK' ATTRIBUTES SCHEME RECOGNITION
 * --------------------------------------------
 *
 * @returns {*[]}
 * @constructor
 */
const RadioButtons = ({cnf}) => {

    const types = getValidFilters();
// debugger
    return types.map(type => (
        <>
            <input type="radio" id={type} name="filter" value={type} checked={cnf.data.bookfilter === type}
                   onClick={() => populateSelectList(type, cnf.action)}/>
            <label htmlFor={type}>{type}</label>
        </>
    ))
};


/**\
 THE EVENTUAL SELECTION AND BOOKS DISPLAY STREAM AFTER THE USER FILTERS HAVE BEEN APPLIED
 * ----------------------------------------------------------------
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const BookList = ({cnf}) => {
    return cnf.data.booklist && (
        cnf.data.booklist.map(
            book => (
                <div>
                    <Book book={book} view={VIEW.MID}/>
                </div>
            )
        )
    ) || null
}


/**
 *  DATA RETRIEVAL FOR BOOK USER-SELECTED FILTERING.
 ALL AVAILABLE ENTRIES FOR CERTAIN FILTER ARE RETURNED
 *------------------------------------------------------
 *
 * @param filter
 * @param action
 * @returns {Promise<void>}
 */
const populateSelectList = async (filter, action) => {

    let datalist = await getBookAttributes(filter);

    let data = action.cloneRoot('data');
    data.datalist = datalist;
    data.bookfilter = filter;


    action.updateRoot('data', data)
}


/**
 * DISTINCT THE METHOD THAT WILL BE USED TO RETRIEVE AND POPULATE BOOKS
 * THE DISTINCTION IS MADE BETWIEEN
 * - SINGLE VALUE ENTIES ( i.e  ISBN,)
 *  MULTI VALUE ENTRIES (i.e CATEGORIES)
 *  -----------------------------------------------
 *
 * @param filter
 * @param type
 * @param action
 * @returns {Promise<void>}
 */
const populateFilteredBooks = async (filter, type, action) => {

    if (MULTIVALUE_ATTRIBUTES.includes(type)) {
        return filterEntriesMulti(filter, type, action);
    }

    return filterEntriesSingle(filter, type, action);
}


/**
 * SINGLE ENTRY VALUE RETRIEVEAL
 * ------------------------------------------
 *
 * @param filter
 * @param type
 * @param action
 * @returns {Promise<void>}
 */
const filterEntriesMulti = async (filter, type, action) => {
    let booklist, data;

    booklist = await getBooksByGroupAttr(filter, type);
    data = action.cloneRoot('data');

    data.booklist = booklist;

    action.updateRoot('data', data)
}


/**
 * MULTI ENTRY VALUE RETRIEVEAL
 *-----------------------------------
 *
 * @param filter
 * @param type
 * @param action
 * @returns {Promise<void>}
 */
const filterEntriesSingle = async (filter, type, action) => {
    let booklist, data;

    filter = enforceDatatype(type, filter)

    booklist = await getBooksByAttr(filter, type);
    data = action.cloneRoot('data');

    data.booklist = booklist;

    action.updateRoot('data', data);

}


/**
 *
 * @param type
 * @param filter
 */
const enforceDatatype = (type, filter) => {

    if (type === 'pages') return Number(filter);

    return filter

}
