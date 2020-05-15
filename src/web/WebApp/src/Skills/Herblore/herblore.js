import React from 'react';
import ReactDOM from 'react-dom'
import Loading from '../../loading.js'
import Potion from './potion.js'
import update from 'immutability-helper'
import NumberFormat from 'react-number-format'
import Patches from './patches.jsx';
import HerbloreFilters from './herblore_filters.jsx';

const expFor99 = 13034431;
var bonusesCollapse = null;

class Herblore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            potions: [],
            farmingCape: false,
            farmingLevel: props.farmingLevelStart,
            compostType: 3,
            secateurs: false,
            attasSeed: false,
            diaryBonus: 0,
            filter: {
                potionsToHide: [],
                showSeeds: true,
                showClean: true,
                showGrimy: true
            },
            xps: [],
            patches: []
        };

        this.getPotions = this.getPotions.bind(this);
        this.updateCount = this.updateCount.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
        this.getHerbs = this.getHerbs.bind(this);
        this.getPotionsAndHerbs = this.getPotionsAndHerbs.bind(this);
        this.calculateYield = this.calculateYield.bind(this);
        this.updatePatches = this.updatePatches.bind(this);
        this.updateFilters = this.updateFilters.bind(this);

        this.getPotionsAndHerbs();
    }

    getPotionsAndHerbs() {
        Promise.all([
            this.getPotions(),
            this.getHerbs()
        ]).then(([potions, herbs]) => {
            let sortedPotions = potions.sort((a, b) => a.level - b.level);

            this.setState({
                potions: sortedPotions,
                herbs: herbs,
                xps: sortedPotions.map(h => [0,0,0]),
                yieldCalculation: true
            });
        });
    }

    getHerbs() {
        return fetch(this.props.herbUrl)
            .then(response => response.json());
    }

    getPotions() {
        return fetch(this.props.url)
            .then(response => response.json());
    }

    componentDidUpdate() {
        if (this.state.yieldCalculation) {
            this.calculateYield();
        }

        if (!bonusesCollapse) {
            let btn = document.getElementById("bonusesCollapseBtn");
            if (btn) {
                bonusesCollapse = new Collapse(btn);
            }
        }
    }

    updateFilters(newFilter) {
        let currentFilter = this.state.filter;

        if (!this.areEquivalent(newFilter.potionsToHide, currentFilter.potionsToHide)
            || newFilter.showSeeds != currentFilter.showSeeds
            || newFilter.showGrimy != currentFilter.showGrimy
            || newFilter.showClean != currentFilter.showClean) {

            this.setState({ filter: newFilter });
        }
    }

    calculateYield() {
        let updated = this.state.herbs.map(herb => {
            if (this.state.patches.length == 0) {
                herb.yield = 0;
                return herb;
            }

            let totalYields = 0;

            for (let i = 0; i < this.state.patches.length; i++) {
                let chanceToSave =
                    (
                        ((((herb.level1Chance + 1) / 256) * (99 - this.state.farmingLevel)) / 98)
                        + ((((herb.level99Chance + 1) / 256) * (this.state.farmingLevel - 1)) / 98)
                    )
                    * (1 + (this.state.secateurs ? .1 : 0) + (this.state.farmingCape ? 0.05 : 0) + (this.state.attasSeed ? 0.05 : 0) + this.state.patches[i])
                    + (1 / 256);

                totalYields += (3 + this.state.compostType) / (1 - chanceToSave)
            }

            herb.yield = totalYields / this.state.patches.length;

            return herb;
        });

        this.setState({
            yieldCalculation: false,
            herbs: updated
        });
    }

    updateCount(e) {
        let target = e.target;
        this.setState({
            potions: update(this.state.potions, { [target.dataset.index]: { num: { $set: target.value } } } )
        });
    }

    updateTotal(xp, i, type) {
        this.setState({
            xps: update(this.state.xps, { [i]: { [type]: { $set: xp } } })
        });
    }

    updatePatches(patches) {
        if (this.areEquivalent(this.state.patches, patches)) return;

        this.setState({
            patches: patches,
            yieldCalculation: true
        });
    }

    areEquivalent(original, incoming) {
        if (original.length !== incoming.length) return false;
        return original.sort().toString() == incoming.sort().toString();
    }

    render() {
        if (this.state.potions.length > 0) {
            let data = this.state.potions
                .filter((potion) => !this.state.filter.potionsToHide.includes(potion.name))
                .map((pot, i) => {
                    let key = "herb-" + pot.name.replace(" ", ","); 
                    return (
                        <Potion potion={pot}
                            yield={this.state.herbs.filter(h => h.name === pot.herb)[0].yield}
                            key={key}
                            updateTotal={(xp, type) => this.updateTotal(xp, i, type)}
                            showSeeds={this.state.filter.showSeeds}
                            showGrimy={this.state.filter.showGrimy}
                            showClean={this.state.filter.showClean} />
                    );
            });

            let totalXp = this.state.xps
                .map(subTotals => subTotals.reduce((a, b) => a + b))
                .reduce((a, b) => a + b);

            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div className="d-flex flex-column flex-md-row">
                                        <h2>Yield Calculation</h2>
                                        <small className="align-self-center ml-1">
                                            <a id="bonusesCollapseBtn" data-toggle="collapse" href="#bonuses" aria-expanded="true" aria-controls="bonuses" role="button">
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
                                            <input type="checkbox"
                                                name="farmingCape"
                                                id="farmingCape"
                                                className="form-check-input"
                                                onChange={(e) => this.setState({ farmingCape: e.target.checked, yieldCalculation: true })} />
                                            Farming Cape (+5%)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label htmlFor="secateurs" className="form-check-label">
                                            <input type="checkbox"
                                                name="secateurs"
                                                id="secateurs"
                                                className="form-check-input"
                                                value={this.state.secateurs}
                                                onChange={(e) => this.setState({ secateurs: e.target.checked, yieldCalculation: true })} />
                                            Magic Secateurs (+10%)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label htmlFor="attasSeed" className="form-check-label">
                                            <input type="checkbox"
                                                name="attasSeed"
                                                id="attasSeed"
                                                className="form-check-input"
                                                value={this.state.attasSeed}
                                                onChange={(e) => this.setState({ attasSeed: e.target.checked, yieldCalculation: true })} />
                                            Attas Planted (+5%)
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md col-12">
                                    <hr className="d-md-none" />
                                    <div className="form-group">
                                        <label htmlFor="compostType">Compost Type</label>
                                        <select name="compostType"
                                            className="form-control form-control-sm"
                                            value={this.state.compostType}
                                            onChange={(e) => this.setState({ compostType: Number(e.target.value), yieldCalculation: true })}>
                                            <option value={0}>None</option>
                                            <option value={1}>Compost (+1 Life)</option>
                                            <option value={2}>Supercompost (+2 Lives)</option>
                                            <option value={3}>Ultracompost (+3 Lives)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="farmingLevel">Farming Level</label>
                                        <input type="number" className="form-control form-control-sm" min="0" max="99" value={this.state.farmingLevel} onChange={(e) => this.setState({ farmingLevel: Number(e.target.value), yieldCalculation: true })} />
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
                                    <NumberFormat value={this.props.herbloreXpStart} displayType={"text"} thousandSeparator={true} decimalScale={1} />
                                </span>
                                {this.props.herbloreXpStart == 0 &&
                                    <em className="ml-2"><small>Either skill not ranked or you must enter a player name above.</small></em>
                                }
                            </div>

                            <div>
                                <strong>
                                    XP Until 99:
                                    <span className="badge badge-primary ml-1">
                                        <NumberFormat value={expFor99 - this.props.herbloreXpStart} displayType={"text"} thousandSeparator={true} allowNegative={false} decimalScale={1} />
                                    </span>
                                </strong>
                            </div>

                            <div>
                                Remaining:
                                <span className="badge badge-info ml-1">
                                    <NumberFormat value={(expFor99 - this.props.herbloreXpStart) - totalXp} displayType={"text"} thousandSeparator={true} decimalScale={1} />
                                </span>
                            </div>
                        </div>

                        <div className="ml-md-auto">
                            <span className="display-4 text-right">Total XP: <NumberFormat value={totalXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} /></span>
                        </div>
                        
                        
                    </div>

                    <HerbloreFilters potions={this.state.potions.map((potion) => potion.name)} updateFilters={this.updateFilters} />

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
                            <tbody>
                                {data}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        else {
            return (<Loading />);
        }
    }
}

let container = document.getElementById("herblore-container");
let url = container.dataset.url;
let farmingLevelStart = container.dataset.farmingLevel;
let herbloreXpStart = container.dataset.herbloreXp;
let herbUrl = container.dataset.herb;

ReactDOM.render(<Herblore url={url} farmingLevelStart={farmingLevelStart} herbUrl={herbUrl} herbloreXpStart={herbloreXpStart} />, container);
