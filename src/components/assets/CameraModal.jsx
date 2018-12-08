import React, { Component } from 'react';
import CameraView from 'Camera';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

type Props = {
  isModal: boolean,
  modalClose: Function,
  modalSave: Function
};

class CameraModal extends Component<Props, State> {

  props: Props;
  state: State;


  render() {
    return (
      <Modal
        isOpen={this.props.isModal}
        toggle={this.props.modalClose}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.modalClose}>
          Place name of recipient in left-top corner
        </ModalHeader>
        <ModalBody>
          <div className="form-group">

          </div>
        </ModalBody>
        <ModalFooter>
            <CameraView />
          <Button color="secondary" onClick={this.props.modalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CameraModal;
