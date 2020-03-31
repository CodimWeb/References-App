import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getSharedLink } from '../../redux/actions/actions';
import axios from 'axios';

class ReferenceItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isArchive: props.data.references_data[0].state == 3 ? true : false,
            isPending: props.data.references_data[0].state == 0 ? true : false
        }

        // console.log(props, 'constructor single item')
    }

    componentDidMount() {
        // this.props.data.references_data[0].state == 3 ? this.setState({isArchive: true}) : null;
        // this.props.data.references_data[0].state != 0 ? this.setState({isPending: false}) : null;
        // console.log('mount single item')
    }

    sharedLink = (e, id) => {
        e.preventDefault();
        axios.get(`/share/url/${id}/`)
        .then((response) => {
            this.props.onSetSharedLink(response.data.url);
        }) 
    }

    sharedPlayList = (e, playListId) => {
        e.preventDefault();
        axios.get(`/playlist/url/${playListId}/`)
        .then((response) => {
            this.props.onSetSharedLink(response.data.url);
        }) 
    }

    archiveReferences = (e, id) => {
        e.preventDefault();
        axios.get(`/archive/${id}/`)
        .then((response) => {
            this.setState({isArchive: true})
        })
    }

    unArchiveReferences = (e, id) => {
        e.preventDefault();
        axios.get(`/unarchive/${id}/`)
        .then((response) => {
            this.setState({isArchive: false})
        })
    }


    render() {
        const { data, openModalRemoveRef } = this.props;
        const { isArchive, isPending } = this.state;
        const item = data.references_data[0];
        // console.log(data, 'single item');
        // console.log(this.state, 'single item state');
        // console.log('isArchive', isArchive);
        // console.log('isPending', isPending);
        // single ref
        if(data.type == 1) {
            return(
                <div className="col-12 col-lg-3">
                    <div className={`references-item ${isArchive ? 'archive' : ''} ${isPending ? 'pending' : ''} ${data.isFindByCandidateName || data.isFindByReferenceName ? 'is-finded' : ''}`}>
                        <div className="references-item__label-container">
                            { item.is_new ?
                                (
                                    <div className="references-item__label">new</div>
                                ) : null
                            }                        
                            <p className="references-item__for-user">
                                <i className="icon icon-cinema"></i>
                                <span>For </span>
                                { item.candidate_user_data.linkedin ? 
                                    (
                                        <a href={item.candidate_user_data.linkedin} className={data.isFindByCandidateName ? 'finded' : ''}>
                                            { `${item.candidate_user_data.first_name} ${item.candidate_user_data.last_name}`}
                                        </a>
                                    ) 
                                    :
                                    (
                                        <span className={ data.isFindByCandidateName ? 'finded' : '' }>
                                            { `${item.candidate_user_data.first_name} ${item.candidate_user_data.last_name}`}
                                        </span>
                                    )
                                }
                            </p>
                        </div>    
                        <div className="references-item__body">
                            <div className="references-item__image">
                                { isPending ? 
                                    null
                                    :
                                    (
                                        <Link to={`/view/${data.id}/`}>
                                            <img src={ item.video_data ? item.video_data.pic : '' } alt=""/>
                                        </Link>
                                        
                                    )
                                }
                            </div>
                            <div className="references-item__user">
                                {isPending ? 
                                    (
                                        <span className="references-item__user-ava">
                                            <img src="/app/img/default-user-image.png"/>
                                        </span>
                                    )
                                    :
                                    (
                                        <div className="references-item__user-ava">
                                            { item.reference_user_data.linkedin ? 
                                                (
                                                    <a href={item.reference_user_data.linkedin}>
                                                        <img src={item.reference_user_data.picture} alt="" />
                                                    </a>
                                                )
                                                :
                                                (
                                                    <img src={item.reference_user_data.picture} alt="" />
                                                )
                                            }
                                            
                                        </div>
                                    )
                                }

                                {item.reference_user_data.linkedin ? 
                                    (
                                        <a href={item.reference_user_data.linkedin} className="references-item__user-linkedin">
                                            <i className="icon icon-linkedin"></i>
                                        </a>
                                    )
                                    :
                                    null
                                }
                                <div className="references-item__user-info">
                                    <div className="references-item__user-container">
                                        {isPending ? 
                                            (
                                                <span className="h5 references-item__user-name">Pending</span>
                                            )
                                            :
                                            (
                                                <div>
                                                    { item.reference_user_data.linkedin ? 
                                                        (
                                                            <a href={item.reference_user_data.linkedin} className={`h5 references-item__user-name ${ data.isFindByReferenceName ? 'finded' : '' }`}>
                                                                { item.reference_user_data.first_name} {item.reference_user_data.last_name}
                                                            </a>
                                                        )
                                                        :
                                                        (
                                                            <span className={`h5 references-item__user-name ${ data.isFindByReferenceName ? 'finded' : '' }`}>
                                                                { item.reference_user_data.first_name} {item.reference_user_data.last_name}
                                                            </span>
                                                        )
                                                    }
                                                </div>
                                                
                                            )
                                        }
                                        
                                    </div>
                                    <div>
                                        {isPending ? 
                                            (
                                                <span className="references-item__user-position">Pending</span>
                                            )
                                            :
                                            (
                                                <span className="references-item__user-position">{ item.reference_user_data.position }</span>
                                            )
                                        }
                                    </div>
                                    <div>
                                        {isPending ? 
                                            (
                                                <span className="references-item__user-company">Pending</span>
                                            )
                                            :
                                            (
                                                <span className="references-item__user-company">{ item.reference_user_data.company }</span>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                                {!item.readonly ? 
                                    (
                                    <ul className="references-item__action">
                                        {isPending ? 
                                            null
                                            :
                                            (
                                            <li>
                                                <a href="#" className="references-item__action__link" onClick={(e)=>{this.sharedLink(e, item.id)}} >
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8Z" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M9 13.5L15 17" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        <path d="M15 7L9 10.5" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                    <span className="icon-title icon-title-desctop">share</span>
                                                </a>
                                            </li>
                                            )
                                        }
                                        {isPending ? 
                                            null
                                            :
                                            (
                                            <li>
                                                <Link to={`/view/${item.id}/comment/`} className="references-item__action__link">
                                                    <i className="icon icon-message"></i>
                                                    <span className="icon-title icon-title-desctop">comment</span>
                                                </Link>
                                            </li>
                                            )
                                        }
                                        {isPending ? 
                                            null 
                                            : 
                                            (
                                            <li>
                                                <a href={`/download/${item.id}/`} className="references-item__action__link">
                                                    <i className="icon icon-download"></i>
                                                    <span className="icon-title icon-title-desctop">download</span>
                                                </a>
                                            </li>
                                            )
                                        }
                                        {isPending ? 
                                            null
                                            :
                                            (
                                            <li>
                                                {isArchive ?
                                                    (
                                                        <a href="#" className="references-item__action__link btn-toggle-archive" onClick={(e)=>{this.unArchiveReferences(e, item.id)}}>
                                                            <i className="icon icon-unarchive"></i>
                                                            <span className="icon-title icon-title-desctop">unarchive</span>
                                                        </a>
                                                    )
                                                    :
                                                    (
                                                        <a href="#" className="references-item__action__link btn-toggle-archive" onClick={(e)=>{this.archiveReferences(e, item.id)}}>
                                                            <i className="icon icon-unarchive"></i>
                                                            <span className="icon-title icon-title-desctop">archive</span>
                                                        </a>
                                                    )
                                                }
                                            </li>
                                            )
                                        }    
                                        <li>
                                            <a href="#" className="references-item__action__link" onClick={(e) => {
                                                openModalRemoveRef(e, item.id)
                                            }}>
                                                <i className="icon icon-trash"></i>
                                                <span className="icon-title icon-title-desctop">delete</span>
                                            </a>
                                        </li>
                                    </ul>
                                    )
                                    :
                                    (
                                    <ul className="references-item__action">
                                        <li>
                                            <a href="#" className="references-item__action__link">
                                                <i className="icon icon-message"></i>
                                                <span className="icon-title icon-title-desctop">comment</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="references-item__action__link">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path className="icon-share" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path className="icon-share" d="M14.828 9.17187L9.17188 14.8287" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path className="icon-share" d="M9.17187 9.17127L14.8287 14.8281" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <span className="icon-title icon-title-desctop">unsubscribe</span>
                                            </a>
                                        </li>
                                    </ul>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        //playlist
        else if(data.type == 2) {
            return (
                <div className="col-12 col-lg-3">
                    <div className={`references-item ${isArchive ? 'archive' : ''} ${data.isFindByCandidateName || data.isFindByReferenceName ? 'is-finded' : ''}`}>
                        <div className="references-item__label-container">
                            { item.is_new ?
                                (
                                    <div className="references-item__label">new</div>
                                ) : null
                            }                        
                            <p className="references-item__for-user">
                                { data.type == 1 ? (<i className="icon icon-cinema"></i>) : null}
                                { data.type == 2 ? (<i className="icon icon-list-outline"></i>)  : null}    
                                
                                <span>For </span>
                                { item.candidate_user_data.linkedin ? 
                                    (
                                        <a href={item.candidate_user_data.linkedin} className={data.isFindByCandidateName ? 'finded' : ''}>
                                            { `${item.candidate_user_data.first_name} ${item.candidate_user_data.last_name}`}
                                        </a>
                                    ) 
                                    :
                                    (
                                        <span className={data.isFindByCandidateName ? 'finded' : ''}>
                                            { `${item.candidate_user_data.first_name} ${item.candidate_user_data.last_name}`}
                                        </span>
                                    )
                                }
                            </p>
                        </div>    
                        <div className="references-item__body">
                            <div className="references-item__image">
                                <Link to={`/view/playlist/${data.id}/`}>
                                    <div className="share-item__set">
                                        {data.references_data.map((item, index)=>{
                                            if(index < 5 ) {
                                                return (
                                                    <div className="share-item__col" key={index}>
                                                        <div className="share-item__image">
                                                            <img src={item.video_data.pic} alt=""/>
                                                        </div>
                                                    </div>
                                                )
                                            } else if(index == 5) {
                                                return (
                                                    <div className="share-item__col" key={index}>
                                                        <div className="share-item__image">
                                                            <div className="share-item__count">
                                                                <p>+ {data.references_data.length - 5}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }    
                                        })}
                                    </div>
                                </Link>
                            </div>
                            <div className="references-item__user">
                                <div className="references-item__user-info">
                                    <div className="references-item__user-container">
                                        <span href="#" className="h5 references-item__user-name">
                                            {`${data.references_data.length} reference inside`}
                                        </span> 
                                    </div>
                                </div>
                                {!item.readonly ? 
                                    (
                                    <ul className="references-item__action">
                                        <li>
                                            <a href="#" title="share" className="references-item__action__link" onClick={(e)=>{this.sharedPlayList(e, data.id)}} >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M17 8C18.1046 8 19 7.10457 19 6C19 4.89543 18.1046 4 17 4C15.8954 4 15 4.89543 15 6C15 7.10457 15.8954 8 17 8Z" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14Z" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M9 13.5L15 17" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M15 7L9 10.5" className="icon-share" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                                <span className="icon-title icon-title-desctop">share</span>
                                            </a>
                                        </li>
                                        <li>
                                            <Link to={`/view/${item.id}/comment/`} title="comment" className="references-item__action__link">
                                                <i className="icon icon-message"></i>
                                                <span className="icon-title icon-title-desctop">comment</span>
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <a href={`/download/${item.id}/`} title="download" className="references-item__action__link">
                                                <i className="icon icon-download"></i>
                                                <span className="icon-title icon-title-desctop">download</span>
                                            </a>
                                        </li> */}
                                        {/* <li>
                                            {isArchive ?
                                                (
                                                    <a href="#" title="unarchive" className="references-item__action__link btn-toggle-archive" onClick={(e)=>{this.unArchiveReferences(e, item.id)}}>
                                                        <i className="icon icon-unarchive"></i>
                                                        <span className="icon-title icon-title-desctop">unarchive</span>
                                                    </a>
                                                )
                                                :
                                                (
                                                    <a href="#" title="archive" className="references-item__action__link btn-toggle-archive" onClick={(e)=>{this.archiveReferences(e, item.id)}}>
                                                        <i className="icon icon-unarchive"></i>
                                                        <span className="icon-title icon-title-desctop">archive</span>
                                                    </a>
                                                )
                                            }
                                        </li>   */}
                                        <li>
                                            <a href="#" title="delete" className="references-item__action__link" onClick={(e) => {
                                                openModalRemoveRef(e, data.id)
                                            }}>
                                                <i className="icon icon-trash"></i>
                                                <span className="icon-title icon-title-desctop">delete</span>
                                            </a>
                                        </li>
                                    </ul>
                                    )
                                    :
                                    (
                                    <ul className="references-item__action">
                                        <li>
                                            <a href="#" title="comment" className="references-item__action__link">
                                                <i className="icon icon-message"></i>
                                                <span className="icon-title icon-title-desctop">comment</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="unsubscribe" className="references-item__action__link">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path className="icon-share" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path className="icon-share" d="M14.828 9.17187L9.17188 14.8287" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path className="icon-share" d="M9.17187 9.17127L14.8287 14.8281" stroke="" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <span className="icon-title icon-title-desctop">unsubscribe</span>
                                            </a>
                                        </li>
                                    </ul>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
            
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

export default connect(mapStateToProps, mapDispachToProps)(ReferenceItem);

// export default ReferenceItem;