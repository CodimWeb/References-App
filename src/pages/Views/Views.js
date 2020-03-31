import React, { Component, Fragment } from 'react';
import Header from '../../components/Header/Header.js';
import ReferencesNavShort from '../../components/ReferencesNav/ReferencesNavShort.js'
import Profile from '../../components/Profile/Profile.js';
import Footer from '../../components/Footer/Footer.js';
import ViewItem from '../Views/ViewItem.js'
import axios from'axios';

class Views extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countViews: null,
            viewsList: [],
            searchQuery: '',
            serchList: [],
            isOpenSearchDropdown: false,
            isShowClear: false,
            isOpenMobileSearch: false,
            cntShow: 9,
            cntStep: 6,
        }
    }

    componentDidMount() {
        axios.get(`/views/30-days/`)
        .then((response) => {
            this.setState({
                countViews: response.data.views,
            })
        })

        axios.get(`/get-views/`)
        .then((response) => {
            this.setState({
                viewsList: response.data,
            })
        })

        window.addEventListener('scroll', this.showMore)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.showMore);
    }

    showMore = (e) => {
        var B = document.body, 
        DE = document.documentElement,
        O = Math.min (B.clientHeight, DE.clientHeight); if (!O) O = B.clientHeight;
        var S = Math.max (B.scrollTop, DE.scrollTop),
        C = Math.max (B.scrollHeight, DE.scrollHeight);
        // console.log(O,'O')
        // console.log(S,'S')
        // console.log(C,'C')
        if (O + S >= (C - 100)) {
            
            this.setState({
                cntShow: this.state.cntShow + this.state.cntStep
            })
        }
    }

    handleSearch = (e) => {
        this.setState({
            searchQuery: e.target.value.toLowerCase(),
            isOpenSearchDropdown: true,
            isShowClear: e.target.value.length == 0 ? false : true,
        })
        const {viewsList} = this.state;
        this.filterSearch(viewsList, e.target.value.toLowerCase())
    }

    filterSearch = (viewsList, searchQuery) => {
        let searchResult = viewsList.filter((item, index) => {
            const firstNameReference = item.viewed_user_data.first_name.toLowerCase(); 
            const lastNameReference = item.viewed_user_data.last_name.toLowerCase();
            const fullNameReference = `${firstNameReference} ${lastNameReference}`;
            if(searchQuery != '' && fullNameReference.indexOf(searchQuery) !== -1) {    
                if(fullNameReference.indexOf(searchQuery) !== -1) {
                    item.isFindByReferenceName = true;
                } else {
                    item.isFindByReferenceName = false;
                }
                return item;
            }            
        })
        
        this.setState({
            searchList: searchResult
        })
       
    }

    selectSearchValue = (e) => {
        const {referencesItemShared} = this.state;
        this.filterSearch(referencesItemShared, e.target.textContent.toLowerCase())
        this.setState({
            searchQuery: e.target.textContent,
            isOpenSearchDropdown: false,
            isShowClear: true,
        })
    }

    clearSearchValue = () => {
        this.setState({
            searchQuery: '',
            isShowClear: false,
            serchList: [],
        })

    }

    render() {
        const { countViews, viewsList, searchQuery, searchList, isOpenMobileSearch, cntShow } = this.state;
        let views = [];

        if(searchQuery === '') {
            if(viewsList) {
                viewsList.map((item, index) => {
                    item.isFindByReferenceName = false;
                    views.push(
                        <ViewItem data={item} key={item.id} />
                    )
                });
            }
        } else {
            // если в поиск что то ввели
            searchList.map((item, index) => {
                views.push(
                    <ViewItem data={item} key={item.id} />
                )
            });
        } 

        return (
            <Fragment>
                <Header 
                    searchQuery={searchQuery} 
                    handleSearch={(e) => {this.handleSearch(e)}} 
                    searchList={searchList}
                    selectSearchValue = {(e)=> {this.selectSearchValue(e)}}
                    isOpenSearchDropdown = {this.state.isOpenSearchDropdown}
                    isShowClear = {this.state.isShowClear}
                    clearSearchValue = {()=>{this.clearSearchValue()}}
                    page='views'
                />
                <div className="content">
                    <ReferencesNavShort title={'My Views'}/>
                    <div className="references__content">
                        <div className="container">
                            { searchQuery ? 
                                (<p className="references__subtitle" >Results list: <span>{searchList.length}</span></p>)
                                :
                                (<p className="references__subtitle">You received {countViews} views in the past 30 days</p>)

                            }
                            <div className="row views-container">
                                {/* {views} */}
                                { views.map((item, index)=>{
                                    if(views.length < cntShow ) {
                                        return item;
                                    } else {
                                        if(index < cntShow) {
                                            return item;
                                        }
                                    }      
                                }) }
                            </div>
                        </div>
                    </div>        
                </div>
                <Footer></Footer>
                <Profile />
            </Fragment>
        );
    }
    
}

export default Views;