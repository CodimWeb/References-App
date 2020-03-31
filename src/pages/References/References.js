import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header.js';
import ReferencesNav from '../../components/ReferencesNav/ReferencesNav.js';
import Footer from '../../components/Footer/Footer.js';
import Profile from '../../components/Profile/Profile.js';
import ReferencesItem from '../../components/ReferencesItem/ReferencesItem.js';
import ModalRecordShare from '../../components/Modals/ModalRecordShare.js';
import ModalRemoveRef from '../../components/Modals/ModalRemoveRef.js';
import { getSharedLink } from '../../redux/actions/actions';
import getCookie from '../../config/getCookie.js'
import axios from 'axios';

var ES6Promise = require("es6-promise");
ES6Promise.polyfill();
console.log(ES6Promise, 'promise');

class References extends Component {
    constructor(props) {
        super(props)
        let hash = props.location.hash;
        hash = hash.slice(1)
        hash = hash.split('-').join('_');

        this.state = {
            referencesItems: [],
            isOpenModalRemoveRef: false,
            filter: hash ? hash : 'all', //for all by-me fore-me
            isCreateNewRef: this.props.sharedLink ? true : false, // проверяем если была создана шаред ссылка значит был создан новый реф надо обновить список рефов 
            countViews: 0,
            searchQuery: '',
            serchList: [],
            isOpenSearchDropdown: false,
            isShowClear: false,
            isOpenMobileSearch: false,
            cntShow: 12,
            cntStep: 4,
        }

        this.removeId = null; // нужен что б получить id удаляемого рефа
        this.userId = null; // нужен для создания плелиста
    }

    

