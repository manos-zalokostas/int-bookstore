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
        <article id='page-home'>
            <h1>Welcome to Bookstore Task</h1>
        </article>
    )
}
