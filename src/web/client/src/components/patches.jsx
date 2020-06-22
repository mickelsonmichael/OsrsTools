import React from "react";
import { connect } from "react-redux";

class Patches extends React.Component {
  componentDidUpdate() {
    let patches = [];

    // if (this.state.falador) patches.push(0);
    // if (this.state.morytania) patches.push(0);
    // if (this.state.ardougne) patches.push(0);
    // if (this.state.trollheim) patches.push(0);
    // if (this.state.harmony) patches.push(0);
    // if (this.state.weiss) patches.push(0);

    // if (this.state.kandarin) {
    //   if (this.state.diaries.kandarinElite) {
    //     patches.push(0.15);
    //   } else if (this.state.diaries.kandarinHard) {
    //     patches.push(0.1);
    //   } else if (this.state.diaries.kandarinMedium) {
    //     patches.push(0.05);
    //   } else {
    //     patches.push(0);
    //   }
    // }

    // if (this.state.hosidius) {
    //   patches.push(this.state.diaries.kourendHard ? 0.05 : 0);
    // }

    // if (this.state.farmingGuild) {
    //   patches.push(this.state.diaries.kourendHard ? 0.05 : 0);
    // }

    // this.props.updatePatches(patches);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h3>Patches</h3>

        <div className="row">
          <div className="col-12 col-md">
            <div className="form-check">
              <label htmlFor="patch-farmingGuild" className="form-check-label">
                <input
                  type="checkbox"
                  id="patch-farmingGuild"
                  className="form-check-input"
                  value={this.props.farmingGuild}
                  // onChange={(e) => {
                  //   this.setState({ farmingGuild: e.target.checked });
                  // }}
                />
                Farming Guild
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="patch-weiss" className="form-check-label">
                <input
                  type="checkbox"
                  id="patch-weiss"
                  className="form-check-input"
                  value={this.props.weiss}
                  // onChange={(e) => {
                  //   this.setState({ weiss: e.target.checked });
                  // }}
                />
                Weiss
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="patch-harmony" className="form-check-label">
                <input
                  type="checkbox"
                  id="patch-harmony"
                  className="form-check-input"
                  value={this.props.harmony}
                  // onChange={(e) => {
                  //   this.setState({ harmony: e.target.checked });
                  // }}
                />
                Harmony Island
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="patch-hosidius" className="form-check-label">
                <input
                  type="checkbox"
                  id="patch-hosidius"
                  className="form-check-input"
                  value={this.props.hosidius}
                  // onChange={(e) => {
                  //   this.setState({ hosidius: e.target.checked });
                  // }}
                />
                Hosidius
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="patch-trollheim" className="form-check-label">
                <input
                  type="checkbox"
                  id="patch-trollheim"
                  className="form-check-input"
                  value={this.props.trollheim}
                  // onChange={(e) => {
                  //   this.setState({ trollheim: e.target.checked });
                  // }}
                />
                Trollheim
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="patch-ardougne" className="form-check-label">
                <input
                  type="checkbox"
                  id="patch-ardougne"
                  className="form-check-input"
                  value={this.props.ardougne}
                  // onChange={(e) => {
                  //   this.setState({ ardougne: e.target.checked });
                  // }}
                />
                Ardougne
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="patch-Falador" className="form-check-label">
                <input
                  type="checkbox"
                  id="patch-Falador"
                  className="form-check-input"
                  value={this.props.falador}
                  // onChange={(e) => {
                  //   this.setState({ falador: e.target.checked });
                  // }}
                />
                Falador
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="patch-morytania" className="form-check-label">
                <input
                  type="checkbox"
                  id="patch-morytania"
                  className="form-check-input"
                  value={this.props.morytania}
                  // onChange={(e) => {
                  //   this.setState({ morytania: e.target.checked });
                  // }}
                />
                Morytania
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="patch-kandarin" className="form-check-label">
                <input
                  type="checkbox"
                  id="patch-kandarin"
                  className="form-check-input"
                  value={this.props.kandarin}
                  // onChange={(e) => {
                  //   this.setState({ kandarin: e.target.checked });
                  // }}
                />
                Kandarin
              </label>
            </div>
          </div>

          <div className="col-12 col-md">
            <hr className="d-md-none" />

            <div className="form-check">
              <label
                htmlFor="diary-kandarinMedium"
                className="form-check-label"
              >
                <input
                  type="checkbox"
                  id="diary-kandarinMedium"
                  name="diary-kandarin"
                  className="form-check-input"
                  value={this.props.diaries.kandarinMedium}
                  // onChange={(e) => {
                  //   let val = e.target.checked;

                  //   if (val) {
                  //     this.setState({
                  //       diaries: {
                  //         kandarinMedium: true,
                  //         kandarinHard: false,
                  //         kandarinElite: false,
                  //       },
                  //     });
                  //   } else {
                  //     this.setState({ diaries: { kandarinMedium: false } });
                  //   }
                  // }}
                />
                Kandarin Medium <small>(+5%)</small>
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="diary-kandarinHard" className="form-check-label">
                <input
                  type="checkbox"
                  id="diary-kandarinHard"
                  name="diary-kandarin"
                  className="form-check-input"
                  value={this.props.diaries.kandarinHard}
                  // onChange={(e) => {
                  //   let val = e.target.checked;

                  //   if (val) {
                  //     this.setState({
                  //       diaries: {
                  //         kandarinMedium: false,
                  //         kandarinHard: true,
                  //         kandarinElite: false,
                  //       },
                  //     });
                  //   } else {
                  //     this.setState({ diaries: { kandarinHard: false } });
                  //   }
                  // }}
                />
                Kandarin Hard <small>(+10%)</small>
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="diary-kandarinElite" className="form-check-label">
                <input
                  type="checkbox"
                  id="diary-kandarinElite"
                  name="diary-kandarin"
                  className="form-check-input"
                  value={this.props.diaries.kandarinElite}
                  // onChange={(e) => {
                  //   let val = e.target.checked;

                  //   if (val) {
                  //     this.setState({
                  //       diaries: {
                  //         kandarinMedium: false,
                  //         kandarinHard: false,
                  //         kandarinElite: true,
                  //       },
                  //     });
                  //   } else {
                  //     this.setState({ diaries: { kandarinElite: false } });
                  //   }
                  // }}
                />
                Kandarin Elite <small>(+15%)</small>
              </label>
            </div>

            <div className="form-check">
              <label htmlFor="diary-kourendHard" className="form-check-label">
                <input
                  type="checkbox"
                  id="diary-kourendHard"
                  name="diary-kourend"
                  className="form-check-input"
                  value={this.props.diaries.kourendHard}
                  // onChange={(e) => {
                  //   this.setState({
                  //     diaries: { kourendHard: e.target.checked },
                  //   });
                  // }}
                />
                Kourend Hard{" "}
                <small>(+5% to Farming Guild &amp; Hosidius Patches)</small>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ ...state.herblore, diaries: [] }))(
  Patches
);
