import React, { Component, Fragment}  from 'react';
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { openProfile } from '../../redux/actions/actions';
import axios from 'axios';

class Header extends Component {
    constructor (props) {
        super(props);

        this.state = {
            isModalRecordOpen: false,
            newView: false,
        }
    }

    componentDidMount() {
        axios.get(`/notifications/`)
        .then((response) => {
            response.data.new_view ? this.setState({newView: true}) : null
        }) 
    }

    getUniqNames = (arr) => {
        let resultNames = [];
        let names = [];
        // выбираем нужные имена в массив
        for(let i = 0; i < arr.length; i++) {
            // если это референс
            if(arr[i].references_data) {
                if(arr[i].isFindByReferenceName) {
                let name = `${arr[i].references_data[0].reference_user_data.first_name} ${arr[i].references_data[0].reference_user_data.last_name}`;
                names.push(name);
                } else if(arr[i].isFindByCandidateName) {
                    let name = `${arr[i].references_data[0].candidate_user_data.first_name} ${arr[i].references_data[0].candidate_user_data.last_name}`;
                    names.push(name);
                }
            }
            // если это views
             else if(arr[i].viewed_user_data) {
                if(arr[i].isFindByReferenceName) {
                    let name = `${arr[i].viewed_user_data.first_name} ${arr[i].viewed_user_data.last_name}`;
                    names.push(name);
                }
            }
        }

        let uniqNames = new Set(names);
        resultNames = [...uniqNames];
        return resultNames;
    }

    render() { 
        // console.log(this.props);
        const { searchQuery, searchList, selectSearchValue, isOpenSearchDropdown, isShowClear, disabledSearch, page } = this.props;
        const { newView } = this.state;
        let isActiveReference = false;
        let isActiveShares = false;
        let isActiveViews = false;
        switch(page) {
            case 'reference' :
                isActiveReference = true;
                break;
            case 'shares' :
                isActiveShares = true;
                break;
            case 'views' : 
                isActiveViews = true;
                break;
            default :
                isActiveReference = true;
                isActiveShares = false;
                isActiveViews = false;  
        }
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
            <div className="header">
                <div className="container">
                    <div className="row header__row">
                        <div className="col-3 header__logo__container">
                            <Link to="/references/" className="header__logo">
                                <img src="/app/img/logo.svg" alt="" className="header__logo__img" />
                            </Link>
                        </div>
                        <div className="col-12 col-md-5 mobile-navbar">
                            <nav className="header__navbar">
                                <ul className="header__nav">
                                    <li className="header__nav__item">
                                        <NavLink exact to="/references/" className={`header__nav__link ${isActiveReference ? 'active' : ''}`}>
                                            <i className="icon icon-cinema"></i>
                                            References
                                        </NavLink>
                                    </li>
                                    <li className="header__nav__item">
                                        <NavLink to="/views/" className={`header__nav__link ${isActiveViews ? 'active' : ''} ${newView ? 'point' : ''}`}>
                                            <i className="icon icon-view"></i>
                                            My Views
                                        </NavLink>
                                    </li>
                                    <li className="header__nav__item">
                                        <NavLink to="/shares/" className={`header__nav__link ${isActiveShares ? 'active' : ''}`}>
                                            <i className="icon icon-star"></i>
                                            My Shares
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-4 offset-3 col-lg-3 offset-lg-0 header__search--desctop">
                            {!disabledSearch ? (
                                    <div className="header__action">
                                        <div className="header__search">
                                            <form action="" className="header__form">
                                                <i className="icon icon-search"></i>
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
                                                                </ul>
                                                            </div>    
                                                        </div>
                                                    ): null
                                                }
                                            </form>
                                        </div>
                                    </div>
                                )
                                :
                                null
                            }    
                        </div>
                        <div className="col-3 col-md-1">
                            <button className="btn btn-menu" onClick={this.props.onOpenProfile}>
                                <span className="line line-top"></span>
                                <span className="line line-bottom"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
const mapStateToProps = (state) => {
    return {
        isOpenProfile: state.toggleProfile.isOpenProfile,
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        onOpenProfile: () => dispatch(openProfile()),
    }
}

export default connect(mapStateToProps, mapDispachToProps)(Header);