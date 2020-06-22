﻿import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

class HerbloreFilters extends React.Component {
  hidePotion(potion, showPotion) {
    // if (showPotion && this.props.potionsToHide.includes(potion)) {
    //   let newList = this.props.potionsToHide.map((x) => x);
    //   newList.splice(newList.indexOf(potion), 1);
    //   this.setState({ potionsToHide: newList }, () =>
    //     this.props.updateFilters(this.props)
    //   );
    // } else if (!showPotion && !this.props.potionsToHide.includes(potion)) {
    //   let newList = this.props.potionsToHide.map((x) => x);
    //   newList.push(potion);
    //   this.setState({ potionsToHide: newList }, () =>
    //     this.props.updateFilters(this.props)
    //   );
    // }
  }

  selectNone() {
    // this.setState(
    //   {
    //     potionsToHide: this.props.potions.map((potion) => potion.id),
    //   },
    //   () => this.props.updateFilters(this.props)
    // );
  }

  selectAll() {
    // this.setState(
    //   {
    //     potionsToHide: [],
    //   },
    //   () => this.props.updateFilters(this.props)
    // );
  }

  render() {
    console.log(this.props);

    let potions = this.props.potions
      .filter(
        (potion) => potion.name.toLowerCase().indexOf(this.props.search) > -1
      )
      .map((potion) => {
        let id = "filter-" + potion.id;
        let isSelected = this.props.potionsToHide.indexOf(potion.id) == -1;

        return (
          <div className="form-check" key={potion.id}>
            <label htmlFor={id} className="form-check-label">
              <input
                type="checkbox"
                id={id}
                className="form-check-input"
                checked={isSelected}
                onChange={(e) => this.hidePotion(potion.id, e.target.checked)}
              />
              {potion.name}
            </label>
          </div>
        );
      });

    console.log("here");
    return (
      <div>
        <button
          id="filter-modal-btn"
          type="button"
          className="btn btn-link btn"
          data-toggle="modal"
          data-target="#filter-modal"
        >
          <span className="fa fa-filter"></span>
          Filter
        </button>

        <Modal.Dialog>
          <Modal.Body>
            <div className="form-horizontal">
              <div className="alert alert-warning mb-1">
                Removing a potion/type using the filters will reset the counts
                you've entered for that potion/type.
              </div>

              <h2>Types</h2>

              <div className="d-flex flex-columns justify-content-around">
                <div className="px-1 flex-grow-1">
                  <div className="form-check">
                    <label htmlFor="filter-clean" className="form-check-label">
                      <input
                        type="checkbox"
                        id="filter-clean"
                        className="form-check-input"
                        defaultChecked={this.props.showClean}
                        // onChange={(e) => {
                        //   let val = e.target.checked;
                        //   this.setState({ showClean: val }, () =>
                        //     this.props.updateFilters(this.props)
                        //   );
                        // }}
                      />
                      Clean
                    </label>
                  </div>

                  <div className="form-check">
                    <label htmlFor="filter-grimy" className="form-check-label">
                      <input
                        type="checkbox"
                        id="filter-grimy"
                        className="form-check-input"
                        defaultChecked={this.props.showGrimy}
                        // onChange={(e) => {
                        //   let val = e.target.checked;
                        //   this.setState({ showGrimy: val }, () =>
                        //     this.props.updateFilters(this.props)
                        //   );
                        // }}
                      />
                      Grimy
                    </label>
                  </div>
                </div>

                <div className="px-1 flex-grow-1">
                  <div className="form-check form-check-inline">
                    <label htmlFor="filter-seeds" className="form-check-label">
                      <input
                        type="checkbox"
                        id="filter-seeds"
                        className="form-check-input"
                        defaultChecked={this.props.showSeeds}
                        // onChange={(e) => {
                        //   let val = e.target.checked;

                        //   this.setState({ showSeeds: val }, () =>
                        //     this.props.updateFilters(this.props)
                        //   );
                        // }}
                      />
                      Seeds
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-columns flex-md-rows justify-content-between">
                <h2>Potions</h2>
                <div className="align-self-center">
                  <button
                    type="button"
                    className="btn btn-link btn-sm"
                    onClick={this.selectAll}
                  >
                    Select All
                  </button>
                  |
                  <button
                    type="button"
                    className="btn btn-link btn-sm"
                    onClick={this.selectNone}
                  >
                    Select None
                  </button>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  // onInput={(e) =>
                  //   this.setState({ search: e.target.value.toLowerCase() })
                  // }
                  className="form-control form-control-sm"
                  placeholder="Search"
                />
              </div>

              <div className="d-flex flex-columns justify-content-around">
                <div className="px-1 flex-grow-1">
                  {/* {potions.slice(0, Math.ceil(potions.length / 2))} */}
                </div>
                <div className="px-1 flex-grow-1">
                  {/* {potions.slice(Math.ceil(potions.length / 2))} */}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(HerbloreFilters);

// this.props = {
//   potionsToHide: [],
//   showClean: true,
//   showGrimy: true,
//   showSeeds: true,
//   search: "",
// };
