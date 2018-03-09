import React from "react";

class AddFishForm extends React.Component {
  // get values from inputfields
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = e => {
    e.preventDefault();
    const fish = {
      name: this.nameRef.value.value,
      priceRef: parseFloat(this.priceRef.value.value),
      statusRef: this.statusRef.value.value,
      descRef: this.descRef.value.value,
      imageRef: this.imageRef.value.value
    };
    this.props.addFish(fish);
    // refresh the form
    e.currentTarget.reset();
  };
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="Price"
        />
        <select
          name="status"
          ref={this.statusRef}
          type="text"
          placeholder="Status"
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input
          name="image"
          type="text"
          ref={this.imageRef}
          placeholder="Image"
        />
        <button type="submit">
          Add Fish
          <span role="img" aria-label="image">
            🐟
          </span>
        </button>
      </form>
    );
  }
}

export default AddFishForm;
