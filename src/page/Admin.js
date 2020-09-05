/*****************************************************
 *
 PAGE ADMIN
 *****************
 THE PAGE HANDLES DATA ENTRIES FOR NEW BOOKS
 FORM ELEMENTS HAVE BEEN CONVERTED TO REACT ELEMENTS AND ALL FOLLOW AN ALIKE PATTERN OF INVOCATION
 THERE IS A 'CONDITION' THAT IS PASSED AS A WAY TO PERFORM DATA TYPE VALIDATION
 - IF VALID => THE "STATE-DATA" IS POPULATED AND RESP "STATE-ERROR" IS RESET TO FALSE
 - IF NON-VALID => THE "STATE-DATA" REMAINS EMPTY AND "STATE-ERROR" IS SET TO TRUE

 VALIDATION IS PERFORMED EVERY TIME A 'BLUR' EVENT OCCURS, WHERE USER LEAVES THE RESP INPUT.

 ALL ELEMENTS RETAIN A 'ERROR' DIV BELOW THEM, THAT RESPONDS TO 'STATE-ERROR' VALUES
 AND DISPLAYS / HIDES MESSAGES ACCORDINGLY WHEN MATCHING ATTRIBUTES ARE MET AND ARE SET TO 'TRUE'
 *
 *
 * ********************************************************/


import {useState} from 'react';
import {hasCharsLength, hasCharRestricted, hasCharsUpper, hasDigitsLength, hasValidEntries, isLowerOrEqualTo} from "_src/utils/Valid";
import {addBook} from "_src/data/Datastore";

import {CATEGORY, AUTHORS} from "_src/data/Data";
import {isArray} from "_src/utils/Valid";


const SCHEME = {
    title: '',
    description: '',
    categories: [],
    authors: [],
    publisher: '',
    year: '',
    pages: '',
    isbn13: '',
    isbn10: '',
    // image: '',
};


export default () => {

    let [data, setData] = useState({...SCHEME}),
        [error, setError] = useState({
            title: 0,
            description: 0,
            categories: 0,
            authors: 0,
            publisher: 0,
            year: 0,
            pages: 0,
            isbn13: 0,
            isbn10: 0,
            image: 0,
            generic: 0
        })

    let cnf = {data, error, setData, setError};

    return (
        <form>

            <div>
                <Label attr="title" info={ERR.TITL}/>
                <InputTitle cnf={cnf}/>
                <ErrorMessage props={[error.title, ERR.TITL]}/>
            </div>

            <div>
                <Label attr="description" info={ERR.DESC}/>
                <TextAreaDescription cnf={cnf}/>
                <ErrorMessage props={[error.description, ERR.DESC]}/>
            </div>

            <div>
                <Label attr="categories" info={ERR.CAT}/>
                <SelectCategories cnf={cnf}/>
                <ErrorMessage props={[error.categories, ERR.CAT]}/>
            </div>

            <div>
                <Label attr="authors" info={ERR.AUTH}/>
                <SelectAuthors cnf={cnf}/>
                <ErrorMessage props={[error.authors, ERR.AUTH]}/>
            </div>

            <div>
                <Label attr="publisher" info={ERR.PUB}/>
                <InputPublisher cnf={cnf}/>
                <ErrorMessage props={[error.publisher, ERR.PUB]}/>
            </div>

            <div>
                <Label attr="year" info={ERR.YEAR}/>
                <InputYear cnf={cnf}/>
                <ErrorMessage props={[error.year, ERR.YEAR]}/>
            </div>

            <div>
                <Label attr="pages" info={ERR.PAGE}/>
                <InputPages cnf={cnf}/>
                <ErrorMessage props={[error.pages, ERR.PAGE]}/>
            </div>

            <div>
                <Label attr="isbn13" info={ERR.I13}/>
                <InputIsbn13 cnf={cnf}/>
                <ErrorMessage props={[error.isbn13, ERR.I13]}/>
            </div>

            <div>
                <Label attr="isbn10" info={ERR.I10}/>
                <InputIsbn10 cnf={cnf}/>
                <ErrorMessage props={[error.isbn10, ERR.I10]}/>
            </div>


            <div>
                <label htmlFor="image">Choose a profile picture:</label>
                <InputImage cnf={cnf}/>
            </div>


            <hr/>

            <input type='button' value='submit' disabled={shouldDisable(data, error)}
                   onClick={() => _handleFormSubmission(cnf)}
            />
            <ErrorMessage props={[error.generic, ERR.GEN]}/>
        </form>
    )
}


