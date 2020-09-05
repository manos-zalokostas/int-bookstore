import {AppContext} from "./AppContext";
import HomePage from './page/Home'
import {AdminPageLoadable, SearchPageLoadable, ShowcasePageLoadable} from "_src/page/Loadables";


import "./app.scss";


import {CATEGORY} from "_src/data/Data";


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
            booklist: null
        },
        ui: {
            currentPage: null
        },
        action: {
            cloneRoot: (attr) => JSON.parse(JSON.stringify(this.state[attr])),
            updateRoot: (attr, val) => this.setState({[attr]: val})
        }
    };


    /**
     *
     * @returns {Promise<void>}
     */
    async componentDidMount() {

        let data = this.state.action.cloneRoot('data'),
            ui = this.state.action.cloneRoot('ui');

        data.datalist = Object.values(CATEGORY);
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
                <button onClick={() => this.setState({ui: {currentPage: APPVIEW.HOME}})}>HOME</button>
                <button onClick={() => this.setState({ui: {currentPage: APPVIEW.SEARCH}})}>SEARCH</button>
                <button onClick={() => this.setState({ui: {currentPage: APPVIEW.ADMIN}})}>ADMIN</button>
                {
                    (this.state.ui.currentPage === APPVIEW.ADMIN && <AdminPageLoadable/>)
                    || (this.state.ui.currentPage === APPVIEW.SEARCH && <SearchPageLoadable/>)
                    || (this.state.ui.currentPage === APPVIEW.SHOWCASE && <ShowcasePageLoadable/>)
                    || <HomePage/>
                }
            </AppContext.Provider>
        ) || null


    };

}
