import {DATA} from "_src/data/Data";

/*****************************************************
 *
 *
 CACHE HANDLER
 ****************
 - PERFORMS CACHE INDEXING AND SERVIING
 *
 *
 ********************** */

const DATAKEY = 'CACHEDATA';


/**
 *
 * @returns {any}
 * @private
 */
export const getCacheData = () => JSON.parse(localStorage.getItem(DATAKEY));


/**
 *
 * @param data
 * @private
 */
export const setCacheData = (data) => localStorage.setItem(DATAKEY, JSON.stringify(data));


/**
 *
 * @param idx
 * @returns {null|any}
 * @private
 */
export const getCachedItem = (idx) => {

    let cache = localStorage.getItem(idx);

    if (cache) {
        console.log(`SERVED CACHED:: ${idx} `);
        return JSON.parse(cache);
    }
    return null;

};


/**
 *
 * @param idx
 * @param val
 */
export const setCachedItem = (idx, val) => {
    console.log(`REGISTER CACHE: :: ${idx} `);
    localStorage.setItem(idx, JSON.stringify(val))
}