/**
 CONTROL FORM BUTTON READINESS
 ***********************************
 - VERIFY THAT VALUES ARE NOT EMPTY STRINGS / ARRAYS ('' || [])
 - VERIFY 'STATE-ERROR' MAP DOES NOT REPORT ANY ERRORS

 **  'GENERIC ERROR' IS CONTROLLED BY THE DATASTORE REPORTING AND THUS CANNOT BLOCK THE BUTTON
 => IT ONLY INFORMS THS  USERS AND PROMPTS  THEM TO BE CAUTIOUS
 *--------------------------------
 *
 * @param data
 * @param error
 * @returns {boolean}
 */
const shouldDisable = (data, error) => {
    return (
        Object.values(data).some(value => value === '' || (isArray(value) && !value[0]))
        || Object.entries(error).some(([key, value]) => key !== 'generic' && value === 1)

    );
}


/**
 FORM SUBMISSION WILL USE A PROMISE TO RETRIEVE ASYNC DATA FROM DATASTORE BOOK ENTRY
 THIS IS MANDATORY AT THIS PHASE AS DATASTORE WILL NEED TO PERFORM OWN DATA VALIDATION BEFORE REPLYING
 MOREOVER IT WILL NEED TO PERFORM EXTRA CHECKS LIKE UNIQUE ISBNs VERIFICATION
 IF THE REGISTERATION FAILS, THEN A 'GENERIC' DATA ENTRY ERROR MESSAGE WILL BE USED TO ALERT USERS,
 OTHERWISE FORM WILL BE CLEARED ARE REUSABLE FURTHER
 * --------------------------------------------
 *
 * @param cnf
 * @private
 */
const _handleFormSubmission = (cnf) => {
    let {data, error, setData, setError} = cnf;

    addBook(data)
        .then(() => {
            setData({...SCHEME});
            setError({...error, generic: 0});
            document.querySelector('form').reset();
        })
        .catch((msg) => {
            setError({...error, generic: 1});
        })
};


/**
 * THE FIELD IS CONSIDERED NON-MANDATORY AND THEREFORE IS NOT EVALUATED ON SUBMISSION
 THAT IS BECAUSE OLDER BROWSERS PROBABLY DO NOT SUPPORT AND 'FILE-READER' API
 AND ARE NOT ABLE TO LOAD THE IMAGE (THEN AN ALERT MESSAGE INFORMS THEM)

 ** THE VALIDATION IS PERFORMED BY THE 'ACCEPT ATTRIBUTE
 *----------------------------------------------------------
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const InputImage = ({cnf}) => {
    let {data, setData} = cnf;

    /*****************************************************************
     REFERENCE
     https://stackoverflow.com/questions/36017369/saving-an-uploaded-image-to-localstorage-chrome-extension
     ************/

    return (
        <input type="file" id="bookcover" name="bookcover" accept="image/png, image/jpeg"
               onChange={(evt) => {
                   if (FileReader && evt.target.files && evt.target.files.length) {
                       const fr = new FileReader();
                       fr.onload = function () {
                           setData({...data, image: fr.result})
                       }
                       fr.readAsDataURL(evt.target.files[0]);
                   } else {
                       alert('Please use latest Browsers if your want to store Book-covers')
                   }
               }}
        />
    );
}


