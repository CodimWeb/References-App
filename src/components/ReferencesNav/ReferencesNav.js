import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ModalRequest from '../Modals/ModalRequest.js'
import axios from 'axios';

class ReferencesNav extends Component {
    constructor(props){
        super(props)

        this.state = {
            isOpenModalRequest: false,
            newRecord: false,
        }
    }

    componentDidMount() {
        axios.get(`/notifications/`)
        .then((response) => {
            response.data.new_record ? this.setState({newVideo: true}) : null
        }) 
    }

    toggleModal = () => {
        this.setState({
            isOpenModalRequest: !this.state.isOpenModalRequest
        })
    }

    getUniqNames = (arr) => {
        let resultNames = [];
        let names = [];
        // выбираем нужные имена в массив
        for(let i = 0; i < arr.length; i++) {
            if(arr[i].isFindByReferenceName) {
               let name = `${arr[i].references_data[0].reference_user_data.first_name} ${arr[i].references_data[0].reference_user_data.last_name}`;
               names.push(name);
            } else if(arr[i].isFindByCandidateName) {
                let name = `${arr[i].references_data[0].candidate_user_data.first_name} ${arr[i].references_data[0].candidate_user_data.last_name}`;
                names.push(name);
            }
        }

        let uniqNames = new Set(names);
        resultNames = [...uniqNames];
        return resultNames;
    }
 
    render(){
        const { isOpenModalRequest, newRecord } = this.state;
        const { filter, getNavFilter, isOpenMobileSearch, openMobileSearch, searchQuery, searchList, selectSearchValue, isOpenSearchDropdown, isShowClear } = this.props;

        let uniqNames = [];
        let displayNames = [];
        if(searchList) {
            uniqNames = this.getUniqNames(searchList);
            uniqNames.map((item, index) => {
                displayNames.push(
                    <li className="result-search__item" key={index}>
                        <span onClick={(e)=>{selectSearchValue(e)}}>
                            {item}
                        </span>    
                    </li>
                )
            });
        }

        return (
            <div className="references__nav-section">
                <div className="container">
                    <div className="row references__nav">
                        <div className="col-12 col-md-3">
                            <h1 className="h1 references__title">References</h1>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 references__nav__panel">
                            <div className="references__nav__tabs">
                                <ul className="references__nav__list">
                                    <li className="references__nav__item">
                                        <Link
                                            to="/references/#all" 
                                            onClick={(e) => {getNavFilter(e)}} 
                                            className={`references__nav__link ${filter == 'all' ? 'active' : '' } `}
                                        >
                                            all
                                        </Link>
                                    </li>
                                    <li className="references__nav__item">
                                        <Link 
                                            to="/references/#for-me" 
                                            onClick={(e) => {
                                                    getNavFilter(e)
                                                    this.setState({newVideo: false})
                                                }
                                            } 
                                            className={`references__nav__link ${filter == 'for_me' ? 'active' : '' } ${newRecord ? 'point' : ''}`}
                                        >
                                            for me
                                        </Link>
                                    </li>
                                    <li className="references__nav__item">
                                        <Link
                                            to="/references/#by-me"
                                            onClick={(e) => {getNavFilter(e)}}
                                            className={`references__nav__link ${filter == 'by_me' ? 'active' : '' } `}
                                        >
                                            by me
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className={`header__action header__action--mobile ${isOpenMobileSearch ? 'active' : ''}`}>
                                <div className="header__search">
                                    <form action="" className="header__form">
                                        <i className="icon icon-search" onClick={()=>{this.props.openMobileSearch()}}></i>
                                        <input type="text" className="form-control header__search-field" placeholder="Search"
                                            value={this.props.searchQuery} 
                                            onChange={(e)=> {this.props.handleSearch(e)}}
                                        />
                                        {searchQuery && !isShowClear ? (
                                            <button className="btn header__search-btn">
                                                <img src="/app/img/icons/arrow-circle-right.svg" alt="" />
                                            </button>
                                            ) : null
                                        }
                                        {isShowClear ? (
                                            <button className="btn header__search-btn" onClick={()=>{this.props.clearSearchValue()}}>
                                                <img src="/app/img/clear-search.png" alt=""/>
                                            </button>
                                            ) : null

                                        }
                                        {
                                            displayNames.length > 0 && isOpenSearchDropdown ? (
                                                <div className="result-search">
                                                    <div className="result-search__scroll-container">
                                                        <ul className="result-search__list">
                                                            {displayNames}
                                                            {/* <li className="result-search__item"><a href="#">Patrick Bateman</a></li>
                                                            <li className="result-search__item"><a href="#">Patriot</a></li>
                                                            <li className="result-search__item"><a href="#">Parlament</a></li>
                                                            <li className="result-search__item"><a href="#">Patrick Bateman</a></li>
                                                            <li className="result-search__item"><a href="#">Patriot</a></li>
                                                            <li className="result-search__item"><a href="#">Parlament</a></li>
                                                            <li className="result-search__item"><a href="#">Patrick Bateman</a></li>
                                                            <li className="result-search__item"><a href="#">Patriot</a></li>
                                                            <li className="result-search__item"><a href="#">Parlament</a></li> */}
                                                        </ul>
                                                    </div>    
                                                </div>
                                            ): null
                                        }
                                        {/* <button className="btn header__search-btn">
                                            <img src="img/icons/arrow-circle-right.svg" alt=""/>
                                        </button> */}
                                        {/* <div className="result-search">
                                            <div className="result-search__scroll-container">
                                                <ul className="result-search__list">
                                                    <li className="result-search__item"><a href="#">Patrick Bateman</a></li>
                                                    <li className="result-search__item"><a href="#">Patriot</a></li>
                                                    <li className="result-search__item"><a href="#">Parlament</a></li>
                                                    <li className="result-search__item"><a href="#">Patrick Bateman</a></li>
                                                    <li className="result-search__item"><a href="#">Patriot</a></li>
                                                    <li className="result-search__item"><a href="#">Parlament</a></li>
                                                    <li className="result-search__item"><a href="#">Patrick Bateman</a></li>
                                                    <li className="result-search__item"><a href="#">Patriot</a></li>
                                                    <li className="result-search__item"><a href="#">Parlament</a></li>
                                                </ul>
                                            </div>    
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 header__btn-container">
                            <div className="references__nav__action">
                                <button className="btn btn-primary btn-md" onClick={this.toggleModal}>Request</button>
                                <Link to="/share-all/" className="btn btn-secondary btn-md">Share all</Link>
                                {/* <button className="btn btn-secondary btn-md" onClick={this.props.createPlayList}>Share all</button> */}
                            </div>    
                        </div>    
                    </div>
                </div>
                { isOpenModalRequest ? <ModalRequest 
                                        isOpen={isOpenModalRequest}
                                        toggleModal={this.toggleModal} 
                                        />
                                    :
                 null }
                
            </div>
        );
    }
}

export default ReferencesNav;