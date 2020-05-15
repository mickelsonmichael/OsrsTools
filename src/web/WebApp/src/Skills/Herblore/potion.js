import NumberFormat from 'react-number-format'
const herbRootUrl = "images/herbs/"
const potionRootUrl = "images/potions/"
const herbSeedUrl = "images/seeds/herb_seed.png"

export default class Potion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            herbs: 0,
            herbsXp: 0,
            grimy: 0,
            grimyXp: 0,
            seeds: 0,
            seedsXp: 0,
        }

        this.calculateSeedXp = this.calculateSeedXp.bind(this);
        this.calculateGrimyXp = this.calculateGrimyXp.bind(this);
        this.calculateCleanXp = this.calculateCleanXp.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.yield !== this.props.yield) {
            this.calculateSeedXp(this.state.seeds);
        }
    }

    calculateSeedXp(seeds) {
        let xp = seeds * this.props.yield * (this.props.potion.cleanXP + this.props.potion.xp);

        this.setState({
            seeds: seeds,
            seedsXp: xp
        });

        this.props.updateTotal(xp, "seeds");
    }

    calculateGrimyXp(herbs) {
        let xp = herbs * (this.props.potion.cleanXP + this.props.potion.xp);

        this.setState({
            grimy: herbs,
            grimyXp: xp
        });

        this.props.updateTotal(xp, "grimy");
    }

    calculateCleanXp(herbs) {
        let xp = herbs * this.props.potion.xp;

        this.setState({
            herbs: herbs,
            herbsXp: xp
        });

        this.props.updateTotal(xp, "clean");
    }

    render() {
        let rows = [];

        if (this.props.showGrimy) {
            rows.push(
                <tr key="grimy">
                    <td>{this.props.potion.level}</td>
                    <td>
                        <img src={potionRootUrl + this.props.potion.potionFilename} alt={this.props.potion.name} width="12" height="18" className="row_img" />
                        {this.props.potion.name}
                    </td>
                    <td>{this.props.potion.ingredients.join(",")}</td>
                    <td>
                        <img src={herbRootUrl + this.props.potion.cleanFilename} alt={"Grimy " + this.props.potion.herb} height="18" width="22" className="row_img" />
                        {this.props.potion.herb}
                    </td>
                    <td>
                        <input type="number" data-type="clean" value={this.state.herbs} onChange={(e) => this.calculateCleanXp(Number(e.target.value))} min="0" />
                    </td>
                    <td>
                        <NumberFormat value={this.state.herbsXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} />
                    </td>
                </tr>
            );
        }

        if (this.props.showClean) {
            rows.push(
                <tr key="clean">
                    <td>{this.props.potion.level}</td>
                    <td>
                        <img src={potionRootUrl + this.props.potion.potionFilename} alt={this.props.potion.name} width="12" height="18" className="row_img" />
                        {this.props.potion.name}
                    </td>
                    <td>{this.props.potion.ingredients.join(",")}</td>
                    <td>
                        <img src={herbRootUrl + this.props.potion.grimyFilename} alt={this.props.potion.herb} height="18" width="22" className="row_img" />
                        Grimy {this.props.potion.herb}
                    </td>
                    <td>
                        <input type="number" data-type="dirty" value={this.state.grimy} onChange={(e) => this.calculateGrimyXp(Number(e.target.value))} min="0" />
                    </td>
                    <td>
                        <NumberFormat value={this.state.grimyXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} />
                    </td>
                </tr>
            );
        }

        if (this.props.showSeeds) {
            rows.push(
                <tr key="seed">
                    <td>{this.props.potion.level}</td>
                    <td>
                        <img src={potionRootUrl + this.props.potion.potionFilename} alt={this.props.potion.name} width="12" height="18" className="row_img" />
                        {this.props.potion.name}
                    </td>
                    <td>{this.props.potion.ingredients.join(",")}</td>
                    <td>
                        <img src={herbSeedUrl} alt={this.props.potion.herb + " Seed"} height="18" width="22" className="row_img" />
                        {this.props.potion.herb} Seed
                    </td>
                    <td>
                        <input type="number" data-type="seed" value={this.state.seeds} onChange={(e) => this.calculateSeedXp(Number(e.target.value))} min="0" />
                        (avg. yield: <NumberFormat value={this.props.yield} displayType={"text"} decimalScale={2} allowNegative={false} />)
                    </td>
                    <td>
                        ~<NumberFormat value={this.state.seedsXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} />
                    </td>
                </tr>
            );
        }

        return rows;
    }
}