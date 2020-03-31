import React, {Component} from 'react';
import CommentItem from '../Comments/CommentItem.js';
import CommentForm from '../Comments/CommentForm.js';
import getCookie from '../../config/getCookie.js';
import axios from 'axios';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            commentList: [],
            commentValue: '',
            referenceId: this.props.referenceId,
            candidateUserId: this.props.candidateUserId,
            referenceUserId: this.props.referenceUserId,
        }

        this.timeOut = null;
    }

    componentWillReceiveProps(nextProps) {
        //обновляем список коментариев при выборе другого видео
        if(this.state.referenceId != nextProps.referenceId) {
            axios.get(`/comments/${nextProps.referenceId}/`).then((response) => {
                this.setState({
                    referenceId: nextProps.referenceId,
                    candidateUserId: nextProps.candidateUserId,
                    referenceUserId: nextProps.referenceUserId,
                    commentList: response.data
                })
            })
            
        }
    }

    componentDidMount() {
        // получаем id текущего пользователя
        axios.get('/profile/')
        .then((response) => {
           this.setState({
                userId: response.data.id
           })
        })

        axios.get(`/comments/${this.props.referenceId}/`).then((response) => {
            this.setState({
                commentList: response.data
            })
        })

        // скролл при переходе по ссылке на комментарий
        const scroll = this.props.scroll || null;
        if(scroll) {
            var el = document.querySelector('.comment');
            this.timeOut = setTimeout(()=> {
                var c = el.getBoundingClientRect()
                window.scrollTo(0, (c.y - 95)) // 95 header height
            }, 300)
        }    
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    handleChange = (e) => {
        let commentValue = e.target.value;
        this.setState({commentValue: commentValue});
    }

    //добавление коментария
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.commentValue.length > 0) {
            const {referenceId} = this.state;
            let csrftoken = getCookie('csrftoken');
            axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
            let data = new FormData();
            data.append('comment', this.state.commentValue);
            axios.post(`/comments/create/${referenceId}/`, data)
            .then((response) => {
                //после отправки получаем коментарии по новой
                // axios.get(`/comments/${referenceId}/`)
                // .then((response) => {
                //     console.log(response);
                    
                // });
                this.setState({
                    commentValue: ''
                })
                this.refreshComment(referenceId);
            });
        }    
    }

    refreshComment = (referenceId) => {
        axios.get(`/comments/${referenceId}/`)
        .then((response) => {
            this.setState({commentList: response.data});
        })
    }

    render() {
        const { commentList, userId, referenceId, candidateUserId, referenceUserId, isOpenModalRemove } = this.state;
        let comments = [];
        //для начала вырезаем все комментарии 1го уровня
        let answerList = commentList.filter((item) => {
            return item.parent != null
        })
        commentList.map((item, index) => {
            if(item.parent == null) {
                let answerForComment = [];
                let answerLvl2List = []
                answerList.map((answer)=>{
                    if(answer.parent == item.id) {
                        answerForComment.push(answer);
                        answerList.map((answerLvl2)=> {
                            if(answerLvl2.parent == answer.id) {
                                answerLvl2List.push(answerLvl2);
                            }
                        })
                    }
                })
                comments.push(
                    <CommentItem 
                        item={item} 
                        key={index}
                        referenceId={referenceId}
                        childLvl1={answerForComment}
                        childLvl2={answerLvl2List}
                        refreshComment={()=>{this.refreshComment(referenceId)}}
                        userId={userId}
                        candidateUserId={candidateUserId}
                    />
                )
            }    
        })

        return (
            <div className="comment">
                <div className="playlist__container">
                    <h2 className="h4 comment__title">{commentList.length} Comments</h2>
                    <div className="comment__list">
                        {comments}
                        {/* {commentList.map((item, index)=>{
                            return (
                                <CommentItem item={item} date={fullDate} key={item.id}/>
                            )
                        })} */}
                    </div>
                </div>
                {userId != referenceUserId ? (
                        <CommentForm 
                            value={this.state.commentValue}
                            // id={id} 
                            handleSubmit={(e)=>{this.handleSubmit(e)}}
                            handleChange={(e)=>{this.handleChange(e)}}
                        />
                    )
                    :
                    null
                }
            </div>
        )
    }
}

export default Comments;