import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { closeModalRecord } from '../../redux/actions/actions';
import axios from 'axios';

class ModalRecord extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenModalSave: false,
            isOpenModalPlanConfirm: false,
            isOpenModalPlan: false,
            planValue: '',
            isShowPlan: false,
            isOpenModalRemovePlan: false,
        }
    }

    openModalSave = () => {
        this.setState({
            isOpenModalSave: true
        })
    }

    closeModalSave = () => {
        this.setState({
            isOpenModalSave: false
        })
    }

    saveRecord = () => {
        document.getElementById('pipeSaveVideo-custom-id').click();
        this.closeModalSave();
    }

    openModalPlanConfirm = () => {
        this.setState({isOpenModalPlanConfirm: true})
    }

    closeModalPlanConfirm = () => {
        this.setState({isOpenModalPlanConfirm: false})
    }

    openModalPlan = () => {
        this.setState({
            isOpenModalPlan: true,
            isOpenModalPlanConfirm: false,
        })
    }

    closeModalPlan = () => {
        this.setState({isOpenModalPlan: false})
    }

    handleChangePlan = (e) => {
        this.setState({planValue: e.target.value})
    }

    showPlan = () => {
        this.setState({isShowPlan: true})
    }

    hidePlan = () => {
        this.setState({isShowPlan: false})
    }

    editPlan = () => {
        this.setState({
            isShowPlan: false,
            isOpenModalPlan: true,
        })
    }

    savePlan = () => {
        localStorage.setItem('planValue', this.state.planValue);
        this.setState({
            isOpenModalPlan: false,
        })
    }

    deletePlan = () => {
        localStorage.setItem('planValue', '')
        this.setState({
            isOpenModalRemovePlan: false,
            isShowPlan: false,
            planValue: '',
        })
    }

    openModalRemovePlan = () => {
        this.setState({
            isOpenModalRemovePlan: true,
        })
    }

    closeModalRemovePlan = () => {
        this.setState({
            isOpenModalRemovePlan: false,
        })
    }

    componentDidMount() {
        const saveBtn = document.createElement('button');
        saveBtn.innerText = 'Save';
        saveBtn.setAttribute('class', 'btn btn-secondary btn-save-record');
        saveBtn.setAttribute('disabled', 'disabled');
        saveBtn.onclick = () => {
            this.openModalSave();
        }
        let { historyId } = this.props;
        let payload = '';
        axios.get(`/references/payload/${historyId}/`)
        .then(function (response) {
            payload = response.data.payload;
            // example params
            // var YOUR_CUSTOM_OBJECT_NAME = {qualityurl: "avq/240p.xml",accountHash:"your_account_hash",showMenu:1, mrt:120, payload:"your_payload_data_string"};
            // , payload:`{"userId":"55a95eeb936dd30100e0aff6","jobId":"55a7e6555f1bdc010014d6a1"}`
            const pipeParams = {size: {width:640,height:390}, qualityurl: "avq/480p.xml",accountHash:"be1868fe4c0200010a700350026b233d", eid:1, showMenu:"true", mrt:300,sis:0,asv:0,mv:1, dpv:0, ao:0, dup:0, payload:`${payload}`};
            PipeSDK.insert('custom-id', pipeParams, function(myRecorderObject){
                myRecorderObject.onReadyToRecord = () => {
                    saveBtn.setAttribute('disabled', 'disabled');
                    document.getElementById('pipeMenu-custom-id').appendChild(saveBtn);
                }
                
                myRecorderObject.onRecordingStarted = () => {
                    saveBtn.setAttribute('disabled', 'disabled');
                    document.getElementById('pipeRec-custom-id').removeAttribute('data-recorded');
                }

                myRecorderObject.btStopRecordingPressed = () => {
                    saveBtn.removeAttribute('disabled');
                    setTimeout(() => {
                        document.getElementById('pipeRec-custom-id').setAttribute('data-recorded', 'recorded')  
                    }, 200);
                }

                myRecorderObject.onSaveOk = () => {
                    myRecorderObject.remove();
                    window.location.reload(true)
                }
            });
        })

        this.setState({
            planValue: localStorage.getItem('planValue')
        })
       
    }

    render() {
        const { isOpenModalSave, isOpenModalPlanConfirm, isOpenModalPlan, planValue, isShowPlan, isOpenModalRemovePlan } = this.state;
        return (
           <Fragment>
                <div className="modal modal-record" id="modal-record" tabIndex="-1" role="dialog" aria-labelledby="modal-record" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 offset-lg-3">
                                            <h3 className="h1 modal-title modal-record__title"><span>Record</span> New Reference</h3>
                                        </div>
                                    </div>
                                </div>
                                <Link to="/references" className="close" >
                                    <i className="icon icon-close"></i>
                                </Link>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 offset-lg-3">
                                            <div className="modal-record__content">
                                                <div className={`modal-record__video ${isShowPlan ? 'open-plan' : ''}`}>
                                                    {/* <piperecorder id="custom-id" pipe-width="640" pipe-height="390" pipe-qualityurl="avq/720p.xml" pipe-accounthash="39732970b2a48fc747606c6800c58375" pipe-eid="fyv7ey" pipe-showmenu="1" pipe-mrt="300" pipe-sis="0" pipe-asv="0" pipe-mv="1" pipe-st="1" pipe-ssb="1" pipe-dpv="0" pipe-ao="0" pipe-dup="1" pipe-cornerradius="8" pipe-bgcol="0xf6f6f6" pipe-menucol="0xe9e9e9" pipe-normalcol="0x334455" pipe-overcol="0x556677" pipe-payload='{"userId":"55a95eeb936dd30100e0aff6","jobId":"55a7e6555f1bdc010014d6a1"}'></piperecorder> */}
                                                    <div id="custom-id"></div>
                                                    <div className="modal-record__action">
                                                        { !isShowPlan ?
                                                            (
                                                                <div className="modal-record__control">
                                                                    <div>
                                                                        {/* <div className="btn modal-record__btn modal-record__switch">switch to audio-only</div> */}
                                                                    </div>
                                                                    {planValue ? 
                                                                        (
                                                                            <button className="btn modal-record__btn modal-record__show-plan" onClick={this.showPlan}>
                                                                                <i className="icon icon-view"></i>
                                                                                show plan
                                                                            </button>
                                                                        )
                                                                        :
                                                                        (
                                                                            <button className="btn modal-record__btn modal-record__add-plan" onClick={ this.openModalPlanConfirm }>
                                                                                <i className="icon icon-plus"></i>
                                                                                add plan
                                                                            </button>
                                                                        )
                                                                    }  
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <div className="modal-record__plan-control">
                                                                    <div className="modal-record__plan-control__left">
                                                                        <button className="btn modal-record__btn modal-record__delete-plan" onClick={this.openModalRemovePlan}>
                                                                            <i className="icon icon-trash"></i>
                                                                            <span>delete</span>
                                                                        </button>
                                                                        <button className="btn modal-record__btn modal-record__edit-plan" onClick={this.editPlan}>
                                                                            <i className="icon icon-edit"></i>
                                                                            <span>edit</span>
                                                                        </button>
                                                                    </div>
                                                                    <button className="btn modal-record__btn modal-record__hide-plan" onClick={this.hidePlan}>
                                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M17.8113 13.3898C19.5717 11.9438 20.7129 9.87968 21.0013 7.61985C21.0171 7.48853 21.0068 7.35539 20.9711 7.22803C20.9354 7.10068 20.875 6.9816 20.7933 6.8776C20.7116 6.77359 20.6102 6.68671 20.4949 6.62189C20.3796 6.55708 20.2526 6.51561 20.1213 6.49985C19.99 6.48409 19.8568 6.49435 19.7295 6.53005C19.6021 6.56574 19.4831 6.62617 19.3791 6.70789C19.2751 6.78961 19.1882 6.89101 19.1234 7.0063C19.0585 7.1216 19.0171 7.24853 19.0013 7.37985C18.7622 9.06613 17.9225 10.6094 16.6364 11.726C15.3504 12.8426 13.7045 13.4574 12.0013 13.4574C10.2982 13.4574 8.65226 12.8426 7.36621 11.726C6.08015 10.6094 5.24039 9.06613 5.00131 7.37985C4.98556 7.24853 4.94409 7.1216 4.87927 7.0063C4.81446 6.89101 4.72757 6.78961 4.62357 6.70789C4.51957 6.62617 4.40049 6.56574 4.27313 6.53005C4.14578 6.49435 4.01264 6.48409 3.88131 6.49985C3.74999 6.51561 3.62306 6.55708 3.50777 6.62189C3.39247 6.68671 3.29107 6.77359 3.20936 6.8776C3.12764 6.9816 3.06721 7.10068 3.03151 7.22803C2.99582 7.35539 2.98556 7.48853 3.00131 7.61985C3.28715 9.87819 4.42464 11.9421 6.18131 13.3898L3.88131 15.7098C3.71749 15.9012 3.63188 16.1472 3.6416 16.3989C3.65132 16.6506 3.75566 16.8893 3.93375 17.0674C4.11185 17.2455 4.35059 17.3498 4.60226 17.3596C4.85394 17.3693 5.10001 17.2837 5.29131 17.1199L7.90131 14.5198C8.87112 15.0099 9.92117 15.3216 11.0013 15.4398V18.9998C11.0013 19.2651 11.1067 19.5194 11.2942 19.707C11.4817 19.8945 11.7361 19.9998 12.0013 19.9998C12.2665 19.9998 12.5209 19.8945 12.7084 19.707C12.896 19.5194 13.0013 19.2651 13.0013 18.9998V15.4398C14.0815 15.3216 15.1315 15.0099 16.1013 14.5198L18.7113 17.1199C18.9026 17.2837 19.1487 17.3693 19.4004 17.3596C19.652 17.3498 19.8908 17.2455 20.0689 17.0674C20.247 16.8893 20.3513 16.6506 20.361 16.3989C20.3707 16.1472 20.2851 15.9012 20.1213 15.7098L17.8113 13.3898Z" fill=""></path>
                                                                        </svg>
                                                                        hide plan
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                { isShowPlan ? 
                                                    // (
                                                    //     <div className="modal-record__plan">
                                                    //         <div className="modal-record__plan__container">
                                                    //             <textarea className="modal-record__field" defaultValue={planValue}></textarea>
                                                    //         </div>    
                                                    //     </div>
                                                    // )
                                                    // :
                                                    (
                                                        <div className="modal-record__plan">
                                                            <div className="modal-record__plan__container">
                                                                <textarea className="modal-record__field" readOnly value={planValue}></textarea>
                                                            </div>    
                                                        </div>
                                                    )
                                                    :
                                                    null
                                                } 
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="modal-footer">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 offset-lg-3">
                                            <div className="modal-record__action">
                                                <div className="modal-record__control">
                                                    <div className="btn modal-record__btn modal-record__switch">switch to audio-only</div>
                                                    <button className="btn modal-record__btn modal-record__show-plan">
                                                        <i className="icon icon-view"></i>
                                                        show plan
                                                    </button>
                                                    <button className="btn modal-record__btn modal-record__add-plan">
                                                        <i className="icon icon-plus"></i>
                                                        add plan
                                                    </button>
                                                </div>
                                                <div className="modal-record__plan-control">
                                                    <div className="modal-record__plan-control__left">
                                                        <button className="btn modal-record__btn modal-record__delete-plan">
                                                            <i className="icon icon-trash"></i>
                                                            <span>delete</span>
                                                        </button>
                                                        <button className="btn modal-record__btn modal-record__edit-plan">
                                                            <i className="icon icon-edit"></i>
                                                            <span>edit</span>
                                                        </button>
                                                    </div>
                                                    <button className="btn modal-record__btn modal-record__hide-plan">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M17.8113 13.3898C19.5717 11.9438 20.7129 9.87968 21.0013 7.61985C21.0171 7.48853 21.0068 7.35539 20.9711 7.22803C20.9354 7.10068 20.875 6.9816 20.7933 6.8776C20.7116 6.77359 20.6102 6.68671 20.4949 6.62189C20.3796 6.55708 20.2526 6.51561 20.1213 6.49985C19.99 6.48409 19.8568 6.49435 19.7295 6.53005C19.6021 6.56574 19.4831 6.62617 19.3791 6.70789C19.2751 6.78961 19.1882 6.89101 19.1234 7.0063C19.0585 7.1216 19.0171 7.24853 19.0013 7.37985C18.7622 9.06613 17.9225 10.6094 16.6364 11.726C15.3504 12.8426 13.7045 13.4574 12.0013 13.4574C10.2982 13.4574 8.65226 12.8426 7.36621 11.726C6.08015 10.6094 5.24039 9.06613 5.00131 7.37985C4.98556 7.24853 4.94409 7.1216 4.87927 7.0063C4.81446 6.89101 4.72757 6.78961 4.62357 6.70789C4.51957 6.62617 4.40049 6.56574 4.27313 6.53005C4.14578 6.49435 4.01264 6.48409 3.88131 6.49985C3.74999 6.51561 3.62306 6.55708 3.50777 6.62189C3.39247 6.68671 3.29107 6.77359 3.20936 6.8776C3.12764 6.9816 3.06721 7.10068 3.03151 7.22803C2.99582 7.35539 2.98556 7.48853 3.00131 7.61985C3.28715 9.87819 4.42464 11.9421 6.18131 13.3898L3.88131 15.7098C3.71749 15.9012 3.63188 16.1472 3.6416 16.3989C3.65132 16.6506 3.75566 16.8893 3.93375 17.0674C4.11185 17.2455 4.35059 17.3498 4.60226 17.3596C4.85394 17.3693 5.10001 17.2837 5.29131 17.1199L7.90131 14.5198C8.87112 15.0099 9.92117 15.3216 11.0013 15.4398V18.9998C11.0013 19.2651 11.1067 19.5194 11.2942 19.707C11.4817 19.8945 11.7361 19.9998 12.0013 19.9998C12.2665 19.9998 12.5209 19.8945 12.7084 19.707C12.896 19.5194 13.0013 19.2651 13.0013 18.9998V15.4398C14.0815 15.3216 15.1315 15.0099 16.1013 14.5198L18.7113 17.1199C18.9026 17.2837 19.1487 17.3693 19.4004 17.3596C19.652 17.3498 19.8908 17.2455 20.0689 17.0674C20.247 16.8893 20.3513 16.6506 20.361 16.3989C20.3707 16.1472 20.2851 15.9012 20.1213 15.7098L17.8113 13.3898Z" fill=""/>
                                                        </svg>
                                                        hide plan
                                                    </button>
                                                </div>
                                                <button className="btn btn-primary btn-block btn-start-record">Start Recording</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                { isOpenModalSave ? (
                    <div className={`modal ${isOpenModalSave ? 'show' : 'fade'} modal-remove`} id="modal-save-record" tabIndex="-1" role="dialog" aria-labelledby="modal-save-record" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="h3 modal-title">Are you sure you want to save?</h3>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick = { this.closeModalSave }>No</button>
                                    <button type="button" className="btn btn-primary" onClick = { this.saveRecord }>YES</button>
                                </div>
                            </div>
                        </div>
                    </div>    
                    ) : ''
                }

                { isOpenModalPlanConfirm ? 
                    (
                        <div className={`modal ${isOpenModalPlanConfirm ? 'show' : 'fade' } modal-remove modal-speech-start`} id="modal-write-speech" tabIndex="-1" role="dialog" aria-labelledby="modal-remove-plan" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="h3 modal-title">Write Speech Plan</h3>
                                        <p className="modal-subtitle">To make things easier, you can add a speech plan and read from it while recording your video recommendation. Add a plan?</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick = { this.closeModalPlanConfirm }>No</button>
                                        <button type="button" className="btn btn-primary" onClick={this.openModalPlan}>YES</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    null
                }

                { isOpenModalPlan ?
                    (
                        <div className={`modal ${isOpenModalPlan ? 'show' : 'fade'} modal-speech`} id="modal-speech" tabIndex="-1" role="dialog" aria-labelledby="modal-speech" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="h4 modal-title">Write Speech Plan</h4>
                                        <p className="modal-speech__subtitle">Only you will see this. Use the space below to plan the narrative for your video</p>
                                        <button type="button" className="close" onClick={this.closeModalPlan}>
                                            <i className="icon icon-close"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="modal-speech__panel">
                                            <textarea 
                                                className="modal-speech__field"
                                                placeholder="Text your plan" 
                                                onChange={(e) => {this.handleChangePlan(e)}}
                                                value={planValue}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary btn-block" onClick={this.savePlan}>Save Plan</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    null
                }

                { isOpenModalRemovePlan ? 
                    (
                        <div className={`modal ${isOpenModalRemovePlan ? 'show' : 'fade'} modal-remove`} id="modal-remove-plan" tabIndex="-1" role="dialog" aria-labelledby="modal-remove-plan" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h3 className="h3 modal-title">To remove the PLAN?</h3>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={this.closeModalRemovePlan}>No</button>
                                        <button type="button" className="btn btn-primary" onClick={this.deletePlan}>YES</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    null
                }
                
            </Fragment>    
       );
    }
}

const mapStateToProps = (state) => {
    return {
        isOpenModalRecord: state.isOpenModalRecord
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        onCloseModalRecord: () => dispatch(closeModalRecord())
    }
}

export default connect(mapStateToProps, mapDispachToProps)(ModalRecord);
// export default ModalRecord;