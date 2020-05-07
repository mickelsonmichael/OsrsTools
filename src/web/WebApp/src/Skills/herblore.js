import React from 'react';
import ReactDOM from 'react-dom'
import Loading from '../loading.js'
import Potion from './potion.js'
import update from 'immutability-helper'
import NumberFormat from 'react-number-format'

const expFor99 = 13034431;

class Herblore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            potions: [],
            playerXp: 0,
            farmingCape: false,
            farmingLevel: 1,
            compostType: 3,
            secateurs: false,
            attasSeed: false,
            diaryBonus: 0,
            xps: []
        };
        this.getPotions = this.getPotions.bind(this);
        this.updateCount = this.updateCount.bind(this);
        this.getPlayerXp = this.getPlayerXp.bind(this);
        this.updateTotal = this.updateTotal.bind(this);
        this.getHerbs = this.getHerbs.bind(this);
        this.getPotionsAndHerbs = this.getPotionsAndHerbs.bind(this);
        this.calculateYield = this.calculateYield.bind(this);

        this.getPotionsAndHerbs();
        this.getPlayerXp();
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

    getPlayerXp() {
        fetch(this.props.hiScoreUrl)
            .then(response =>  response.text())
            .then(text => {
                this.setState({
                    playerXp: Number(text)
                });
            })
    }

    componentDidUpdate() {
        if (this.state.yieldCalculation) {
            this.calculateYield();
        }
    }

    calculateYield() {
        let updated = this.state.herbs.map(herb => {
            let chanceToSave =
                (
                    ((((herb.level1Chance + 1) / 256) * (99 - this.state.farmingLevel)) / 98)
                    + ((((herb.level99Chance + 1) / 256) * (this.state.farmingLevel - 1)) / 98)
                )
                * (1 + (this.state.secateurs ? .1 : 0) + (this.state.farmingCape ? 0.05 : 0) + (this.state.attasSeed ? 0.05 : 0) + this.state.diaryBonus)
                + (1 / 256);

            herb.yield = (3 + this.state.compostType) / (1 - chanceToSave);

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

    render() {
        if (this.state.potions.length > 0) {
            let data = this.state.potions
                .map((pot, i) => {
                    return (
                        <Potion potion={pot}
                            yield={this.state.herbs.filter(h => h.name === pot.herb)[0].yield}
                            key={i}
                            updateTotal={(xp, type) => this.updateTotal(xp, i, type)} />
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
                                    <div class="text-muted">
                                        <strong>Seed yield calculation.</strong> Fill in the data below to calculate the yield of each seed.
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md col-12">
                                    <div className="form-group">
                                        <label htmlFor="compostType">Compost Type</label>
                                        <select name="compostType" 
                                            className="form-control form-control-sm"
                                            value={ this.state.compostType }
                                            onChange={(e) => this.setState({ compostType: Number(e.target.value), yieldCalculation: true })}>
                                            <option value={0}>None</option>
                                            <option value={1}>Compost (+1 Life)</option>
                                            <option value={2}>Supercompost (+2 Lives)</option>
                                            <option value={3}>Ultracompost (+3 Lives)</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="farmingLevel">Farming Level</label>
                                        <input type="number" className="form-control form-control-sm" min="0" max="99" value={ this.state.farmingLevel } onChange={(e) => this.setState({ farmingLevel: Number(e.target.value), yieldCalculation: true })} />
                                    </div>
                                </div>
                                <div className="col-md col-12">
                                    <div className="form-group">
                                        <label htmlFor="diaryBonus">Diary Bonus</label>
                                        <select name="diaryBonus" id="diaryBonus"
                                            value={this.state.diaryBonus}
                                            className="form-control form-control-sm"
                                            onChange={(e) => this.setState({ diaryBonus: Number(e.target.value), yieldCalculation: true })}>
                                            <option value="0">None</option>
                                            <option value="0.05">5% (Kourend Hard, Kandarin Medium)</option>
                                            <option value="0.10">10% (Kandarin Hard)</option>
                                            <option value="0.15">15% (Kandarin Elite - Catherby Patch)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-check">
                                        <label htmlFor="farmingCape" className="form-check-label">
                                            <input type="checkbox"
                                                name="farmingCape"
                                                id="farmingCape"
                                                className="form-check-input"
                                                onChange={() => this.setState({ farmingCape: !this.state.farmingCape, yieldCalculation: true })} />
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
                                                onChange={() => this.setState({ secateurs: !this.state.secateurs, yieldCalculation: true })} />
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
                                                onChange={(e) => this.setState({ attasSeed: e.target.value == true, yieldCalculation: true })} />
                                            Attas Planted (+5%)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />
                    
                    <div className="text-muted mb-3">
                        <span className="display-4 float-right ml-4">Total XP: <NumberFormat value={totalXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} /></span>
                        <div>
                            Current Herblore XP: 
                            <span className="badge badge-secondary ml-1"><NumberFormat value={this.state.playerXp} displayType={"text"} thousandSeparator={true} decimalScale={1} /></span>
                            { this.state.playerXp == 0 &&
                                <em className="ml-1"><small>Either skill not ranked or you must enter a player name above.</small></em>
                            }
                        </div>
                        <div className="font-weight-bold">
                            XP Until 99:
                            <span class="badge badge-primary ml-1"><NumberFormat value={expFor99 - this.state.playerXp} displayType={"text"} thousandSeparator={true} allowNegative={false} decimalScale={1} /></span>
                        </div>

                        <div>
                            Remaining:
                            <span class="badge badge-info ml-1"><NumberFormat value={(expFor99 - this.state.playerXp) - totalXp} displayType={"text"} thousandSeparator={true} decimalScale={1} /></span>
                        </div>
                    </div>

                    <table className="table table-sm table-striped">
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
            );
        }
        else {
            return (<Loading />);
        }
    }
}

let container = document.getElementById("herblore-container");
let url = container.dataset.url;
let hiScoreUrl = container.dataset.hi;
let herbUrl = container.dataset.herb;

ReactDOM.render(<Herblore url={url} hiScoreUrl={hiScoreUrl} herbUrl={herbUrl} />, container);
