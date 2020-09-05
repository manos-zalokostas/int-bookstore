import {useContext} from 'react';
import {AppContext} from "_src/AppContext";

import {APPVIEW} from "_src/App";


/**
 *
 * @returns {*}
 */
export default () => {

    let {action} = useContext(AppContext);

    return (
        <article>
            <h1>Welcome to Bookstore App</h1>
        </article>
    )
}
