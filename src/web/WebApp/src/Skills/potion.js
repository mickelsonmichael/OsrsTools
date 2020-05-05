import NumberFormat from 'react-number-format'
const herbRootUrl = "images/herbs/"

export default class Potion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            herbs: 0,
            grimy: 0
        }

        this.updateXp = this.updateXp.bind(this);
    }

    updateXp(e) {
        if (e.target.dataset.type === "clean") {
            this.setState({
                herbs: e.target.value
            });
        }
        else {
            this.setState({
                grimy: e.target.value
            });
        }
        
    }

    render() {
        let grimyXp = (this.props.potion.cleanXP + this.props.potion.xp) * this.state.grimy;
        let cleanXp = this.props.potion.xp * this.state.herbs;

        let rows = [
            (
                <tr key={"grimy"}>
                    <td>{this.props.potion.level}</td>
                    <td>{this.props.potion.name}</td>
                    <td>{this.props.potion.ingredients.join(",")}</td>
                    <td>
                        <img src={herbRootUrl + this.props.potion.grimyFilename} alt={"Grimy " + this.props.potion.herb} height="18" width="22" className="row_img" />
                        {this.props.potion.herb}
                    </td>
                    <td>
                        <input type="number" data-type="clean" value={this.state.herbs} onChange={this.updateXp} min="0" />
                    </td>
                    <td>
                        <NumberFormat value={cleanXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} />
                    </td>
                </tr>
            ),
            (
                <tr key="clean">
                    <td>{this.props.potion.level}</td>
                    <td>{this.props.potion.name}</td>
                    <td>{this.props.potion.ingredients.join(",")}</td>
                    <td>
                        <img src={herbRootUrl + this.props.potion.cleanFilename} alt={this.props.potion.herb} height="18" width="22" className="row_img" />
                        Grimy {this.props.potion.herb}
                    </td>
                    <td>
                        <input type="number" data-type="dirty" value={this.state.grimy} onChange={this.updateXp} min="0" />
                    </td>
                    <td>
                        <NumberFormat value={grimyXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} />
                    </td>
                </tr>
            )
        ];

        return rows;
    }
}