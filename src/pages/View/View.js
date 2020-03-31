import React, {Component, Fragment } from 'react';
import Header from '../../components/Header/Header.js';
import ReferencesNavShort from '../../components/ReferencesNav/ReferencesNavShort.js'
import Comments from '../../components/Comments/Comments.js'
import CommentForm from '../../components/Comments/CommentForm.js'
import Footer from '../../components/Footer/Footer.js';
import Profile from '../../components/Profile/Profile.js';
import getCookie from '../../config/getCookie.js';
import Player from '../../components/Player/Player.js';
import axios from 'axios';

class View extends Component {
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
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id || null;
        if(id) {
            axios.get(`/view/${id}/json/`)
            .then((response) => {
                const data = response.data;

                // videoId = data.id;
                this.setState({
                    id: data.id,
                    playListId: id,
                    candidateUserId: data.candidate_user_id,
                    referenceUserId: data.reference_user_data.id,
                    referenceUserHidden: data.reference_userhidden,
                    company: data.company,
                    position: data.position,
                    referenceName: data.reference_name,
                    referencePosition: data.reference_position,
                    startDate: data.start_date,
                    endDate: data.end_date,
                    addpipeRecordingId: data.addpipe_recording_id,
                    companyIsConfirmed: data.company_is_confirmed,
                    positionIsConfirmed: data.position_is_confirmed,
                    referenceNameIsConfirmed: data.reference_name_is_confirmed,
                    referencePositionIsConfirmed : data.reference_position_is_confirmed,
                    startDateIsConfirmed: data.start_date_is_confirmed,
                    endDateIsConfirmed: data.end_date_is_confirmed,
                    videoDataUrl: data.video_data.url,
                    videoDataPic: data.video_data.pic,
                    recruiterUrl: data.recruiter_url,
                    referenceUrl: data.reference_url,
                    referenceUserData: {
                        firstName: data.reference_user_data.first_name,
                        lastName: data.reference_user_data.last_name,
                        picture: data.reference_user_data.picture,
                        linkedin: data.reference_user_data.linkedin,
                        position: data.reference_user_data.position,
                        company: data.reference_user_data.company
                    },
                    candidateUserData: {
                        firstName: data.candidate_user_data.first_name,
                        lastName: data.candidate_user_data.last_name,
                        picture: data.candidate_user_data.picture,
                    }
                });
                // get comments
                // axios.get(`/comments/${id}/`)
                // .then((response) => {
                //     this.setState({commentList: response.data})
                // });
            });
        }
    }


    render() {
        const {
            id, candidateUserId, referenceUserId, referenceUserHidden, company, position, referenceName, referencePosition,
            startDate, endDate, addpipeRecordingId, companyIsConfirmed, positionIsConfirmed, referenceNameIsConfirmed,
            referencePositionIsConfirmed, startDateIsConfirmed, endDateIsConfirmed, videoDataUrl, videoDataPic,
            recruiterUrl, referenceUrl, referenceUserData, candidateUserData, playListId
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
                                    <div className="col-12">
                                        <div className="playlist__container">
                                            <div className="playlist__user">
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
                <Footer />
                <Profile />
            </Fragment>
        )
    }
    
}

export default View;