/**************************************************
 *
 *
 THE ROOT FILE 'APP'
 ***********************
 - THE SCRIPT HOLDS THE 'STATE' OF THE APP, CREATES AND SHARES METHODS TO INTERACT WITH  AND PROVIDES THE 'ROUTING' MECHANISM
 => THE STATE 'UI' FIELD HOLDS THE 'CURRENT-PAGE', THAT UPPON UPDATE WILL DEFINE THE UI FLOW PATH

 - THE STATE 'ACTION' FIELD CREATES METHODS THAT MANIPULATE THE ROOT STATE AND SHARES THEM TO CHILD COMPONENTS TO ALLOW THEM TO INTERACT w/ IT
 => THE 'CLONE' GROUP INVOKES A DEEP COPY w/ JSON SERIALIZATION SO THAT THE STATE CANNOT GET DIRECTLY ACCESSED
 => THE 'UPDATE' GROUP RECEIVES AN UPDATED CLONE OF THE STATE AND DISPATCHES THE UPDATE
 => THE 'XXX-STATE' WILL INTERACT w/ THE STATE AS A WHOLE
 => THE 'XXX-FIELD' WILL INTERACT w/ THE STATE'S GIVEN FIELD'

 *
 */


import {AdminPageLoadable, SearchPageLoadable, ShowcasePageLoadable} from "_src/page/Loadables";
import HomePage from './page/Home'
import {Home, Search, Admin, Reset} from "_src/comon/SVGIcon";

import {AppContext} from "./AppContext";
import {CATEGORY} from "_src/data/Data";

import "./app.scss";


/*

 */
export const APPVIEW = {
    HOME: 1,
    ADMIN: 2,
    SEARCH: 3,
    SHOWCASE: 4
};


/**
 *
 */
export class App extends React.Component {


    state = {
        data: {
            datalist: null,
            booklist: null,
            bookfilter: null,
            currentBook: null
        },
        ui: {
            currentPage: null
        },
        action: {
            cloneState: () => ({...JSON.parse(JSON.stringify(this.state)), action: this.state.action}),
            updateState: (state) => this.setState(state),
            cloneField: (attr) => JSON.parse(JSON.stringify(this.state[attr])),
            updateField: (attr, val) => this.setState({[attr]: val}),
        }
    };


    /**
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {

        let data = this.state.action.cloneField('data'),
            ui = this.state.action.cloneField('ui');

        data.datalist = Object.values(CATEGORY);
        data.bookfilter = 'categories';
        ui.currentPage = APPVIEW.HOME;

        this.setState({data, ui})

    }


    /**
     *
     * @returns {*}
     */
    render() {

        return this.state.ui && (
            <AppContext.Provider value={this.state}>
                <NavigationMenu root={this}/>
                <Router page={this.state.ui.currentPage}/>
            </AppContext.Provider>
        ) || null


    };

}


/**
 *
 * @param root
 * @returns {*}
 * @constructor
 */
const NavigationMenu = ({root}) => {

    return (
        <>
            <nav id='navigation-menu'>
                <a title='Home' className={APPVIEW.HOME === root.state.ui.currentPage ? 'active' : ''}
                   onClick={() => root.setState({ui: {currentPage: APPVIEW.HOME}})}>{<Home />}</a>
                <a title='Search' className={APPVIEW.SEARCH === root.state.ui.currentPage ? 'active' : ''}
                   onClick={() => root.setState({ui: {currentPage: APPVIEW.SEARCH}})}>{<Search/>}</a>
                <a title='Admin' className={APPVIEW.ADMIN === root.state.ui.currentPage ? 'active' : ''}
                   onClick={() => root.setState({ui: {currentPage: APPVIEW.ADMIN}})}>{<Admin/>}</a>
                <a title='Reset'
                   onClick={() => localStorage.clear() || window.location.reload()}>{<Reset/>}</a>
            </nav>
            <hr />
        </>
    );

}


/**
 *
 * @param page
 * @returns {*}
 * @constructor
 */
const Router = ({page}) => {
    return Routes[page] || <HomePage/>
}


/*

 */
const Routes = {
    [APPVIEW.ADMIN]: <AdminPageLoadable/>,
    [APPVIEW.SEARCH]: <SearchPageLoadable/>,
    [APPVIEW.SHOWCASE]: <ShowcasePageLoadable/>
}
