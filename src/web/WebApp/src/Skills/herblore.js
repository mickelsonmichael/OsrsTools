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
            playerXp: 0
        };
        this.getPotions = this.getPotions.bind(this);
        this.updateCount = this.updateCount.bind(this);
        this.getPlayerXp = this.getPlayerXp.bind(this);
        this.updateTotal = this.updateTotal.bind(this);

        this.getPotions();
        this.getPlayerXp();
    }

    getPotions() {
        fetch(this.props.url)
            .then(response => response.json())
            .then(json => {
                this.setState({ potions: json });
            })
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
                        key={i}
                        updateTotal={this.updateTotal} />
                );
            });

            return (
                <div>
                    
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

ReactDOM.render(<Herblore url={url} hiScoreUrl={hiScoreUrl} />, container);
