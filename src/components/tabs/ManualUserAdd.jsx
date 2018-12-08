import React, { Component } from 'react';
import CreatableSelect from 'react-select';

const scaryAnimals = [
  { label: "", value: 1 },
  { label: "Crocodiles", value: 2 },
  { label: "Sharks", value: 3 },
  { label: "Small crocodiles", value: 4 },
  { label: "Smallest crocodiles", value: 5 },
  { label: "Snakes", value: 6 },
];
class ManualUserAdd extends Component {

  render() {
    return (
      <div className="row">
        <div className="col">
          <CreatableSelect
            options={scaryAnimals}
            isClearable
            onChange={(opt, meta) => console.log(opt, meta)}
          />
        </div>
      </div>
    );
  }
}

export default ManualUserAdd;
