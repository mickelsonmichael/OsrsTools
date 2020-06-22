import React from "react";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";

import Loading from "./loading";
import Potion from "./potion";
import Patches from "./patches";
import HerbloreFilters from "./herblore_filters";

const expFor99 = 13034431;

class Herblore extends React.Component {
  async getHerbs() {
    const response = await fetch(this.props.herbUrl);
    return await response.json();
  }

  async getPotions() {
    const response = await fetch(this.props.url);
    return await response.json();
  }

  componentDidUpdate() {
    if (this.props.yieldCalculation) {
      this.calculateYield();
    }
  }

  updateFilters(newFilter) {
    let currentFilter = this.props.filter;

    if (
      !this.areEquivalent(
        newFilter.potionsToHide,
        currentFilter.potionsToHide
      ) ||
      newFilter.showSeeds !== currentFilter.showSeeds ||
      newFilter.showGrimy !== currentFilter.showGrimy ||
      newFilter.showClean !== currentFilter.showClean
    ) {
      let newXps = this.props.xps;

      newFilter.potionsToHide.map((potionId) => {
        try {
          newXps[potionId].clean = 0;
          newXps[potionId].grimy = 0;
          newXps[potionId].seeds = 0;
        } catch (ex) {
          console.warn(ex);
          console.log(potionId);
          console.log(newXps);
        }
      });

      this.setState({ filter: newFilter, xps: newXps });
    }
  }

  calculateYield() {
    let updated = this.props.herbs.map((herb) => {
      if (this.props.patches.length === 0) {
        herb.yield = 0;
        return herb;
      }

      let totalYields = 0;

      for (let i = 0; i < this.props.patches.length; i++) {
        let chanceToSave =
          ((((herb.level1Chance + 1) / 256) * (99 - this.props.farmingLevel)) /
            98 +
            (((herb.level99Chance + 1) / 256) * (this.props.farmingLevel - 1)) /
              98) *
            (1 +
              (this.props.secateurs ? 0.1 : 0) +
              (this.props.farmingCape ? 0.05 : 0) +
              (this.propsprops.attasSeed ? 0.05 : 0) +
              this.props.patches[i]) +
          1 / 256;

        totalYields += (3 + this.props.compostType) / (1 - chanceToSave);
      }

      herb.yield = totalYields / this.props.patches.length;

      return herb;
    });

    this.setState({
      yieldCalculation: false,
      herbs: updated,
    });
  }

  updateCount(e) {
    let target = e.target;
    this.setState({
      potions: {
        ...this.props.potions,
        [target.dataset.index]: target.value,
      },
      // potions: update(this.props.potions, {
      //   [target.dataset.index]: { num: { $set: target.value } },
      // }),
    });
  }

  updateTotal(xp, id, type) {
    this.setState({
      xps: {
        ...this.props.xps,
        [id]: {
          ...this.props.xps[id],
          [type]: xp,
        },
      },
      //xps: update(this.props.xps, { [id]: { [type]: { $set: xp } } }),
    });
  }

  updatePatches(patches) {
    if (this.areEquivalent(this.props.patches, patches)) return;

    this.setState({
      patches: patches,
      yieldCalculation: true,
    });
  }

  areEquivalent(original, incoming) {
    if (original.length !== incoming.length) return false;
    return original.sort().toString() === incoming.sort().toString();
  }

  calculateXpForPotion(potion) {
    let xps = this.props.xps[potion.id];
    return xps.grimy + xps.clean + xps.seeds;
  }