/**
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const InputTitle = ({cnf}) => {
    let {data, error, setData, setError} = cnf;
    return (
        <>
            <input id='title' type='string' value={data.title}
                   onChange={(evt) => setData({...data, title: evt.target.value})}
                   onBlur={(evt) => updateError(hasCharsLength(data.title, 120, 10) && !hasCharRestricted(data.title),
                       'title', error, setError)}/>
        </>
    )
}


/**
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const TextAreaDescription = ({cnf}) => {
    let {data, error, setData, setError} = cnf;
    return (
        <>
            <textarea id='description'
                      onChange={(evt) => setData({...data, description: evt.target.value})}
                      onBlur={(evt) => updateError(hasCharsLength(data.description, 512, 10) && hasCharsUpper(data.description[0]),
                          'description', error, setError)}>
            {data.description}
            </textarea>
        </>
    )
}


/**
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const SelectCategories = ({cnf}) => {
    let {data, error, setData, setError} = cnf;
    return (
        <>
            <select id='categories' name='categories' multiple
                    onChange={(evt) => setData({...data, categories: Array.from(evt.target.selectedOptions).map(o => o.value)})}
                    onBlur={(evt) => updateError(hasValidEntries(data.categories, 5),
                        'categories', error, setError)}>
                {
                    Object.values((CATEGORY)).map(cateogry => <option value={cateogry}>{cateogry}</option>)
                }
            </select>
        </>
    )
}


/**
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const SelectAuthors = ({cnf}) => {
    let {data, error, setData, setError} = cnf;
    return (
        <>
            <select id='authors' name='authors' multiple
                    onChange={(evt) => setData({...data, authors: Array.from(evt.target.selectedOptions).map(o => o.value)})}
                    onBlur={(evt) => updateError(hasValidEntries(data.authors, 4),
                        'authors', error, setError)}>
                {
                    Object.values((AUTHORS)).map(aurhor => <option value={aurhor}>{aurhor}</option>)
                }
            </select>
        </>
    )
}


/**
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const InputPublisher = ({cnf}) => {
    let {data, error, setData, setError} = cnf;
    return (
        <>
            <input id='publisher' type='text' value={data.publisher}
                   onChange={(evt) => setData({...data, publisher: evt.target.value})}
                   onBlur={(evt) => updateError(hasCharsLength(data.publisher, 60, 5),
                       'publisher', error, setError)}/>
        </>
    )
}


/**
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const InputYear = ({cnf}) => {
    let {data, error, setData, setError} = cnf;
    return (
        <>
            <input id='year' type='number' value={data.year}
                   onChange={(evt) => setData({...data, year: Number(evt.target.value)})}
                   onBlur={(evt) => updateError(hasDigitsLength(data.year, 9999, 1000) && isLowerOrEqualTo(data.year, (new Date()).getFullYear()),
                       'year', error, setError)}/>
        </>)
}


/**
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const InputPages = ({cnf}) => {
    let {data, error, setData, setError} = cnf;
    return (
        <>
            <input id='pages' type='number' value={data.pages}
                   onChange={(evt) => setData({...data, pages: Number(evt.target.value)})}
                   onBlur={(evt) => updateError(hasDigitsLength(data.pages, 9999, 50),
                       'pages', error, setError)}/>
        </>
    )
}


/**
 * NOTE:
 * THE VALIDATION USED WITH EXCESSIVE NUMBER (i.e 9999999999999, 100000000000)
 OCCURS ONLY FOR "SIMPLICITY" IN A WAY TO AVOID OVERPOPULATING VALIDATORS
 => OTHERWISE A 'REGEX' LIKE /\d{13}/ COULD BE USED FOR READABILITY
 *--------------------------------------------------
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const InputIsbn13 = ({cnf}) => {
    let {data, error, setData, setError} = cnf;
    return (
        <>
            <input id='isbn13' type='number' value={data.isbn13}
                   onChange={(evt) => setData({...data, isbn13: Number(evt.target.value)})}
                   onBlur={(evt) => updateError(hasDigitsLength(data.isbn13, 9999999999999, 100000000000),
                       'isbn13', error, setError)}/>
        </>
    )
}


/**
 * * NOTE:
 * THE VALIDATION USED WITH EXCESSIVE NUMBER (i.e 9999999999999, 100000000000)
 OCCURS ONLY FOR "SIMPLICITY" IN A WAY TO AVOID OVERPOPULATING VALIDATORS
 => OTHERWISE A 'REGEX' LIKE /\d{10}/ COULD BE USED FOR READABILITY
 *--------------------------------------------------
 *
 * @param cnf
 * @returns {*}
 * @constructor
 */
const InputIsbn10 = ({cnf}) => {
    let {data, error, setData, setError} = cnf;
    return (
        <>
            <input id='isbn10' type='number' value={data.isbn10}
                   onChange={(evt) => setData({...data, isbn10: Number(evt.target.value)})}
                   onBlur={(evt) => updateError(hasDigitsLength(data.isbn10, 9999999999, 1000000000),
                       'isbn10', error, setError)}/>
        </>)
}


/**
 *
 * @param condition
 * @param attr
 * @param error
 * @param setError
 * @returns {*}
 */
const updateError = (condition, attr, error, setError) => condition
    ? setError({...error, [attr]: 0})
    : setError({...error, [attr]: 1});


/**
 *
 * @param attr
 * @param info
 * @returns {*}
 * @constructor
 */
const Label = ({attr, info}) => <label htmlFor={attr}>{attr}<span title={info}>  ? </span></label>;


/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const ErrorMessage = ({props}) => <span className='int-error'>{props[0] && props[1] || ''}</span>;


/*

 */
const ERR = {
    TITL: 'max 120 characters min 10, allow the following special characters: @”#&*!',
    DESC: 'max 512 characters and must start with the first letter be uppercase',
    CAT: 'max 4 categories',
    AUTH: 'max 3 Authors',
    PUB: 'max 60 characters min 5',
    YEAR: 'exactly 4 digits and less/equal to current year',
    PAGE: 'max number of pages 9999',
    I13: 'exactly 13 digits and must be unique',
    I10: 'exactly 10 digits and must be unique',
    GEN: 'data not accepted. please follow data rules and try again'
}
