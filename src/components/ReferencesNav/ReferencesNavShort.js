import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ReferencesNavShort extends Component {
    constructor(props){
        super(props)

        this.state = {
            
        }
    }
 
    render(){
        const {title, shareAll, createPlayList} = this.props;
        return (
            <div className="references__nav-section">
                <div className="container">
                    <div className="references__nav">
                        <div>
                            <h1 className="h1 references__title references__title--share">{title}</h1>
                            {shareAll ? (
                                    <button className="btn btn-primary btn-share btn-share--desctop" onClick={()=>{createPlayList()}}>SHARE</button>
                                )
                                :
                                null
                            }
                        </div>    
                        <Link to="/references/" className="go-back">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 12H3" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 16L3 12L7 8" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>back</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReferencesNavShort;