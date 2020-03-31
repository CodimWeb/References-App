import React, { Fragment } from 'react';
import Header from '../../components/Header/Header.js'

const Page404 = (props) => {
    return (
        <Fragment>
            <div className="content content-404">
                <h2 className="h1 nf__title">Page Not Found</h2>
                <div className="nf__container">
                    <img src="img/404.png" alt="" className="nf__img"/>
                </div>
                <div className="nf__back">
                    <a href="#" className="go-back">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span>back</span>
                    </a>
                </div>
            </div>
        </Fragment>
    );
}

export default Page404;