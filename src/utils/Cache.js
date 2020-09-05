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
 * @param jsondata
 * @private
 */
export const setCacheData = (jsondata) => localStorage.setItem(DATAKEY, jsondata);


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
    localStorage.setItem(idx, JSON.stringify(val))
}







