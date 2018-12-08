import React, { Component } from 'react';
import UserEditModal from 'UserEditModal';
import CameraModal from 'CameraModal';
import axios from 'axios';

type Props = {};
type State = {
  find_users:array,
  isModal: boolean,
  isCamera: boolean,
  userEdit: int,
  recipients: array,
  any_input:boolean
};

class ActiveMailingList extends Component<Props, State> {

  props: Props;
  state: State;
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      any_input : false,
      isModal: false,
      isCamera: false,
      userEdit: -1,
      find_users: []
    };
    this.cameraTogler = this.cameraTogler.bind(this);
  }

  sendMail = () => {
    let old_state = Object.assign({}, this.state);

    axios.get("/sendmail")
    .then(res => {console.log(res)})
    old_state.userList = [];
    this.setState(old_state);
  }

  handleDeleteUser = (user, userNumber) => {
    let old_state = Object.assign({}, this.state);
    axios.get("/deleterecipient", {params:{input: user}})
    old_state.userList.splice(userNumber, 1);
    this.setState(old_state);
  }

  handleOnClick = (event) => {
    let old_state = Object.assign({}, this.state);
    let userFlag = false;
    old_state.userList.map((user) => {
      if (user[1] === event.target.value)
        userFlag = true;
    });
    if (!userFlag)
    {
      old_state.userList.push([old_state.userList.length, event.target.value])
      axios.get("/insertrecipient", {params:{input:event.target.value}})
      this.setState(old_state);
    }
  }

  handleChange = (event) => {
    if (event.target.value !== ""){
      this.setState({any_input : true});
      axios.get(`/autocomplete`, {params:{input:event.target.value}})
      .then(res => {
        this.setState({find_users: res.data.data});
      })}
      else 
        this.setState({any_input : false});
  }

  componentDidMount() {
    // Make action call here
    let old_state = Object.assign({}, this.state);
    axios.get("/getrecipients")
    .then(res => {
      old_state.userList = res.data.data;
      console.log(old_state.userList);
      this.setState(old_state)
    })
    // old_state.userList = [
    //   [
    //     1,
    //     "Eblan"
    //   ],
    //   [
    //     2,
    //     "Eblan"
    //   ],
    //   [
    //     3,
    //    "Eblan"
    //   ]
    // ];
  }
  // componentDidUpdate() {
  //   // Make action call here
  //   let old_state = Object.assign({}, this.state);
  //   if (old_state == )
  //   axios.get("/getrecipients")
  //   .then(res => {
  //     if (old_state.userList = res.data.data)
  //     old_state.userList = res.data.data;
  //     console.log(old_state.userList);
  //     this.setState(old_state);
  //   });
  // }
  modalTogler(user: int) {
    let old_state = Object.assign({}, this.state);
    old_state.isModal = !old_state.isModal;
    if (user === -1)
      old_state.userEdit = -1;
    else
      old_state.userEdit = user;
    this.setState(old_state);
  }

  modalSave(user: object) {
    let old_state = Object.assign({}, this.state);
    axios.get('/changerecipient', {params: {old_value:old_state.userList[old_state.userEdit][1], new_value:user.userIntraname}});
    old_state.userList[old_state.userEdit][1] = user.userIntraname;
    old_state.isModal = !old_state.isModal;
    old_state.userEdit = -1;
    this.setState(old_state);
  }


  cameraTogler() {
    let old_state = Object.assign({}, this.state);
    old_state.isCamera = !old_state.isCamera;
    this.setState(old_state);
  }

  cameraSave() {
    let old_state = Object.assign({}, this.state);
    old_state.isCamera = !old_state.isCamera;
    this.setState(old_state);
  }
  generateList() {
    if (this.state.userList.length === 0)
      return null;
    return this.state.userList.map((user, index) => {
      return (
        <tr
          key={user[0]}
        >
         <td style={{align:"center"}}>
              {user[1]}
          </td>
          <td style={{align:"center"}}>
          <button onClick={this.modalTogler.bind(this, index)} className="btn btn-primary btn-info">Edit</button>
          </td>
          <td style={{align:"center"}}>
          <button onClick={this.handleDeleteUser.bind(this, user[1], index)} className="btn btn-primary btn-danger">Delete</button>
          </td>
        </tr>
      );
    })
  }


  renderDropdown() {
    return (
      <div style={{width: "100%", zIndex: '1000', backgroundColor: "white"}} className=" dropdown border position-fixed display-none border-top-0">
      {this.state.any_input?
        this.state.find_users.map((user) => {
          return (
            <option
              className="dropdown-item w-100"
              style={{ backgroundColor:"#eee"  }}
              onClick={this.handleOnClick}
              value={user[2]}
            >
            {user[2]}
            </option>
          )}): null}
    </div>
    )
  }
userIntra
  renderCamera(){
    console.log("camera");
    return (
      <CameraModal
        isModal={this.state.isCamera}
        modalClose={this.cameraTogler.bind(this)}
        modalSave={this.cameraSave.bind(this)}
      />
    );
  }
  renderModal() {
    return (
      <UserEditModal
        isModal={this.state.isModal}
        modalClose={this.modalTogler.bind(this, -1)}
        modalSave={this.modalSave.bind(this)}
      />
    );
  }

  render() {
    let camera_show = null;
    if (this.state.isCamera)
      camera_show = this.renderCamera();
    let modal_show = null;
    if (this.state.isModal && this.state.userEdit > -1)
      modal_show = this.renderModal();
    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              <label>List of Recipients</label>
              <input
                className="form-control"
                type="text"
                name="input"
                onChange={this.handleChange}
              />
              {this.state.any_input?this.renderDropdown():null}
            </div>
          </div>
          <div className="row">
            <div class="panel panel-default user_panel w-100">
              <div class="panel-body">
				        <div class="table-container">
                  <table class="table-users table" border="0">
                    <tbody>
                      {this.generateList()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        <div className="row">
          <div className="col">
            <button
            type="button"
            class="btn btn-success"
            onClick={this.sendMail}
            >Success</button>
            <button
            onClick={this.cameraTogler}
            className="btn btn-primary"
            >Camera</button>
          </div>
        </div>
        </div>
        {modal_show}
        {camera_show}
      </div>
    );
  }
}

export default ActiveMailingList;