  render() {
    if (this.props.potions.length > 0) {
      let totalXp = 0;

      let data = this.props.potions
        .filter(
          (potion) => this.props.filter.potionsToHide.indexOf(potion.id) === -1
        )
        .map((pot) => {
          totalXp += this.calculateXpForPotion(pot);

          let key = "herb-" + pot.id;
          return (
            <Potion
              potion={pot}
              yield={
                this.props.herbs.filter((h) => h.name === pot.herb)[0].yield
              }
              key={key}
              updateTotal={(xp, type) => this.updateTotal(xp, pot.id, type)}
              showSeeds={this.props.filter.showSeeds}
              showGrimy={this.props.filter.showGrimy}
              showClean={this.props.filter.showClean}
            />
          );
        });

      return (
        <div>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-column flex-md-row">
                    <h2>Yield Calculation</h2>
                    <small className="align-self-center ml-1">
                      <a
                        id="bonusesCollapseBtn"
                        data-toggle="collapse"
                        href="#bonuses"
                        aria-expanded="true"
                        aria-controls="bonuses"
                        role="button"
                      >
                        [ Show/Hide ]
                      </a>
                    </small>
                  </div>
                  <div className="text-muted">
                    Fill in the data below to calculate the yield of each seed.
                  </div>
                </div>
              </div>
              <div className="row collapse show" id="bonuses">
                <div className="col">
                  <Patches updatePatches={this.updatePatches} />
                </div>
                <div className="col">
                  <h3>Other Bonuses</h3>
                  <div className="form-check">
                    <label htmlFor="farmingCape" className="form-check-label">
                      <input
                        type="checkbox"
                        name="farmingCape"
                        id="farmingCape"
                        className="form-check-input"
                        onChange={(e) =>
                          this.setState({
                            farmingCape: e.target.checked,
                            yieldCalculation: true,
                          })
                        }
                      />
                      Farming Cape (+5%)
                    </label>
                  </div>
                  <div className="form-check">
                    <label htmlFor="secateurs" className="form-check-label">
                      <input
                        type="checkbox"
                        name="secateurs"
                        id="secateurs"
                        className="form-check-input"
                        value={this.props.secateurs}
                        onChange={(e) =>
                          this.setState({
                            secateurs: e.target.checked,
                            yieldCalculation: true,
                          })
                        }
                      />
                      Magic Secateurs (+10%)
                    </label>
                  </div>
                  <div className="form-check">
                    <label htmlFor="attasSeed" className="form-check-label">
                      <input
                        type="checkbox"
                        name="attasSeed"
                        id="attasSeed"
                        className="form-check-input"
                        value={this.props.attasSeed}
                        onChange={(e) =>
                          this.setState({
                            attasSeed: e.target.checked,
                            yieldCalculation: true,
                          })
                        }
                      />
                      Attas Planted (+5%)
                    </label>
                  </div>
                </div>
                <div className="col-md col-12">
                  <hr className="d-md-none" />
                  <div className="form-group">
                    <label htmlFor="compostType">Compost Type</label>
                    <select
                      name="compostType"
                      className="form-control form-control-sm"
                      value={this.props.compostType}
                      onChange={(e) =>
                        this.setState({
                          compostType: Number(e.target.value),
                          yieldCalculation: true,
                        })
                      }
                    >
                      <option value={0}>None</option>
                      <option value={1}>Compost (+1 Life)</option>
                      <option value={2}>Supercompost (+2 Lives)</option>
                      <option value={3}>Ultracompost (+3 Lives)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="farmingLevel">Farming Level</label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      min="0"
                      max="99"
                      value={this.props.farmingLevel}
                      onChange={(e) =>
                        this.setState({
                          farmingLevel: Number(e.target.value),
                          yieldCalculation: true,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="mb-3 d-flex flex-md-row flex-column-reverse">
            <div>
              <div>
                Current Herblore XP:
                <span className="badge badge-secondary ml-1">
                  <NumberFormat
                    value={this.props.herbloreXpStart}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={1}
                  />
                </span>
                {this.props.herbloreXpStart === 0 && (
                  <em className="ml-2">
                    <small>
                      Either skill not ranked or you must enter a player name
                      above.
                    </small>
                  </em>
                )}
              </div>

              <div>
                <strong>
                  XP Until 99:
                  <span className="badge badge-primary ml-1">
                    <NumberFormat
                      value={expFor99 - this.props.herbloreXpStart}
                      displayType={"text"}
                      thousandSeparator={true}
                      allowNegative={false}
                      decimalScale={1}
                    />
                  </span>
                </strong>
              </div>

              <div>
                Remaining:
                <span className="badge badge-info ml-1">
                  <NumberFormat
                    value={expFor99 - this.props.herbloreXpStart - totalXp}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={1}
                  />
                </span>
              </div>
            </div>

            <div className="ml-md-auto">
              <span className="display-4 text-right">
                Total XP:{" "}
                <NumberFormat
                  value={totalXp}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={1}
                  allowNegative={false}
                />
              </span>
            </div>
          </div>

          <HerbloreFilters
            potions={this.props.potions}
            updateFilters={this.updateFilters}
          />

          <div className="table-responsive">
            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <th>Level</th>
                  <th>Name</th>
                  <th>Ingredients</th>
                  <th>Herb</th>
                  <th>#</th>
                  <th>Total XP</th>
                </tr>
              </thead>
              <tbody>{data}</tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default connect((state) => ({ ...state.herblore }))(Herblore);
