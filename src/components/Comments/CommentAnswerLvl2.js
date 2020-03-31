import React, {Component, Fragment} from 'react';
import getCookie from '../../config/getCookie.js';
import axios from 'axios';

class CommentAnswerLvl2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowReplyForm: false,
            replyValue: '',
            isShowEditForm: false,
            editValue: this.props.item.comment,
            referenceId: this.props.referenceId,
            isOpenModalRemove: false,
        }

    }

    showReplyForm = () => {
        this.setState({isShowReplyForm: true})
    }

    hideReplyForm = () => {
        this.setState({isShowReplyForm: false})
    }

    // handleChange = (e) => {
    //     this.setState({replyValue: e.target.value})
    // }

    // handleSubmit = (e, id) => {
    //     console.log(e)
    // }

    showEditForm = () => {
        this.setState({
            isShowEditForm: true,
            isShowReplyForm: false,
        })
    }

    hideEditForm = () => {
        this.setState({
            isShowEditForm: false,
            editValue: this.props.item.comment,
        })
    }

    handleEdit = (e) => {
        this.setState({editValue: e.target.value})
    }

    saveEdit = (e, id) => {
        // /comments/edit/{comment-id}/
        if(this.state.editValue.length > 0) {
            let csrftoken = getCookie('csrftoken');
            axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
            let data = new FormData();
            data.append('comment', this.state.editValue);
            data.append('parent', id);
            axios.post(`/comments/edit/${this.props.item.id}/`, data)
            .then((response) => {
                this.setState({
                    editValue: '',
                    isShowEditForm: false
                })

                this.props.refreshComment(this.props.referenceId);
            });
        }
    }

    showModalRemoveComment = () => {
        this.setState({isOpenModalRemove: true})
    }

    hideModalRemoveComment = () => {
        this.setState({isOpenModalRemove: false})
    }

    deleteComment = (id) => {
        // /comments/delete/{comment-id}/
        axios.get(`/comments/delete/${id}/`)
        .then((response)=>{
            this.props.refreshComment(this.props.referenceId);
            this.setState({isOpenModalRemove: false})
        })
    }

    render() {
        const {isShowReplyForm, replyValue, referenceId, isOpenModalRemove, isShowEditForm, editValue} = this.state;
        const {item, userId, candidateUserId} = this.props

        let timestemp = Date.parse(item.created_at);
        let date = new Date(timestemp);
        let day = date.getDate();
        day < 10 ? day = '0' + day : day = day;
        let month = date.getMonth() + 1;
        month < 10 ? month = '0' + month : month = month;
        let year = date.getFullYear();
        let fullDate = `${day}.${month}.${year}`;

        return (
            <div className="comment__item comment__item__answer">
                <svg className="arrow-left-top" width="15" height="81" viewBox="0 0 15 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.0616 78.9954L8.0378 78.9954C7.77132 78.9954 7.51575 78.89 7.32732 78.7025C7.13889 78.515 7.03303 78.2606 7.03303 77.9954L7.03303 3.0754L10.4291 5.7754C10.6059 5.91656 10.8255 5.99409 11.0521 5.9954C11.203 5.99471 11.3518 5.96019 11.4875 5.8944C11.6232 5.82861 11.7422 5.73325 11.8358 5.6154C12.0001 5.40817 12.0754 5.14469 12.0453 4.88243C12.0152 4.62017 11.8821 4.3804 11.6751 4.2154L6.65122 0.215398C6.47383 0.0758893 6.25435 5.40968e-07 6.02827 5.21202e-07C5.80218 5.01437e-07 5.5827 0.0758893 5.40531 0.215398L0.381478 4.2154C0.198425 4.38737 0.0868976 4.62145 0.0689613 4.87135C0.0510251 5.12124 0.127987 5.36872 0.284619 5.56484C0.441252 5.76096 0.666144 5.89142 0.914798 5.93041C1.16345 5.9694 1.41775 5.91408 1.62739 5.7754L5.0235 3.0754L5.0235 77.9954C5.0235 78.791 5.34108 79.5541 5.90637 80.1167C6.47166 80.6793 7.23836 80.9954 8.0378 80.9954L13.0616 80.9954C13.3281 80.9954 13.5837 80.89 13.7721 80.7025C13.9605 80.515 14.0664 80.2606 14.0664 79.9954C14.0664 79.7302 13.9605 79.4758 13.7721 79.2883C13.5837 79.1007 13.3281 78.9954 13.0616 78.9954Z" fill="#5568FE"/>
                </svg>
                <div className="comment__item__panel">
                    <div className="comment__item__header">
                        <div className="comment__user">
                            <span className="comment__user__ava">
                                <img src={ item.viewed_user_data.picture } alt="photo" />
                            </span>
                            <div className="comment__user__data">
                                <div className="comment__user__name">
                                    <span>{ item.viewed_user_data.first_name } { item.viewed_user_data.last_name }</span>
                                </div>
                                <div className="comment__date">{fullDate}</div>
                            </div>
                        </div>
                        <div className="comment__item__action">
                            {/* <button className="btn comment__item__reply" onClick={this.showReplyForm}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="corner-left-up" d="M18 6.99996L13 6.99996C12.7348 6.99996 12.4804 7.10532 12.2929 7.29286C12.1053 7.48039 12 7.73475 12 7.99996L12 16.92L15.38 14.22C15.5559 14.0788 15.7744 14.0013 16 14C16.1502 14.0007 16.2983 14.0352 16.4333 14.101C16.5684 14.1668 16.6869 14.2621 16.78 14.38C16.9435 14.5872 17.0184 14.8507 16.9885 15.1129C16.9585 15.3752 16.826 15.615 16.62 15.78L11.62 19.78C11.4434 19.9195 11.225 19.9954 11 19.9954C10.775 19.9954 10.5565 19.9195 10.38 19.78L5.37998 15.78C5.1978 15.608 5.0868 15.3739 5.06895 15.124C5.0511 14.8741 5.1277 14.6266 5.28359 14.4305C5.43947 14.2344 5.6633 14.1039 5.91077 14.0649C6.15825 14.026 6.41134 14.0813 6.61998 14.22L9.99998 16.92L9.99998 7.99996C9.99998 7.20431 10.3161 6.44125 10.8787 5.87864C11.4413 5.31603 12.2043 4.99996 13 4.99996L18 4.99996C18.2652 4.99996 18.5196 5.10532 18.7071 5.29286C18.8946 5.48039 19 5.73475 19 5.99996C19 6.26518 18.8946 6.51954 18.7071 6.70707C18.5196 6.89461 18.2652 6.99996 18 6.99996Z"/>
                                </svg>
                                reply
                            </button> */}
                             {userId == item.user ? (
                                <button className="btn comment__item__reply" onClick={this.showEditForm}>
                                    <i className="icon icon-edit"></i>
                                </button>
                                ):
                                null
                            }
                            {userId == item.user || userId == candidateUserId ? (
                                <button className="btn comment__item__reply" onClick={()=>{this.showModalRemoveComment()}}>
                                    <i className="icon icon-trash"></i>
                                </button>
                                ):
                                null
                            }
                        </div>
                    </div>
                    <div className="comment__item__body">
                        {item.comment}
                    </div>
                    {isShowReplyForm ? (
                            <form className="comment__item__form">
                                <div className="form-group">
                                    <textarea 
                                        className="comment__item__field" 
                                        placeholder="Your comment" 
                                        value={replyValue}
                                        onChange={(e)=>{this.handleChange(e)}}
                                    ></textarea>
                                </div>
                                <div className="comment__item__form__action">
                                    <button type="button" className="btn btn-secondary btn-cancel-form" onClick={this.hideReplyForm}>cancel</button>
                                    <button type="button" className="btn btn-primary btn-submit-answer" onClick={(e)=>{this.handleSubmit(e, item.id)}}>publish</button>
                                </div>
                            </form>
                        )
                        :
                        null
                    }
                    {isShowEditForm ? (
                            <form className="comment__item__form">
                                <div className="form-group">
                                    <textarea 
                                        className="comment__item__field" 
                                        placeholder="Your comment" 
                                        value={editValue}
                                        onChange={(e)=>{this.handleEdit(e)}}
                                    ></textarea>
                                </div>
                                <div className="comment__item__form__action">
                                    <button type="button" className="btn btn-secondary btn-cancel-form" onClick={this.hideEditForm}>cancel</button>
                                    <button type="button" className="btn btn-primary btn-submit-answer" onClick={(e)=>{this.saveEdit(e, item.parent)}}>save</button>
                                </div>
                            </form>
                        )
                        :
                        null
                    }
                    {isOpenModalRemove ? (
                            <div className={`modal ${isOpenModalRemove ? 'show' : 'false'} modal-remove`} id="modal-remove" tabIndex="-1" role="dialog" aria-labelledby="modal-remove" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h3 className="h3 modal-title">Do you really want to remove the reference?</h3>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={()=>{this.hideModalRemoveComment()}}>No</button>
                                            <button type="button" className="btn btn-primary" onClick={()=>{this.deleteComment(item.id)}}>YES</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :null
                    }
                </div>
            </div>
        );
    }
}

export default CommentAnswerLvl2;