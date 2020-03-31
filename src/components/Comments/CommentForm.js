import React, {Component} from 'react';

class CommentForm extends Component {
    constructor(props) {
        super(props)

    }

    render() {
       const { id, value } = this.props; 
        return (
            <form className="comment-form">
                {/* <div className="container"> */}
                    <div className="comment-form__container">
                        <h4 className="h4 comment__title">Add comment</h4>
                        <div className="form-group">
                            <textarea 
                                placeholder="Your comment" 
                                className="comment-form__field" 
                                onChange={(e) => {this.props.handleChange(e)}}
                                value={value}
                            ></textarea>
                        </div>
                        <button className="btn btn-primary btn-block" onClick={(e) => {this.props.handleSubmit(e)}}>add</button>
                    </div>
                {/* </div> */}
            </form>
        )
    }
}

export default CommentForm;