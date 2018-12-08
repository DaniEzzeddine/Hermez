import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

type Props = {
  userInfo: Object,
  isModal: boolean,
  modalClose: Function,
  modalSave: Function
};
type State = {
  userIntraname: string
};

class UserEditModal extends Component<Props, State> {

  props: Props;
  state: State;

  constructor(props) {
    super(props);
    this.state = {
      userIntraname: ""
    };
  }

  componentDidMount() {
    console.log(this.props.userInfo);
    if (this.props.userInfo) {
      let user = {};
      user.userIntraname = this.props.userInfo.intraname !== undefined ? this.props.userInfo.intraname : "";
      console.log(user);
      this.setState(user);
    }
  }

  inputChange(e) {
    e.preventDefault();
    let old_state = Object.assign({}, this.state);
    let target = e.target.dataset.local;
    old_state[target] = e.target.value;
    this.setState(old_state);
  }

  modalSave() {
    this.props.modalSave(this.state);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isModal}
        toggle={this.props.modalClose}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.modalClose}>
          Student Edit
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="intraname">
              Intraname
            </label>
            <input
              type="text"
              className="form-control"
              id="intraname"
              name="intraname"
              aria-describedby="intraname"
              placeholder="Intraname"
              data-local="userIntraname"
              value={this.state.userIntraname}
              onChange={this.inputChange.bind(this)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.modalSave.bind(this)}>
            Save
          </Button>
          {' '}
          <Button color="secondary" onClick={this.props.modalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default UserEditModal;
