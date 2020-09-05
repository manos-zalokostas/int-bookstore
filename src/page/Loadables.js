import {lazy, Suspense} from "react";


const AdminPageLazy = lazy(() => import("./Admin"));
export const AdminPageLoadable = () =>
    <Suspense fallback={''}>
        <AdminPageLazy/>
    </Suspense>;


const SearchPageLazy = lazy(() => import("./Search"));
export const SearchPageLoadable = () =>
    <Suspense fallback={''}>
        <SearchPageLazy/>
    </Suspense>;


const ShowcasePageLazy = lazy(() => import("./Showcase"));
export const ShowcasePageLoadable = () =>
    <Suspense fallback={''}>
        <ShowcasePageLazy/>
    </Suspense>;
