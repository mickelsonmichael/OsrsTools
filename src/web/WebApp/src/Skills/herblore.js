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
            totalXp: 0,
            playerXp: 0,
            farmingCape: false,
            farmingLevel: 1,
            compostType: 3,
            secateurs: false
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
            this.setState({
                potions: potions,
                herbs: herbs,
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
        let patch = 0;
        let attas = 0;
        var updated = this.state.herbs.map(herb => {
            let chanceToSave =
                (
                    ((((herb.level1Chance + 1) / 256) * (99 - this.state.farmingLevel)) / 98)
                    + ((((herb.level99Chance + 1) / 256) * (this.state.farmingLevel - 1)) / 98)
                )
                * (1 + (this.state.secateurs ? .1 : 0) + (this.state.farmingCape ? 0.05 : 0))
                //* (1 + patch + attas)
                + (1 / 256);

            herb.yield = (3 + this.state.compostType) / (1 - chanceToSave);
            console.log(herb.name + " " + herb.yield);
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

    updateTotal(xpChange) {
        let newTotal = this.state.totalXp + xpChange;

        this.setState({
            totalXp: newTotal 
        });
    }

    render() {
        if (this.state.potions.length > 0) {
            let data = this.state.potions
                .sort((a,b) => a.level - b.level)
                .map((pot, i) => {
                return (
                    <Potion potion={pot}
                        herb={this.state.herbs.filter(h => h.name === pot.herb)[0]}
                        key={i}
                        updateTotal={this.updateTotal} />
                );
            });

            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="farmingCape">
                                            <input type="checkbox" 
                                                    name="farmingCape" 
                                                    id="farmingCape"
                                                    className="mr-1" 
                                                    onChange={ () => this.setState({ farmingCape: !this.state.farmingCape, yieldCalculation: true })} />
                                            Farming Cape
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="secateurs">
                                            <input type="checkbox"
                                                name="secateurs"
                                                id="secateurs"
                                                className="mr-1"
                                                value={this.state.secateurs}
                                                onChange={ () => this.setState({ secateurs: !this.state.secateurs, yieldCalculation: true })} />
                                            Magic Secateurs
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="compostType">Compost Type</label>
                                        <select name="compostType" 
                                            className="form-control"
                                            value={ this.state.compostType }
                                            onChange={(e) => this.setState({ compostType: Number(e.target.value), yieldCalculation: true })}>
                                            <option value={0}>None</option>
                                            <option value={1}>Compost</option>
                                            <option value={2}>Supercompost</option>
                                            <option value={3}>Ultracompost</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="farmingLevel">Farming Level</label>
                                        <input type="number" className="form-control" min="0" max="99" value={ this.state.farmingLevel } onChange={(e) => this.setState({ farmingLevel: Number(e.target.value), yieldCalculation: true })} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-muted mb-3">
                        <span className="display-4 float-right ml-4">Total XP: <NumberFormat value={this.state.totalXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} /></span>
                        <div>
                            Current XP: <NumberFormat value={this.state.playerXp} displayType={"text"} thousandSeparator={true} />
                            { this.state.playerXp == 0 &&
                                <em className="ml-4"><small>Either skill not ranked or you must enter a player name above.</small></em>
                            }
                        </div>
                        <div className="font-weight-bold">
                            XP Until 99: <NumberFormat value={expFor99 - this.state.playerXp} displayType={"text"} thousandSeparator={true} allowNegative={false} />
                        </div>

                        <div>
                            Remaining: <NumberFormat value={(expFor99 - this.state.playerXp) - this.state.totalXp} displayType={"text"} thousandSeparator={true} />
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
