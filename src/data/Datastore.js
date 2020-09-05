/*****************************************************
 *
 DATA ACTIONS
 ****************
 - PERFORMAS QUERIES TO DATA AND CACHES EVERY REQUEST TO 'LOCALSTORAGE'
 SO THAT IT WILL ONLY USED QUERIED ONCE

 - WHEN AN 'ADD' ACTION IS DISPATCHED, THE CACHE IS RESET AS NEW ENTRIES WILL
 HAVE TO BE QUERIED AND CACHED ALL OVER FROM START

 *
 *
 *
 ********************** */


import {getCachedItem, setCachedItem, setCacheData} from "_src/utils/Cache";
import {isValidBook} from "_src/utils/Valid";

import {DATA} from "_src/data/Data";


/**
 "VALID_FITLERS" ARE USED IN MANY ASPECTS OF THE APP
 - POPULATE FORM OPTIONS (SELECTBOX)
 - CROSSCHECK DATA ENTRY / QUERYING
 * ----------------------------
 *
 * @returns {string[]|*}
 */
export const getValidFilters = () => {

    let key = 'INT_VALID_FILTERS',
        cache = getCachedItem(key);

    if (cache) return cache;

    let data = Object.keys(DATA.books[0]);

    if (data) setCachedItem(key, data);

    return data;

}

const VALID_FILTERS = getValidFilters();


/**
 *
 * @param id
 * @returns {*|null}
 */
export const getBook = (id) => {

    let key = `INT_BOOK_ID_${id}`,
        cache = getCachedItem(key);

    if (cache) return cache;

    let data = DATA.books.any(book => book.isbn13 === id) || null;

    if (data) setCachedItem(key, data);

    return data;
}


/**
 GENERIC METHOD THAT PERFORMS 'FILTERING' ALL OF THE BOOK 'ATTRIBUTES', GIVEN A CERTAIN 'VALUE'
 *-------------------------------
 *
 * @param val
 * @param type
 * @returns {*|null}
 */
export const getBooksByAttr = (val, type) => {

    let key = `INT_BOOKS_BY_${type}_${val}`.toUpperCase(),
        cache = getCachedItem(key);

    if (cache) return cache;

    let data = VALID_FILTERS.includes(type)
        && DATA.books.filter(book => book[type] === val || book[type] === Number(val))
        || null;

    if (data) setCachedItem(key, data);

    return data;
}


/**
 GENERIC METHOD THAT PERFORMS 'FILTERING' ALL OF THE BOOK 'ATTRIBUTES' THAT CAN CARRY MORE THAN ONE VALUES (ARRAYS) LIKE 'CATEGORIES', 'AUTHORS'
 * ------------------------------------
 *
 * @param val
 * @param type
 * @returns {*|*[]|any}
 */
export const getBooksByGroupAttr = (val, type) => {

    let key = `INT_BOOK_BY_GROUP_${type}_${val}`.toUpperCase(),
        cache = getCachedItem(key);

    if (cache) return cache;

    let data = VALID_FILTERS.includes(type)
        && DATA.books.filter(book => book[type].includes(val))
        || [];

    if (data) setCachedItem(key, data);

    return data;
}


/**
 GET ALL ENTRIES FOR A CURRENT 'ATTRIBUTE'
 i.e GET ALL AVAILABLE 'ISBN' (SINGLE VALUES) OR 'CATEGORIES' (ARRAYS)
 => THE FUNCTION  REMOVES DUPLICATES ENTRIES WHEN AVAILABLE ('CATEOGRIES')
AND RETURNS AND CACHES ONLY UNIQUE ENTRIES.
 *------------------------------------------
 *
 * @param attr
 * @returns {boolean|*|any[]}
 */
export const getBookAttributes = (attr) => {

    let key = `INT_BOOK_ATTRS_${attr}`,
        cache = getCachedItem(key);

    if (cache) return cache;

    let data = VALID_FILTERS.includes(attr)
        && DATA.books.flatMap(book => book[attr])
    data.sort();
    data = [...new Set(data)];

    if (data) setCachedItem(key, data);

    return data;
}


/**
 THIS FUNCTION WITH PERFORM A SERIES OF TASKS WHILE INSERTING A NEW BOOK TO DATA
 - VALIDATE SCHEME AND DATATYPES
 - IF PASS => CLEAR STORAGE 'DATA' AND 'QUERIE-RESULTS' AS NEW ENTRIES WILL DEPRECATE BOTH
 - PUSH THE NEW BOOK TO DATA
 - CACHE NEW DATA
 * -----------------------------
 *
 * @param book
 */
export const addBook = (book) => {

    if (isValidBook(book)) {

        localStorage.clear();

        DATA.books.push(book);

        setCacheData(JSON.stringify(DATA))

        return
    }

    console.log('NOT VALID SCHEME', book);
};




