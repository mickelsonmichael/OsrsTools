import NumberFormat from 'react-number-format'

export default class Potion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            herbs: 0
        }

        this.updateXp = this.updateXp.bind(this);
    }

    updateXp(e) {
        this.setState({
            herbs: e.target.value
        });
    }

    render() {
        let totalXp = (this.props.clean + this.props.xp) * this.state.herbs;

        return (
            <tr>
                <td>{this.props.level}</td>
                <td>{this.props.name}</td>
                <td>{this.props.ingredients.join(",")}</td>
                <td>{this.props.herb}</td>
                <td>
                    <input type="number" value={this.state.herbs} onChange={this.updateXp} min="0" />
                </td>
                <td>
                    <NumberFormat value={totalXp} displayType={"text"} thousandSeparator={true} decimalScale={1} allowNegative={false} />
                </td>
            </tr>
        );
    }
}