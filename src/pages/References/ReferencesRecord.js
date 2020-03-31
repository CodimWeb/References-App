import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// import Header from '../../components/Header/Header.js';
// import ReferencesNav from '../../components/ReferencesNav/ReferencesNav.js'
// import Footer from '../../components/Footer/Footer.js'
// import Profile from '../../components/Profile/Profile.js'
import ModalRecord from '../../components/Modals/ModalRecord.js';
import ModalRecordConfirm from '../../components/Modals/ModalRequestConfirm.js'
import { openModalRecord } from '../../redux/actions/actions';

class ReferencesRecord extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        const id = this.props.match.params.id || null;
        id ? this.setState({isModalRecordOpen: true}) : this.setState({isModalRecordOpen: false})
        this.props.onOpenModalRecord()
    }

    

    render() {
        return (
            <Fragment>
                
                { this.props.isOpenModalRecord ? 
                    <Fragment>
                        <ModalRecord historyId={this.props.match.params.id}/> 
                        <ModalRecordConfirm historyId={this.props.match.params.id}/>
                    </Fragment>    
                    :
                     null 
                }
                
            </Fragment>
        );
    }    
    
}

const mapStateToProps = (state) => {
    return {
        isOpenModalRecord: state.toggleModalRecord.isOpenModalRecord,
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        onOpenModalRecord: () => dispatch(openModalRecord()),
    }
}

export default connect(mapStateToProps, mapDispachToProps)(ReferencesRecord);

// export default References;