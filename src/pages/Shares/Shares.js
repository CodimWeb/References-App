import React, { Component, Fragment } from 'react';
import Header from '../../components/Header/Header.js';
import ReferencesNavShort from '../../components/ReferencesNav/ReferencesNavShort.js';
import ReferencesItemShared from '../../components/ReferencesItem/ReferencesItemShared.js';
import ModalRemoveRef from '../../components/Modals/ModalRemoveRef.js';
import Footer from '../../components/Footer/Footer.js';
import Profile from '../../components/Profile/Profile.js';
import axios from'axios'

class Shares extends Component {
    constructor(props) {
        super(props)

        this.state = {
            referencesItemShared: [],
            isOpenModalRemoveRef: false,
            searchQuery: '',
            serchList: [],
            isOpenSearchDropdown: false,
            isShowClear: false,
            isOpenMobileSearch: false,
            cntShow: 12,
            cntStep: 4,
        }

        this.removeId = null; // нужен что б получить id удаляемого рефа
    }

    componentDidMount() {
        axios.get(`/get-shares/`)
        .then((response) => {
            this.setState({referencesItemShared: response.data})
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
        const {referencesItemShared} = this.state;
        this.filterSearch(referencesItemShared, e.target.value.toLowerCase())
    }

    filterSearch = (referencesItemShared, searchQuery) => {
        let searchResult = referencesItemShared.filter((item, index) => {
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

    openModalRemoveRef = (e, id) => {
        e.preventDefault();
        this.removeId = id;
        this.setState({isOpenModalRemoveRef: true});
    }

    closeModalRemoveRef = () => {
        this.setState({isOpenModalRemoveRef: false})
    }

    deleteShares = (e, id) => {
        e.preventDefault();

        axios.get(`/shares/delete/${id}/`)
        .then((response) => {
            let newReferencesItemShared = this.state.referencesItemShared.filter((item) => {
                return item.id != id
            })
            this.setState({
                isOpenModalRemoveRef: false,
                referencesItemShared: newReferencesItemShared
            });
        })

        ///shares/delete/{playlist-id}/	
    }

    render() {
        const { referencesItemShared, isOpenModalRemoveRef, countViews, searchQuery, searchList, isOpenMobileSearch, cntShow } = this.state;
        const ReferenceItemsShared = [];
        if(searchQuery === '') {
            if(referencesItemShared) {
                referencesItemShared.map((item, index) => {
                    let position = index;
                    item.isFindByCandidateName = false;
                    item.isFindByReferenceName = false;
                    if((position +1) % 4 != 0 ) {
                        ReferenceItemsShared.push(
                            <ReferencesItemShared data={item} key={item.id} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.id)}}/>
                        )
                    } else {
                        ReferenceItemsShared.push(
                            <Fragment key={`fragment-${item.id}`}>
                                <ReferencesItemShared data={item} key={item.id} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.id)}}/>
                                <div className="references-item__devider-desctop" key={`devider-${item.id}`}>
                                    <div></div>
                                </div>
                            </Fragment>    
                        )    
                    }
                });
            }
        } else {
            // если в поиск что то ввели
            searchList.map((item, index) => {
                if((index +1) % 5 != 0 ) {
                    ReferenceItemsShared.push(
                        <ReferencesItemShared data={item} key={item.id} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.id)}}/>
                    )
                } else {
                    ReferenceItemsShared.push(
                        <Fragment key={`search-fragment-${item.id}`}>
                            <ReferencesItemShared data={item} key={`search-${item.id}`} openModalRemoveRef={(e) => {this.openModalRemoveRef(e, item.id)}}/>
                            <div className="references-item__devider-desctop" key={`search-devider-${item.id}`}>
                                <div></div>
                            </div>
                        </Fragment> 
                    )    
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
                    page='shares'
                />
                <div className="content">
                    <ReferencesNavShort title={'My Shares'}/>
                    <div className="references__content references__content--share">
                        <div className="container">
                            <div className="row">
                                { ReferenceItemsShared.map((item, index)=>{
                                    if(ReferenceItemsShared.length < cntShow ) {
                                        return item;
                                    } else {
                                        if(index < cntShow) {
                                            return item;
                                        }
                                    }      
                                }) }
                                {/* {ReferenceItemsShared} */}
                            </div>
                        </div>
                    </div>        
                </div>
                <Footer></Footer>
                <Profile></Profile>
                { isOpenModalRemoveRef ? 
                    <ModalRemoveRef 
                        isOpen={isOpenModalRemoveRef}
                        deleteRef={(e) => {this.deleteShares(e, this.removeId)}} 
                        closeModalRemoveRef={this.closeModalRemoveRef} 
                    />
                     :
                    null 
                }
            </Fragment>
        );
    }
    
}

export default Shares;