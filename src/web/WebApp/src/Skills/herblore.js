import React from 'react';
import ReactDOM from 'react-dom'
import Loading from '../loading.js'
import Potion from './potion.js'
import update from 'immutability-helper'

class Herblore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            potions: []
        };
        this.getPotions = this.getPotions.bind(this);
        this.updateCount = this.updateCount.bind(this);

        this.getPotions();
    }

    getPotions() {
        fetch(this.props.url)
            .then(response => response.json())
            .then(json => {
                this.setState({ potions: json });
            })
    }

    updateCount(e) {
        console.log("updating");
        let target = e.target;

        this.setState({
            potions: update(this.state.potions, { [target.dataset.index]: { num: { $set: target.value } } } )
        });
    }

    render() {
        if (this.state.potions.length > 0) {
            let data = this.state.potions
                .sort((a,b) => a.level - b.level)
                .map((pot, i) => {
                return (
                    <Potion level={pot.level}
                        name={pot.name}
                        ingredients={pot.ingredients}
                        xp={pot.xp}
                        herb={pot.herb}
                        clean={pot.cleanXP}
                        key={i} />
                );
            });

            return (
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
            );
        }
        else {
            return (<Loading />);
        }
    }
}

let container = document.getElementById("herblore-container");
let url = container.dataset.url;

ReactDOM.render(<Herblore url={url}/>, container);
