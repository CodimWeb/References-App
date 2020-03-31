import React, {Component} from 'react';
import axios from 'axios';
import getCookie from '../../config/getCookie.js'

class ModalRecordConfirm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            name: '',
            title: '',
            fullName: '',
            titleReference: '',
            startDate: '',
            endDate: '',
            finalNameValue: 1,
            finalTitleValue: 1,
            finalTitleFullNameValue: 1,
            finalTitlePositionReferencesValue: 1,
            finalStartDateValue: 1,
            finalEndDateValue: 1

        }
    }

    componentDidMount() {
        let { historyId } = this.props;
        axios.get(`/references/record/${historyId}/info/`)
        .then((response) => {
            if( response.data.status == false ) {
                this.setState({
                    isOpen: false
                })
            } else {
                this.setState({
                    isOpen: true,
                    name: response.data.company,
                    title: response.data.position,
                    fullName: response.data.reference_name,
                    titleReference: response.data.reference_position,
                    startDate: response.data.start_date,
                    endDate: response.data.end_date,
                })
            }
        })
    }

    handleChange = (e) => {
        let id = e.target.getAttribute('id')
        if(id == 'final-name') {
            e.target.value == 1 ? this.setState({ finalNameValue: 0 }) : this.setState({ finalNameValue: 1 })
        }
        else if(id == 'final-title') {
            e.target.value == 1 ? this.setState({ finalTitleValue: 0 }) : this.setState({ finalTitleValue: 1 })
        }
        else if(id == 'final-title-full-name') {
            e.target.value == 1 ? this.setState({ finalTitleFullNameValue: 0 }) : this.setState({ finalTitleFullNameValue: 1 })
        }
        else if(id == 'final-title-position-references') {
            e.target.value == 1 ? this.setState({ finalTitlePositionReferencesValue: 0 }) : this.setState({ finalTitlePositionReferencesValue: 1 })
        }
        else if(id == 'final-start-date') {
            e.target.value == 1 ? this.setState({ finalStartDateValue: 0 }) : this.setState({ finalStartDateValue: 1 })
        }
        else if(id == 'final-end-date') {
            e.target.value == 1 ? this.setState({ finalEndDateValue: 0 }) : this.setState({ finalEndDateValue: 1 })
        }
    }

    handleSubmit = (e) => {
        let { historyId } = this.props;
        const {finalNameValue, finalTitleValue, finalTitleFullNameValue, finalTitlePositionReferencesValue, finalStartDateValue, finalEndDateValue} = this.state;
        let csrftoken = getCookie('csrftoken');
        axios.defaults.headers.post['X-CSRFToken'] = csrftoken;
        let data = new FormData();
        data.append('company_is_confirmed', finalNameValue);
        data.append('position_is_confirmed', finalTitleValue);
        data.append('reference_name_is_confirmed', finalTitleFullNameValue);
        data.append('reference_position_is_confirmed', finalTitlePositionReferencesValue);
        data.append('start_date_is_confirmed', finalStartDateValue);
        data.append('end_date_is_confirmed', finalEndDateValue);
        axios.post(`/references/record/${historyId}/confirm/`, data).then((response) => {
            this.toggleModal();
        });
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    formatDate = (date) => {
        //frontend date format mm(str)-dd-yyyy backend format yyyy-mm-dd 
        //this func format date from dd-mm-yyyy to mm-dd-yyyy 
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let datePath = date.split('-');
        let month = monthNames[parseInt(datePath[1]) - 1];
        let validDate = `${month} ${datePath[2]}, ${datePath[0]}`;
        return validDate;
    }


    render() {
        const { isOpen, 
                name, 
                title, 
                fullName, 
                titleReference, 
                startDate, 
                endDate,
                finalNameValue,
                finalTitleValue,
                finalTitleFullNameValue,
                finalTitlePositionReferencesValue,
                finalStartDateValue,
                finalEndDateValue
        } = this.state;

        const validStartDate = this.formatDate(startDate);
        const validEndDate = this.formatDate(endDate);

        return (
            <div className={`modal ${ isOpen ? 'show' : 'fade' } modal-new-video modal-new-video-final`} id="modal-new-video-final" tabIndex="-1" role="dialog" aria-labelledby="modal-new-video-final" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3 modal-title">New<br/>Video Reference</h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(e)=> {this.toggleModal()}}>
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
                                            <div className="form-group new-video__form-group">
                                                <p className="modal-new-video-final__label">employer name</p>
                                                <input type="checkbox" id="final-name" className="modal-new-video-final__check" value={finalNameValue} defaultChecked onChange={(e)=>{this.handleChange(e)}}/>
                                                <label htmlFor="final-name" className="modal-new-video-final__text">{name}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group new-video__form-group">
                                                <p className="modal-new-video-final__label">title</p>
                                                <input type="checkbox" id="final-title" className="modal-new-video-final__check" value={finalTitleValue} defaultChecked onChange={(e)=>{this.handleChange(e)}}/>
                                                <label htmlFor="final-title" className="modal-new-video-final__text">{title}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group new-video__form-group">
                                                <p className="modal-new-video-final__label">full name of your reference</p>
                                                <input type="checkbox" id="final-title-full-name" className="modal-new-video-final__check" value={finalTitleFullNameValue} defaultChecked onChange={(e)=>{this.handleChange(e)}}/>
                                                <label htmlFor="final-title-full-name" className="modal-new-video-final__text">{fullName}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group new-video__form-group">
                                                <p className="modal-new-video-final__label">title of your Reference:</p>
                                                <input type="checkbox" id="final-title-position-references" className="modal-new-video-final__check" value={finalTitlePositionReferencesValue} defaultChecked onChange={(e)=>{this.handleChange(e)}}/>
                                                <label htmlFor="final-title-position-references" className="modal-new-video-final__text">{titleReference}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 new-video__mobile-devider">
                                            <div className="form-group new-video__form-group">
                                                <p className="modal-new-video-final__label">start date</p>
                                                <input type="checkbox" id="final-start-date" className="modal-new-video-final__check" value={finalStartDateValue} defaultChecked onChange={(e)=>{this.handleChange(e)}}/>
                                                <label htmlFor="final-start-date" className="modal-new-video-final__text">{validStartDate}</label>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group new-video__form-group">
                                                <p className="modal-new-video-final__label">end date</p>
                                                <input id="final-end-date" type="checkbox" className="modal-new-video-final__check" value={finalEndDateValue} defaultChecked onChange={(e)=>{this.handleChange(e)}}/>
                                                <label htmlFor="final-end-date" className="modal-new-video-final__text">{validEndDate}</label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>    
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={(e)=>{this.handleSubmit(e)}}>SKIP</button>
                            <button type="button" className="btn btn-primary" onClick={(e)=>{this.handleSubmit(e)}}>ADD</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalRecordConfirm;