import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header.js';
import ReferencesNavShort from '../../components/ReferencesNav/ReferencesNavShort.js';
import Footer from '../../components/Footer/Footer.js';
import Profile from '../../components/Profile/Profile.js';
import ReferencesItemShareAll from '../../components/ReferencesItem/ReferencesItemShareAll.js';
import ModalRecordShare from '../../components/Modals/ModalRecordShare.js';
import { getSharedLink } from '../../redux/actions/actions';
import getCookie from '../../config/getCookie.js';
import axios from 'axios'

class ShareAll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayItems: [],
            referencesItems: [],
            searchQuery: '',
            serchList: [],
            sharedLink: '',
        }

        this.userId = null; // нужен для создания плелиста
    }

    componentDidMount() {
        axios.get('/profile/')
        .then((response) => {
           this.userId = response.data.id;

           axios.get(`/references/all/`)
            .then((response) => {
                let displayItems = [];
                response.data.map((item, index) => {
                    if(item.references_data[0].state == 2 && item.references_data[0].video_data && this.userId == item.references_data[0].candidate_user && item.type != 2) {
                        displayItems.push(item)
                    }
                })
                this.setState({
                    referencesItems: response.data,
                    displayItems: displayItems,
                })
            })
        });
    }

    moveToLeft = (index) => {
        let refItems = this.state.displayItems;
        if(index > 0) {
            let tmp = refItems[index -1];
            refItems[index - 1] = refItems[index];
            refItems[index] = tmp;
            this.setState({displayItems: refItems});
        } else {
            let tmp = refItems[index];
            refItems.splice(0 , 1);
            refItems.push(tmp);
            this.setState({displayItems: refItems});
        }
    }

    moveToRight = (index) => {
        let refItems = this.state.displayItems;
        let lastIndex = refItems.length -1;
        if(index < lastIndex) {
            let tmp = refItems[index + 1];
            refItems[index +1] = refItems[index];
            refItems[index] = tmp;
            this.setState({displayItems: refItems});
        } else {
            let tmp = refItems.pop();
            refItems.unshift(tmp);
            this.setState({displayItems: refItems});
        }
    }

    createPlayList = (referencesItems) => {
        let idList = '';
        let ordering = '';
        referencesItems.map((item, index) => {
            if(index < (referencesItems.length -1)) {
                idList = idList + item.references_data[0].id + ',';
            } else {
                idList = idList + item.references_data[0].id;
            }
        })

        let csrftoken = getCookie('csrftoken');
        axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
        let data = new FormData();
        data.append('name', '');
        data.append('ordering', idList);
        axios.post('/playlist/create/', data)
        .then((response) => {
            // this.setState({sharedLink: response.data.url})
            this.props.onSetSharedLink(response.data.url)
        });
    }

    render() {
        const {displayItems} = this.state;
        const { sharedLink } = this.props;
        return (
            <Fragment>
                <Header 
                    disabledSearch={true}
                    page='reference'
                />
                <ReferencesNavShort title={'Share all'} shareAll={true} createPlayList={(e)=>{this.createPlayList(displayItems)}}/>
                <div className="references__content references__content--share-all">
                    <div className="container">
                        <p className="references__subtitle">You can change the order of references using the arrows on the right</p>
                        <div className="row">
                            { displayItems.map((item, index)=>{
                                   return <ReferencesItemShareAll
                                            data={item}
                                            key={item.id}
                                            position={index}
                                            moveToLeft={()=>{this.moveToLeft(index)}}
                                            moveToRight={()=>{this.moveToRight(index)}}
                                          />
                              }) 
                            }
                            
                        </div>
                    </div>
                </div> 
                <Footer></Footer>
                <Profile></Profile>
                {sharedLink ? <ModalRecordShare getNewReference={() => {}} sharedLink={sharedLink}/> : null }
            </Fragment>
        )
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

export default connect(mapStateToProps, mapDispachToProps)(ShareAll);
//export default ShareAll