    componentDidMount() {
        axios.get(`/references/${this.state.filter}/`)
        .then((response) => {
            this.setState({
                referencesItems: response.data
            })
        })
        
        axios.get('/profile/')
        .then((response) => {
           let data = response.data;
           this.userId = data.id;
        })

        axios.get(`/views/30-days/`)
        .then((response) => {
            this.setState({
                countViews: response.data.views,
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
    

    getNewReference = () => {
        axios.get(`/references/${this.state.filter}/`)
        .then((response) => {
            this.setState({
                referencesItems: response.data
            })
        })
    }

    deleteReference = (e, id) => {
        e.preventDefault();
        axios.get(`/delete/${id}/`)
        .then((response) => {
            // let newReferencesItems = this.state.referencesItems.filter((item) => {
            //     return item.id != id
            // })
            this.getNewReference();
            this.setState({
                isOpenModalRemoveRef: false,
                // referencesItems: newReferencesItems
            });
        })
    }

    openModalRemoveRef = (e, id) => {
        e.preventDefault();
        this.removeId = id;
        this.setState({isOpenModalRemoveRef: true});

    }

    closeModalRemoveRef = () => {
        this.setState({isOpenModalRemoveRef: false})
    }

    getNavFilter = (e) => {
        let filterLink = e.target.textContent;
        let filter = '';
        if(filterLink == 'all') {
            filter = 'all'
        } else if(filterLink == 'for me') {
            filter = 'for_me'

        } else if(filterLink == 'by me') {
            filter = 'by_me'
        }
        axios.get(`/references/${filter}/`)
        .then((response) => {
            this.setState({
                searchQuery: '',
                referencesItems: response.data,
                filter: filter,
            })
        })
    }

    handleSearch = (e) => {
        this.setState({
            searchQuery: e.target.value.toLowerCase(),
            isOpenSearchDropdown: true,
            isShowClear: e.target.value.length == 0 ? false : true,
        })
        const {referencesItems} = this.state;
        // console.log(e.target.value, 'value');
        this.filterSearch(referencesItems, e.target.value.toLowerCase())
        
    }

    filterSearch = (referencesItems, searchQuery) => {
        let searchResult = referencesItems.filter((item, index) => {
            // поиск среди одиночных референсов
            if(item.type == 1) {
                // если референс подтвержденный ищем по всем полям
                if(item.references_data[0].state == 2 || item.references_data[0].state == 3) {
                    const firstNameReference = item.references_data[0].reference_user_data.first_name.toLowerCase(); 
                    const lastNameReference = item.references_data[0].reference_user_data.last_name.toLowerCase();
                    const fullNameReference = `${firstNameReference} ${lastNameReference}`;
                    const firstNameCandidate = item.references_data[0].candidate_user_data.first_name.toLowerCase(); 
                    const lastNameCandidate = item.references_data[0].candidate_user_data.last_name.toLowerCase(); 
                    const fullNameCandidate = `${firstNameCandidate} ${lastNameCandidate}`;

                    if(searchQuery != '' && fullNameReference.indexOf(searchQuery) !== -1 || searchQuery != '' && fullNameCandidate.indexOf(searchQuery) !== -1) {    
                        if(fullNameReference.indexOf(searchQuery) !== -1) {
                            item.isFindByReferenceName = true;
                        } else {
                            item.isFindByReferenceName = false;
                        }
                        if(fullNameCandidate.indexOf(searchQuery) !== -1) {
                            item.isFindByCandidateName = true;
                        } else {
                            item.isFindByCandidateName = false;
                        }
                        return item;
                    }
                }
                // если не подтвержден ищем только по имени кандидата
                else if(item.references_data[0].state != 2 && item.references_data[0].state != 3) {
                    const firstName = item.references_data[0].candidate_user_data.first_name.toLowerCase(); 
                    const lastName = item.references_data[0].candidate_user_data.last_name.toLowerCase();
                    const fullName = `${firstName} ${lastName}`;
                    if(searchQuery != '' && fullName.indexOf(searchQuery) !== -1) {
                        item.isFindByCandidateName = true;
                        return item;
                    } else {
                        item.isFindByCandidateName = false;
                    }
                }
            }
            // поиск среди плейлистов плейлистам ищем только по имени кандидата
            else if(item.type == 2) {
                const firstNameCandidate = item.references_data[0].candidate_user_data.first_name.toLowerCase(); 
                const lastNameCandidate = item.references_data[0].candidate_user_data.last_name.toLowerCase(); 
                const fullNameCandidate = `${firstNameCandidate} ${lastNameCandidate}`;
                if(searchQuery != '' && fullNameCandidate.indexOf(searchQuery) !== -1) {
                    item.isFindByCandidateName = true;
                    return item;
                } else {
                    item.isFindByCandidateName = false;
                }
                
            }    
        })
        this.setState({
            searchList: searchResult
        })
        // console.log(searchResult, 'search Result')
    }

    selectSearchValue = (e) => {
        const {referencesItems} = this.state;
        this.filterSearch(referencesItems, e.target.textContent.toLowerCase())
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
        // console.log('asdfasdf')
    }

    openMobileSearch = () => {
        this.setState({
            isOpenMobileSearch: true
        })
    }

    render() {
        const { referencesItems, isOpenModalRemoveRef, countViews, searchQuery, searchList, isOpenMobileSearch, cntShow } = this.state;
        const { sharedLink } = this.props;

        // если строка поиска не пуста фильтруем исходный массив оставляя только подходящие рефы

        let ReferenceItems = [];
        
        if(searchQuery === '') {
            // если в поиск ничего не ввели
            if(referencesItems) {
                referencesItems.map((item, index) => {
                    let position = index;
                    item.isFindByCandidateName = false;
                    item.isFindByReferenceName = false;
                    if((position +1) % 4 != 0 ) {
                        if(item.type == 1) {
                            ReferenceItems.push(
                                <ReferencesItem data={item} key={index} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.references_data[0].id)}}/>
                            )
                        } else if(item.type == 2) {
                            ReferenceItems.push(
                                <ReferencesItem data={item} key={index} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.id)}}/>
                            )
                        }
                        
                    } else {
                        if(item.type == 1) {
                            ReferenceItems.push(
                                <Fragment key={`fragment-${index}`}>
                                    <ReferencesItem data={item} key={index} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.references_data[0].id)}}/>
                                    <div className="references-item__devider-desctop" key={`devider-${index}`}>
                                        <div></div>
                                    </div>
                                </Fragment>    
                            ) 
                        } else if(item.type == 2) {
                            ReferenceItems.push(
                                <Fragment key={`fragment-${index}`}>
                                    <ReferencesItem data={item} key={index} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.id)}}/>
                                    <div className="references-item__devider-desctop" key={`devider-${index}`}>
                                        <div></div>
                                    </div>
                                </Fragment>    
                            )
                        }
                        
                    }    
                });
            }
        } else {
            // если в поиск что то ввели
            searchList.map((item, index) => {
                let position = index;
                if((position +1) % 4 != 0 ) {
                    if(item.type == 1) {
                        ReferenceItems.push(
                            <ReferencesItem data={item} key={`search-${item.id}`} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.references_data[0].id)}}/>
                        )
                    } else if(item.type == 2) {
                        ReferenceItems.push(
                            <ReferencesItem data={item} key={`search-${item.id}`} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.id)}}/>
                        )
                    }
                    
                } else {
                    if(item.type == 1) {
                        ReferenceItems.push(
                            <Fragment key={`search-fragment-${item.id}`}>
                                <ReferencesItem data={item} key={`search-${item.id}`} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.references_data[0].id)}}/>
                                <div className="references-item__devider-desctop" key={`search-devider-${item.id}`}>
                                    <div></div>
                                </div>
                            </Fragment>    
                        ) 
                    } else if(item.type == 2) {
                        ReferenceItems.push(
                            <Fragment key={`search-fragment-${item.id}`}>
                                <ReferencesItem data={item} key={`search-${item.id}`} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.id)}}/>
                                <div className="references-item__devider-desctop" key={`search-devider-${item.id}`}>
                                    <div></div>
                                </div>
                            </Fragment>    
                        )
                    }
                    
                }    
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
                    page='reference'
                />
                <div className="content">
                    <ReferencesNav 
                        filter={ this.state.filter }
                        getNavFilter={(e) => {this.getNavFilter(e)}}
                        createPlayList={()=>{this.createPlayList(referencesItems)}}
                        searchQuery={searchQuery}
                        handleSearch={(e) => {this.handleSearch(e)}}
                        searchList={searchList}
                        selectSearchValue = {(e)=> {this.selectSearchValue(e)}}
                        isOpenSearchDropdown = {this.state.isOpenSearchDropdown}
                        isShowClear = {this.state.isShowClear}
                        clearSearchValue = {()=>{this.clearSearchValue()}}
                        isOpenMobileSearch = {isOpenMobileSearch}
                        openMobileSearch = {()=>{this.openMobileSearch()}}
                    />
                    <div className="references__content">
                        <div className="container">
                            { searchQuery ? 
                                (<p className="references__subtitle" >Results list: <span>{searchList.length}</span></p>)
                                :
                                (<p className="references__subtitle">You received {countViews} views in the past 30 days</p>)

                            }
                            <div className="row">                                
                                { ReferenceItems.map((item, index)=>{
                                    if(ReferenceItems.length < cntShow ) {
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
                <Profile></Profile>
                { sharedLink ? <ModalRecordShare getNewReference={() => {this.getNewReference()}} sharedLink={sharedLink}/> : null }
                { isOpenModalRemoveRef ? 
                    <ModalRemoveRef 
                        isOpen={isOpenModalRemoveRef}
                        deleteRef={(e) => {this.deleteReference(e, this.removeId)}} 
                        closeModalRemoveRef={this.closeModalRemoveRef} 
                    />
                     :
                    null 
                }
            </Fragment>
        );
    }    
    
}

const mapStateToProps = (state) => {
    return {
        sharedLink: state.getSharedLink.sharedLink,
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        onSetSharedLink: (payload) => dispatch(getSharedLink(payload))
    }
}

export default connect(mapStateToProps, mapDispachToProps)(References);