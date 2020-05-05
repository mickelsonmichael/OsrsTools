import NumberFormat from 'react-number-format'
const herbRootUrl = "images/herbs/"
const potionRootUrl = "images/potions/"
const herbSeedUrl = "images/seeds/herb_seed.png"
const averageHerbPerPatch = 6

export default class Potion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            herbs: 0,
            herbsXp: 0,
            grimy: 0,
            grimyXp: 0,
            seeds: 0,
            seedsXp: 0
        }

        this.updateXp = this.updateXp.bind(this);
    }

    updateXp(e) {
        let type = e.target.dataset.type;
        let newCount = e.target.value;
        let originalXp = 0;
        let newXp = 0;

        if (type === "clean") {
            originalXp = this.state.herbsXp;
            newXp = newCount * this.props.potion.xp;

            this.setState({
                herbs: newCount,
                herbsXp: newXp
            });
        }
        else if (type === "dirty") {
            originalXp = this.state.grimyXp;
            newXp = newCount * (this.props.potion.cleanXP + this.props.potion.xp);

            this.setState({
                grimy: newCount,
                grimyXp: newXp
            });
        }
        else {
            originalXp = this.state.seedsXp;
            newXp = newCount * averageHerbPerPatch * (this.props.potion.cleanXP + this.props.potion.xp);

            this.setState({
                seeds: newCount,
                seedsXp: newXp
            })
        }

        this.props.updateTotal(newXp - originalXp);
    }

    render() {
        let rows = [
            (
                <tr key={"grimy"}>
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
                        <input type="number" data-type="clean" value={this.state.herbs} onChange={this.updateXp} min="0" />
                    </td>
                    <td>
                        <NumberFormat value={this.state.herbsXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} />
                    </td>
                </tr>
            ),
            (
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
                        <input type="number" data-type="dirty" value={this.state.grimy} onChange={this.updateXp} min="0" />
                    </td>
                    <td>
                        <NumberFormat value={this.state.grimyXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} />
                    </td>
                </tr>
            ),
            (
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
                        <input type="number" data-type="seed" value={this.state.seeds} onChange={this.updateXp} min="0" />
                    </td>
                    <td>
                        ~<NumberFormat value={this.state.seedsXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} />
                    </td>
                </tr>
            )
        ];

        return rows;
    }
}