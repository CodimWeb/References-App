import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getSharedLink } from '../../redux/actions/actions';

class ModalRecordShare extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: this.props.sharedLink ? true : false,
            isCopy: false
        }
    }
    
    timer = null;

    copyLink = () => {
        const el = document.createElement('input');
        el.setAttribute('value', this.props.sharedLink);
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

    closeModalRecordShare = () => {
        this.setState({isOpen: false})
        this.props.onSetSharedLink('');
        this.props.getNewReference();
        
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render(){
        const { sharedLink } = this.props;
        const { isOpen, isCopy } = this.state;
        return (
            <div className={`modal ${isOpen ? 'show' : 'fade'} modal-share`} id="modal-share" tabIndex="-1" role="dialog" aria-labelledby="modal-share" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h1 modal-title modal-share__title">Your link has&nbsp;been <span>created</span></h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModalRecordShare}>
                                <i className="icon icon-close"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="modal-share__label">Share Link:</p>
                            <div className="modal-share__panel">
                                <a href={sharedLink} className="modal-share__link">{sharedLink}</a>
                                <div className="modal-share__action">
                                    <button className="btn btn-copy modal-share__copy" onClick={this.copyLink}>
                                        <i className="icon icon-copy"></i>
                                    </button>
                                    { isCopy ? <div className="modal-share__tooltip">Link copied!</div> : null }
                                    
                                </div>    
                            </div>
                            <p className="modal-share__description">Please share the link with your Reference via Email, Messenger or Text. Your Reference will be able to record video recommendation from any camera-equipped device after clicking the link.</p>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispachToProps)(ModalRecordShare);

// export default ModalRecordShare;

