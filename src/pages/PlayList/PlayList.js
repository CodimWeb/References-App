import React, { Component, Fragment } from 'react';
import Header from '../../components/Header/Header.js';
import ReferencesNavShort from '../../components/ReferencesNav/ReferencesNavShort.js'
import Comments from '../../components/Comments/Comments.js'
import CommentForm from '../../components/Comments/CommentForm.js'
import Footer from '../../components/Footer/Footer.js';
import Profile from '../../components/Profile/Profile.js';
import getCookie from '../../config/getCookie.js'
import Player from '../../components/Player/Player.js'
import axios from 'axios';

class PlayList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: null,
            candidateUserId: null,
            referenceUserId: null,
            referenceUserHidden: null,
            company: null,
            position: null,
            referenceName: null,
            referencePosition: null,
            startDate: null,
            endDate: null,
            addpipeRecordingId: null,
            companyIsConfirmed: null,
            positionIsConfirmed: null,
            referenceNameIsConfirmed: null,
            referencePositionIsConfirmed : null,
            startDateIsConfirmed: null,
            endDateIsConfirmed: null,
            videoDataUrl: null,
            videoDataPic: null,
            recruiterUrl: null,
            referenceUrl: null,
            referenceUserData: {
                firstName: null,
                lastName: null,
                picture: null,
                linkedin: null,
                position: null,
                company: null
            },
            candidateUserData: {
                firstName: null,
                lastName: null,
                picture: null,
            },
            currentVideo: 0,
        }

        this.items = null;
    }

    componentDidMount() {
        const id = this.props.match.params.id || null;
        // let videoList;
        if(id) {
            axios.get(`/view/playlist/${id}/json/`)
            .then((response) => {
                const data = response.data;
                this.items = response.data[0];
                
                this.setState({
                    id: data[0].references_data[0].id,
                    candidateUserId: data[0].references_data[0].candidate_user,
                    referenceUserId: data[0].references_data[0].reference_user,
                    referenceUserHidden: data[0].references_data[0].reference_userhidden,
                    company: data[0].references_data[0].company,
                    position: data[0].references_data[0].position,
                    referenceName: data[0].references_data[0].reference_name,
                    referencePosition: data[0].references_data[0].reference_position,
                    startDate: data[0].references_data[0].start_date,
                    endDate: data[0].references_data[0].end_date,
                    addpipeRecordingId: data[0].references_data[0].addpipe_recording_id,
                    companyIsConfirmed: data[0].references_data[0].company_is_confirmed,
                    positionIsConfirmed: data[0].references_data[0].position_is_confirmed,
                    referenceNameIsConfirmed: data[0].references_data[0].reference_name_is_confirmed,
                    referencePositionIsConfirmed : data[0].references_data[0].reference_position_is_confirmed,
                    startDateIsConfirmed: data[0].references_data[0].start_date_is_confirmed,
                    endDateIsConfirmed: data[0].references_data[0].end_date_is_confirmed,
                    videoDataUrl: data[0].references_data[0].video_data.url,
                    // videoDataUrl: 'https://vjs.zencdn.net/v/oceans.mp4', for test
                    videoDataPic: data[0].references_data[0].video_data.pic,
                    recruiterUrl: data[0].references_data[0].recruiter_url,
                    referenceUrl: data[0].references_data[0].reference_url,
                    referenceUserData: {
                        firstName: data[0].references_data[0].reference_user_data.first_name,
                        lastName: data[0].references_data[0].reference_user_data.last_name,
                        picture: data[0].references_data[0].reference_user_data.picture,
                        linkedin: data[0].references_data[0].reference_user_data.linkedin,
                        position: data[0].references_data[0].reference_user_data.position,
                        company: data[0].references_data[0].reference_user_data.company
                    },
                    candidateUserData: {
                        firstName: data[0].references_data[0].candidate_user_data.first_name,
                        lastName: data[0].references_data[0].candidate_user_data.last_name,
                        picture: data[0].references_data[0].candidate_user_data.picture,
                    }
                })
            });
        }
    }

    getNewVideo = (items, id) => {
        items.references_data.map((item, index) => {
            if(id == item.id) {
                this.setState({
                    id: item.id,
                    candidateUserId: item.candidate_user,
                    referenceUserId: item.reference_user,
                    referenceUserHidden: item.reference_userhidden,
                    company: item.company,
                    position: item.position,
                    referenceName: item.reference_name,
                    referencePosition: item.reference_position,
                    startDate: item.start_date,
                    endDate: item.end_date,
                    addpipeRecordingId: item.addpipe_recording_id,
                    companyIsConfirmed: item.company_is_confirmed,
                    positionIsConfirmed: item.position_is_confirmed,
                    referenceNameIsConfirmed: item.reference_name_is_confirmed,
                    referencePositionIsConfirmed : item.reference_position_is_confirmed,
                    startDateIsConfirmed: item.start_date_is_confirmed,
                    endDateIsConfirmed: item.end_date_is_confirmed,
                    videoDataUrl: item.video_data.url,
                    // videoDataUrl: 'https://vjs.zencdn.net/v/oceans.mp4',  for test
                    videoDataPic: item.video_data.pic,
                    recruiterUrl: item.recruiter_url,
                    referenceUrl: item.reference_url,
                    referenceUserData: {
                        firstName: item.reference_user_data.first_name,
                        lastName: item.reference_user_data.last_name,
                        picture: item.reference_user_data.picture,
                        linkedin: item.reference_user_data.linkedin,
                        position: item.reference_user_data.position,
                        company: item.reference_user_data.company
                    },
                    candidateUserData: {
                        firstName: item.candidate_user_data.first_name,
                        lastName: item.candidate_user_data.last_name,
                        picture: item.candidate_user_data.picture,
                    },
                    currentVideo: index,
                })
            }
        }) 
    }

    render() {
        const {
            id, candidateUserId, referenceUserId, referenceUserHidden, company, position, referenceName, referencePosition,
            startDate, endDate, addpipeRecordingId, companyIsConfirmed, positionIsConfirmed, referenceNameIsConfirmed,
            referencePositionIsConfirmed, startDateIsConfirmed, endDateIsConfirmed, videoDataUrl, videoDataPic,
            recruiterUrl, referenceUrl, referenceUserData, candidateUserData, currentVideo
        } = this.state;

        const options = {
            autoplay: false,
            controls: true,
            sources: [{
              src: videoDataUrl,//videoDataUrl,
              type: 'video/mp4',
              poster: videoDataPic
            }]
          }
        return (
            <Fragment>
                <Header
                    page='reference'
                />
                <div className="content">
                    <ReferencesNavShort title={'References'}/>
                    <div className="playlist">
                        <div className="playlist__content">
                            <div className="container">
                                <div className="row playlist__row">
                                    <div className="col-12 col-lg-6 offset-lg-3">
                                        <div className="playlist__container">
                                            <div className="playlist__user playlist-bg">
                                                <div className="playlist__video-lg">
                                                    {videoDataUrl ? <Player { ...options } /> : null}
                                                </div>
                                                <div className="references-item__label-container">
                                                    <p className="references-item__for-user">
                                                        <i className="icon icon-list-outline"></i>
                                                        <span>For </span>
                                                        {
                                                            candidateUserData.linkedin ? 
                                                            (<a href={candidateUserData.linkedin} target="_blank">{`${candidateUserData.firstName} ${candidateUserData.lastName}`}</a>)
                                                            :
                                                            (<span>{`${candidateUserData.firstName} ${candidateUserData.lastName}`}</span>)
                                                        }
                                                    </p>
                                                </div>
                                                <div className="references-item__user">
                                                    <a href="#" className="references-item__user-ava">
                                                        <img src={referenceUserData.picture} alt="" />
                                                    </a>
                                                    { referenceUserData.linkedin ?
                                                        (
                                                            <a href="#" className="references-item__user-linkedin">
                                                                <i className="icon icon-linkedin"></i>
                                                            </a>
                                                        ) 
                                                        : 
                                                        null 
                                                    }
                                                    <div className="references-item__user-info">
                                                        <div className="references-item__user-container">
                                                        <a href="#" className="h4 references-item__user-name">{`${referenceUserData.firstName} ${referenceUserData.lastName}`}</a>
                                                        </div>
                                                        <div><a href="#" className="references-item__user-position">{referenceUserData.position}</a></div>
                                                        <div><a href="#" className="references-item__user-company">{referenceUserData.company}</a></div>
                                                    </div>
                                                </div>
                                            </div>
                                            {this.items ? (
                                                <div className="playlist__right-side">
                                                    <div className="playlist__column">
                                                    {this.items.references_data.map((item, index)=>{
                                                        return (
                                                            <span 
                                                                className={`playlist-item ${currentVideo == index ? 'active': ''}`} 
                                                                key={index}
                                                                onClick={(e) => {this.getNewVideo(this.items, item.id)}}
                                                            >
                                                                <div className="playlist-item__content">
                                                                    <div className="playlist-item__widget">
                                                                        <img src={item.video_data.pic} alt="" className="full-width" />
                                                                    </div>    
                                                                    <div className="playlist-item__name">
                                                                        <div className="playlist-item__num">{(++index)}</div>
                                                                        <span className="h5">{item.reference_user_data.first_name} {item.reference_user_data.last_name}</span>
                                                                    </div>
                                                                </div>
                                                            </span>
                                                        )
                                                    })}
                                                    </div>
                                                </div>
                                                ):null
                                            }
                                                
                                            <div className="playlist__confirm">
                                                <div className="playlist__confirm__header">
                                                    <h4 className="h4 playlist__confirm__title">Reference Representations</h4>
                                                    <p className="playlist__confirm__subtitle">Below are the key facts the reference has confirmed.</p>
                                                </div>
                                                <div className="playlist__confirm__body">
                                                    <div className="playlist__confirm__item">
                                                        <div className="playlist__confirm__label">employer name</div>
                                                        <div className={`playlist__confirm__data ${companyIsConfirmed ? 'is-confirm' : ''}`}>{company}</div>
                                                    </div>
                                                    <div className="playlist__confirm__item">
                                                        <div className="playlist__confirm__label">title</div>
                                                        <div className={`playlist__confirm__data ${positionIsConfirmed ? 'is-confirm' : ''}`}>{position}</div>
                                                    </div>
                                                    <div className="playlist__confirm__item">
                                                        <div className="playlist__confirm__label">full name of your reference</div>
                                                        <div className={`playlist__confirm__data ${referenceNameIsConfirmed ? 'is-confirm' : ''}`}>{referenceName}</div>
                                                    </div>
                                                    <div className="playlist__confirm__item">
                                                        <div className="playlist__confirm__label">title of your Reference:</div>
                                                        <div className={`playlist__confirm__data ${referencePositionIsConfirmed ? 'is-confirm' : ''}`}>{referencePosition}</div>
                                                    </div>
                                                    <div className="playlist__confirm__item playlist__confirm__item--date">
                                                        <div className="playlist__confirm__label">start date</div>
                                                        <div className={`playlist__confirm__data ${startDateIsConfirmed ? 'is-confirm' : ''}`}>{startDate}</div>
                                                    </div>
                                                    <div className="playlist__confirm__item playlist__confirm__item--date">
                                                        <div className="playlist__confirm__label">end date</div>
                                                        <div className={`playlist__confirm__data ${endDateIsConfirmed ? 'is-confirm' : ''}`}>{endDate}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {id ? <Comments 
                                                    referenceId={id} 
                                                    candidateUserId={candidateUserId}
                                                    referenceUserId={referenceUserId}
                                                    scroll={this.props.match.params.scroll}
                                                  /> : null 
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <Profile />
            </Fragment>
        )
    }
}

export default PlayList;