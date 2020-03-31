import React, {Component} from 'react';

class ModalRemoveRef extends Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     isOpen: false,
        // }
    }

    // componentDidMount() {
    //     this.setState({isOpen: this.props.isOpen})
    // }

    // closeModal = () => {
    //     console.log('close modal')
    //     this.setState({isOpen: false})
    // }

    render() {
        const {isOpen} = this.props;
        return (
            <div className={`modal ${isOpen ? 'show' : 'false'} modal-remove`} id="modal-remove" tabIndex="-1" role="dialog" aria-labelledby="modal-remove" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3 modal-title">Do you really want to remove the reference?</h3>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.closeModalRemoveRef}>No</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => {this.props.deleteRef(e)}}>YES</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalRemoveRef;