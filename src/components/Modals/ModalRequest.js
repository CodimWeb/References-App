import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getSharedLink } from '../../redux/actions/actions';
import DateInput from '../../components/DateInput/DateInput.js';
import getCookie from '../../config/getCookie.js'
import axios from 'axios';

class ModalRequest extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            title: '',
            fullName: '',
            titleReference: '',
            startDate: '',
            endDate: '',
            isActiveName: false,
            isActiveTitle: false,
            isActiveFullName: false,
            isActiveTitleReference: false,
            isActiveStartDate: false,
            isActiveEndDate: false
        }

    }

    formatDate = (date) => {
        //frontend date format mm-dd-yyyy backend format dd-mm-yyyy
        //this func format date from mm-dd-yyyy to dd-mm-yyyy before submit
        let datePath = date.split('-');
        let validDate = `${datePath[1]}-${datePath[0]}-${datePath[2]}`;
        return validDate;
    }

    handleChange = (e) => {
        let id = e.target.getAttribute('id')
        if(id == 'new-video-name') {
            this.setState({ name: e.target.value })
        }
        else if(id == 'new-video-title') {
            this.setState({ title: e.target.value })
        }
        else if(id == 'new-video-full-name') {
            this.setState({ fullName: e.target.value })
        }
        else if(id == 'new-video-title-reference') {
            this.setState({ titleReference: e.target.value })
        }
        else if(id == 'start-date') {
            this.setState({ startDate: e.target.value })
        }
        else if(id == 'end-date') {
            this.setState({ endDate: e.target.value })
        }
    }

    handleFocus = (e) => {
        let id = e.target.getAttribute('id')
        if(id == 'new-video-name') {
            this.setState({isActiveName:true})
        }
        else if(id == 'new-video-title') {
            this.setState({isActiveTitle: true})
        }
        else if(id == 'new-video-full-name') {
            this.setState({isActiveFullName: true})
        }
        else if(id == 'new-video-title-reference') {
            this.setState({isActiveTitleReference: true})
        }
        else if(id == 'start-date') {
            this.setState({isActiveStartDate: true})
        }
        else if(id == 'end-date') {
            this.setState({isActiveEndDate: true})
        }
    }

    handleBlur = (e) => {
        let id = e.target.getAttribute('id')
        if(id == 'new-video-name') {
            if(!this.state.name) {
                this.setState({isActiveName:false})
            }
        }
        else if(id == 'new-video-title') {
            if(!this.state.title) {
                this.setState({isActiveTitle:false})
            }
        }
        else if(id == 'new-video-full-name') {
            if(!this.state.fullName) {
                this.setState({isActiveFullName:false})
            }
        }
        else if(id == 'new-video-title-reference') {
            if(!this.state.titleReference) {
                this.setState({isActiveTitleReference:false})
            }
        }
        else if(id == 'start-date') {
            if(!this.state.startDate) {
                this.setState({isActiveStartDate:false})
            }
        }
        else if(id == 'end-date') {
            if(!this.state.endDate) {
                this.setState({isActiveEndDate:false})
            }
        }
    }

    handleSubmit = (e) => {
        const {name, title, fullName, titleReference, startDate, endDate} = this.state;
        let csrftoken = getCookie('csrftoken');
        axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
        let validStartDate = this.formatDate(startDate);
        let validEndDate = this.formatDate(endDate);
        let data = new FormData();
        data.append('company', name);
        data.append('position', title);
        data.append('reference_name', fullName);
        data.append('reference_position', titleReference);
        data.append('start_date', validStartDate);
        data.append('end_date', validEndDate);
        axios.post('/request/', data).then((response) => {
            this.props.onSetSharedLink(response.data.url);
            this.props.toggleModal();
        });
    }

    render(){
        const { isOpen, toggleModal } = this.props;
        const { name, 
                title, 
                fullName,
                titleReference,
                startDate,
                endDate,
                isActiveName,
                isActiveTitle,
                isActiveFullName,
                isActiveTitleReference,
                isActiveStartDate,
                isActiveEndDate
            } = this.state;

        return (
            <div className={`modal ${ isOpen ? 'show' : 'fade' } modal-new-video`} id="modal-new-video" tabIndex="-1" role="dialog" aria-labelledby="modal-new-video" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3 modal-title">New<br/>Video Reference</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModal}>
                                <i className="icon icon-close"></i>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="new-video__container">
                                <h4 className="h4 new-video__title">Reference Representations</h4>
                                <p className="new-video__subtitle">Below are the key facts your Reference will be asked to confirm before recording their video recommendation for you.</p>
                                <form action="" className="new-video__form">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className={`form-group new-video__form-group ${isActiveName ? 'active' : ''}`}>
                                                <label htmlFor="new-video-name">employer name</label>
                                                <input type="text" id="new-video-name" className="form-control new-video__field" value={name} onFocus={(e)=>{this.handleFocus(e)}} onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleBlur(e)}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className={`form-group new-video__form-group ${isActiveTitle ? 'active' : ''}`}>
                                                <label htmlFor="new-video-title">title</label>
                                                <input type="text" id="new-video-title" className="form-control new-video__field" value={title} onFocus={(e)=>{this.handleFocus(e)}} onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleBlur(e)}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className={`form-group new-video__form-group ${isActiveFullName ? 'active' : ''}`}>
                                                <label htmlFor="new-video-full-name">full name of your reference</label>
                                                <input type="text" id="new-video-full-name" className="form-control new-video__field" value={fullName} onFocus={(e)=>{this.handleFocus(e)}} onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleBlur(e)}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className={`form-group new-video__form-group ${isActiveTitleReference ? 'active' : ''}`}>
                                                <label htmlFor="new-video-title-reference">title of your Reference:</label>
                                                <input type="text" id="new-video-title-reference" className="form-control new-video__field" value={titleReference} onFocus={(e)=>{this.handleFocus(e)}} onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleBlur(e)}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className={`form-group new-video__form-group ${isActiveStartDate ? 'active' : ''}`}>
                                                <label htmlFor="new-video-date-start">start date</label>
                                                <DateInput type="text" name='start-date' id="start-date" className="form-control new-video__field masked-date" value={startDate} onFocus={(e)=>{this.handleFocus(e)}} onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleBlur(e)}}/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className={`form-group new-video__form-group ${isActiveEndDate ? 'active' : ''}`}>
                                                <label htmlFor="new-video-date-end">end date</label>
                                                <DateInput type="text" name='start-date' id="end-date" className="form-control new-video__field masked-date" value={endDate} onFocus={(e)=>{this.handleFocus(e)}} onChange={(e)=>{this.handleChange(e)}} onBlur={(e)=>{this.handleBlur(e)}}/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>    
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={toggleModal}>SKIP</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>ADD</button>
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

export default connect(mapStateToProps, mapDispachToProps)(ModalRequest)

// export default ModalRequest;
