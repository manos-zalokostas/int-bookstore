/***************************************************
 *

 COMMON VALIDATORS
 **********************
 - BASIC VALIDATIONS THAT ARE SHARED TO THE COMPONENTS OF THE APP IN ORDER TO VALIDATE DATA TYPES AND CHARACTERISTICS OF VALUES


 *********************************/


import {getBookAttributes} from "_src/data/Datastore";

/**
 *
 * @param val
 * @returns {boolean}
 */
export const isString = (val) => {
    return typeof val === 'string';
}


/**
 *
 * @param val
 * @returns {boolean}
 */
export const isNumber = (val) => {
    return typeof val === 'number';
}


/**
 *
 * @param val
 * @returns {boolean|boolean}
 */
export const isArray = (val) => {
    return typeof val === 'object' && typeof val.push === 'function';
}


/**
 *
 * @param val
 * @param max
 * @param min
 * @returns {boolean}
 */
export const hasCharsLength = (val, max, min = 1) => {
    return isString(val) && val.length >= min && val.length <= max;
}


/**
 *
 * @param val
 * @returns {boolean|*}
 */
export const hasCharsCommon = (val) => {
    return isString(val) && val.match(/[a-zA-Z0-9]*/);
}


/**
 *
 * @param val
 * @returns {boolean|*}
 */
export const hasCharRestricted = (val) => {
    return isString(val) && val.match(/[^a-zA-Z0-9@"#&\*\!]/)
}


/**
 *
 * @param val
 * @returns {boolean|*}
 */
export const hasCharsUpper = (val) => {
    return isString(val) && val.match(/[A-Z]+/);
}


/**
 *
 * @param val
 * @param max
 * @param min
 * @returns {boolean}
 */
export const hasDigitsLength = (val, max, min = 1) => {
    return isNumber(val) && val >= min && val <= max;
}


/**
 *
 * @param val
 * @param max
 * @returns {boolean|boolean}
 */
export const isLowerThan = (val, max) => {
    return isNumber(val) && val < max;
}


/**
 *
 * @param arr
 * @param max
 * @returns {*|boolean}
 */
export const hasValidEntries = (arr, max) => {
    return isArray(arr) && arr[0] && isLowerThan(arr.length, max)
}


export const isRegistered = (val, arr) => {
    return arr.includes(val);
}

/**
 *
 * @param data
 * @returns {boolean|boolean}
 */
export const isValidBook = (data) => {

    let i10s = getBookAttributes('isbn10'),
        i13s = getBookAttributes('isbn13');


    return (
        hasCharsLength(data.title, 120, 10) && !hasCharRestricted(data.title)
        && hasCharsLength(data.description, 512, 10) && hasCharsUpper(data.description[0])
        && hasValidEntries(data.categories, 5)
        && hasValidEntries(data.authors, 4)
        && hasCharsLength(data.publisher, 60, 5)
        && hasDigitsLength(data.year, 9999, 1000)
        && hasDigitsLength(data.pages, 9999, 50)
        && hasDigitsLength(data.isbn13, 9999999999999, 100000000000) && !isRegistered(data.isbn10, i10s)
        && hasDigitsLength(data.isbn10, 9999999999, 1000000000) && !isRegistered(data.isbn13, i13s)
    )

}
