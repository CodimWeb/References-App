import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import getCookie from '../../config/getCookie.js'

class ReferencesItemShared extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEditedName: false,
            newLinkName: '',
            isActive: false,
            isCopy: false,
            isArchive: false,
        }
    }

    timer = null;

    componentDidMount() {
        this.props.name ? this.setState({newLinkName : this.props.name}) : this.setState({newLinkName : ''}); 
        this.props.data.state == 3 ? this.setState({isArchive: true}) : null;
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    copyLink = () => {
        const el = document.createElement('input');
        el.setAttribute('value', this.props.data.url);
        el.style = "position: absolue; left: -100000px, right: -100000px, opacity: 0;";
        document.body.appendChild(el);
        el.select();
        el.setSelectionRange(0, 99999);
        document.execCommand('copy');
        el.remove();
        this.setState({isCopy: true})

        this.timer = setTimeout(()=>{
            this.setState({isCopy: false})
        }, 500) 
    }

    editReferenceName = (id) => {
        this.setState({
            isEditedName: true,
            newLinkName: this.state.newLinkName ? this.state.newLinkName : this.props.data.name,
            isActive: true
        })
    }

    createReferenceName = () => {
        this.setState({isEditedName: true})
    }

    handleChangeName = (e, id) => {
        e.target.value.length > 0 ? this.setState({
            isActive: true,
            newLinkName: e.target.value
        }) 
        : 
        this.setState({
            isActive: false,
            newLinkName: e.target.value
        })

    }

    handleSubmit = (e, id) => {
        let csrftoken = getCookie('csrftoken');
        axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
        let data = new FormData();
        data.append('name', this.state.newLinkName);

        axios.post(`/playlist/${id}/`, data)
        .then((response) => {
            this.setState({
                isEditedName: false,
                isActive: false
            })
        });
    }

    render(){
        const { data, openModalRemoveRef } = this.props;
        const { isEditedName, isActive, newLinkName, isCopy, isArchive } = this.state;
        const item = data.references_data[0];
        // console.log(data, 'my shares data')

        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let timestemp = Date.parse(data.created_at);
        let date = new Date(timestemp);
        let day = date.getDate();
        day < 10 ? day = '0' + day : day = day;
        let month = date.getMonth();
        let monthName = monthNames[month];
        let year = date.getFullYear();
        let fullDate = `${monthName} ${day}, ${year}`;

        if(data.type == 1) {
            return (
                <div className="col-12 col-lg-3">
                    <div className={`references-item references-item--my-shares ${isArchive ? 'archive' : ''} ${data.isFindByCandidateName || data.isFindByReferenceName ? 'is-finded' : ''}`}> 
                        {isEditedName ?
                            (
                                <div className="share-link__edit-form">
                                    {/* modificators active error */}
                                    <div className={`share-link__edit-textarea__container ${isActive ? 'active' : ''}`}>
                                        <textarea 
                                            className="share-link__edit-textarea" 
                                            value={newLinkName}
                                            onChange={(e)=>{this.handleChangeName(e, data.id)}}
                                            ></textarea>
                                    </div>    
                                    <div className="share-link__edit-action">
                                        <button className="btn btn-secondary btn-sm share-link__cancel">cancel</button>
                                        <button 
                                            className="btn btn-primary btn-sm share-link__save"
                                            onClick={(e)=>{this.handleSubmit(e, data.id)}}
                                        >
                                            SAVE
                                        </button>
                                    </div>
                                </div> 
                            )
                            :
                            (
                                <div className="references-item__name-panel">
                                    {data.name || newLinkName ? 
                                        (
                                            <Fragment>
                                                <div className="share__label">link name</div>
                                                <div className="share-link__name__container">
                                                    <p className="share-link__name">{ newLinkName ? newLinkName : data.name}</p>
                                                    <button type="button" className="btn share-link__edit" onClick={(e)=>{this.editReferenceName(data.id)}}>
                                                        <i className="icon icon-edit"></i>
                                                    </button>
                                                </div>
                                            </Fragment>
                                        )
                                        :
                                        (
                                            <button className="btn btn-secondary btn-block references-item__add-name" onClick={(e)=>{this.createReferenceName(data.id)}}>
                                                <span>+</span>Create a name for the link
                                            </button>
                                        )
                                    }
                                </div>
                            )
                        } 
                        <div className="share-link__container">
                            <p className="share-link__date">created link on {fullDate}</p>
                            <div className="share-link__panel">
                            <Link to={`/view/${data.id}`} className="share-link__text">{data.url}</Link>
                                <div className="modal-share__action">
                                    <button type="button" className="btn btn-copy share-link__copy" onClick={this.copyLink}>
                                        <i className="icon icon-copy"></i>
                                    </button>
                                    { isCopy ? <div className="modal-share__tooltip">Link copied!</div> : null}
                                </div>    
                            </div>
                        </div>
                        <div className="references-item__label-container">
                            <div className="references-item__label">new</div>
                            <p className="references-item__for-user">
                                <i className="icon icon-cinema"></i>
                                <span>For </span>
                                { item.candidate_user_data.linkedin ? 
                                    (
                                        <a href={item.candidate_user_data.linkedin} className={data.isFindByCandidateName ? 'finded' : ''} target="_blank">
                                            {`${item.candidate_user_data.first_name} ${item.candidate_user_data.last_name}`}
                                        </a>
                                    )
                                    :
                                    (
                                        <span className={data.isFindByCandidateName ? 'finded' : ''}>
                                            {`${item.candidate_user_data.first_name} ${item.candidate_user_data.last_name}`}
                                        </span>
                                    )
                                }
                            </p>
                        </div>    
                        <div className="references-item__body">
                            <div className="references-item__image">
                                <Link to={`/view/${data.id}/`}>
                                    <img src={item.video_data.pic} alt=""/>
                                </Link>
                                {/* <img src={item.video_data.pic} alt="" /> */}
                            </div>
                            <div className="references-item__user">
                                { item.reference_user_data.linkedin ? 
                                    (
                                        <a href={item.reference_user_data.linkedin} className="references-item__user-ava" target="_blank">
                                            <img src={item.reference_user_data.picture} alt="" />
                                        </a>
                                    )
                                    :
                                    (
                                        <span className="references-item__user-ava">
                                            <img src={item.reference_user_data.picture} alt="" />
                                        </span> 
                                    )    
                                }    
                                { item.reference_user_data.linkedin ? 
                                    (
                                        <a href={item.reference_user_data.linkedin} target="_blank" className="references-item__user-linkedin">
                                            <i className="icon icon-linkedin"></i>
                                        </a>
                                    )
                                    :
                                    null
                                }
                                <div className="references-item__user-info">
                                    <div className="references-item__user-container">
                                        { item.reference_user_data.linkedin ? 
                                            (
                                                <a href={item.reference_user_data.linkedin} className={`h5 references-item__user-name ${ data.isFindByReferenceName ? 'finded' : '' }`} target="_blank">
                                                    {`${item.reference_user_data.first_name} ${item.reference_user_data.last_name}`}
                                                </a>
                                            ) 
                                            :
                                            (
                                                <span className={`h5 references-item__user-name ${ data.isFindByReferenceName ? 'finded' : '' }`}>
                                                    {`${item.reference_user_data.first_name} ${item.reference_user_data.last_name}`}
                                                </span>
                                            )
                                        }
                                    </div>
                                    <div><span className="references-item__user-position">{item.reference_user_data.position}</span></div>
                                    <div><span className="references-item__user-company">{item.reference_user_data.company}</span></div>
                                </div>
                                <ul className="references-item__action">
                                    {/* <li>
                                        <a href="#" className="references-item__action__link">
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
                                        <Link to={`/view/${data.id}/comment/`} className="references-item__action__link">
                                            <i className="icon icon-message"></i>
                                            <span className="icon-title icon-title-desctop">comment</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#" className="references-item__action__link">
                                            <i className="icon icon-download"></i>
                                            <span className="icon-title icon-title-desctop">download</span>
                                        </a>
                                    </li>
                                    <li>
                                    {isArchive ?
                                            (
                                                <a href="#" className="references-item__action__link btn-toggle-archive" onClick={(e)=>{this.unArchiveReferences(e, data.id)}}>
                                                    <i className="icon icon-unarchive"></i>
                                                    <span className="icon-title icon-title-desctop">unarchive</span>
                                                </a>
                                            )
                                            :
                                            (
                                                <a href="#" className="references-item__action__link btn-toggle-archive" onClick={(e)=>{this.archiveReferences(e, data.id)}}>
                                                    <i className="icon icon-unarchive"></i>
                                                    <span className="icon-title icon-title-desctop">archive</span>
                                                </a>
                                            )
                                        }
                                    </li> */}
                                    <li>
                                        <a href="#" className="references-item__action__link" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openModalRemoveRef(e, data.id)
                                            }}
                                        >
                                            <i className="icon icon-trash"></i>
                                            <span className="icon-title icon-title-desctop">delete</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else if(data.type == 2) {
            return (
                <div className="col-12 col-lg-3">
                    <div className={`references-item references-item--my-shares ${isArchive ? 'archive' : ''} ${data.isFindByCandidateName || data.isFindByReferenceName ? 'is-finded' : ''}`}>
                        {isEditedName ?
                            (
                                <div className="share-link__edit-form">
                                    {/* modificators active error */}
                                    <div className={`share-link__edit-textarea__container ${isActive ? 'active' : ''}`}>
                                        <textarea 
                                            className="share-link__edit-textarea" 
                                            value={newLinkName}
                                            onChange={(e)=>{this.handleChangeName(e, data.id)}}
                                            ></textarea>
                                    </div>    
                                    <div className="share-link__edit-action">
                                        <button className="btn btn-secondary btn-sm share-link__cancel">cancel</button>
                                        <button 
                                            className="btn btn-primary btn-sm share-link__save"
                                            onClick={(e)=>{this.handleSubmit(e, data.id)}}
                                        >
                                            SAVE
                                        </button>
                                    </div>
                                </div> 
                            )
                            :
                            (
                                <div className="references-item__name-panel">
                                    {data.name || newLinkName ? 
                                        (
                                            <Fragment>
                                                <div className="share__label">link name</div>
                                                <div className="share-link__name__container">
                                                    <p className="share-link__name">{ newLinkName ? newLinkName : data.name}</p>
                                                    <button type="button" className="btn share-link__edit" onClick={(e)=>{this.editReferenceName(data.id)}}>
                                                        <i className="icon icon-edit"></i>
                                                    </button>
                                                </div>
                                            </Fragment>
                                        )
                                        :
                                        (
                                            <button className="btn btn-secondary btn-block references-item__add-name" onClick={(e)=>{this.createReferenceName(data.id)}}>
                                                <span>+</span>Create a name for the link
                                            </button>
                                        )
                                    }
                                </div>
                            )
                        } 
                        <div className="share-link__container">
                            <p className="share-link__date">created link on {fullDate}</p>
                            <div className="share-link__panel">
                            <Link to={`/view/playlist/${data.id}`} className="share-link__text">{data.url}</Link>
                                <div className="modal-share__action">
                                    <button type="button" className="btn btn-copy share-link__copy" onClick={this.copyLink}>
                                        <i className="icon icon-copy"></i>
                                    </button>
                                    { isCopy ? <div className="modal-share__tooltip">Link copied!</div> : null}
                                </div>    
                            </div>
                        </div>
                        <div className="references-item__label-container">
                            <div className="references-item__label">new</div>
                            <p className="references-item__for-user">
                                <i className="icon icon-cinema"></i>
                                <span>For </span>
                                { item.candidate_user_data.linkedin ? 
                                    (
                                        <a href={item.candidate_user_data.linkedin} className={data.isFindByCandidateName ? 'finded' : ''} target="_blank">
                                            {`${item.candidate_user_data.first_name} ${item.candidate_user_data.last_name}`}
                                        </a>
                                    )
                                    :
                                    (
                                        <span className={data.isFindByCandidateName ? 'finded' : ''}>
                                            {`${item.candidate_user_data.first_name} ${item.candidate_user_data.last_name}`}
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
                                        <span className="h5 references-item__user-name">
                                            {`${data.references_data.length} reference inside`}
                                        </span> 
                                    </div>
                                </div>
                                <ul className="references-item__action">
                                    {/* <li>
                                        <a href="#" className="references-item__action__link">
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
                                        <Link to={`/view/${data.id}/comment/`} className="references-item__action__link">
                                            <i className="icon icon-message"></i>
                                            <span className="icon-title icon-title-desctop">comment</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#" className="references-item__action__link">
                                            <i className="icon icon-download"></i>
                                            <span className="icon-title icon-title-desctop">download</span>
                                        </a>
                                    </li>
                                    <li>
                                    {isArchive ?
                                            (
                                                <a href="#" className="references-item__action__link btn-toggle-archive" onClick={(e)=>{this.unArchiveReferences(e, data.id)}}>
                                                    <i className="icon icon-unarchive"></i>
                                                    <span className="icon-title icon-title-desctop">unarchive</span>
                                                </a>
                                            )
                                            :
                                            (
                                                <a href="#" className="references-item__action__link btn-toggle-archive" onClick={(e)=>{this.archiveReferences(e, data.id)}}>
                                                    <i className="icon icon-unarchive"></i>
                                                    <span className="icon-title icon-title-desctop">archive</span>
                                                </a>
                                            )
                                        }
                                    </li> */}
                                    <li>
                                        <a href="#" className="references-item__action__link" 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openModalRemoveRef(e, data.id)
                                            }}
                                        >
                                            <i className="icon icon-trash"></i>
                                            <span className="icon-title icon-title-desctop">delete</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default ReferencesItemShared;