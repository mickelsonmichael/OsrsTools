export default class HerbloreFilters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            potionsToHide: [],
            showClean: true,
            showGrimy: true,
            showSeeds: true
        };

        this.hidePotion = this.hidePotion.bind(this);
        this.selectAll = this.selectAll.bind(this);
        this.selectNone = this.selectNone.bind(this);
    }

    componentDidMount() {
        new Modal(
            document.getElementById("filter-modal-btn"),
            document.getElementById("filter-modal")
        );
    }

    hidePotion(potion, showPotion) {
        if (showPotion && this.state.potionsToHide.includes(potion)) {
            let newList = this.state.potionsToHide.map(x => x);
            newList.splice(newList.indexOf(potion), 1);

            this.setState({ potionsToHide: newList }, () => this.props.updateFilters(this.state));
        }
        else if (!showPotion && !this.state.potionsToHide.includes(potion)) {
            let newList = this.state.potionsToHide.map(x => x);
            newList.push(potion);

            this.setState({ potionsToHide: newList }, () => this.props.updateFilters(this.state));
        }
    }

    selectNone() {
        this.setState({
            potionsToHide: this.props.potions
        }, () => this.props.updateFilters(this.state));
    }

    selectAll() {
        this.setState({
            potionsToHide: []
        }, () => this.props.updateFilters(this.state));
    }

    render() {
        console.log(this.state.potionsToHide);
        let potions = this.props.potions
            .map((potion, index) => {
                let id = "filter-" + potion.replace(" ", "");
                let isSelected = this.state.potionsToHide.indexOf(potion) == -1;
                console.log(isSelected);
                return (
                    <div className="form-check" key={index}>
                        <label htmlFor={ id } className="form-check-label">
                            <input type="checkbox"
                                id={id}
                                className="form-check-input"
                                checked={isSelected}
                                onChange={(e) => this.hidePotion(potion, e.target.checked)}  />
                            { potion }
                        </label>
                    </div>
                );
            });

        return (
            <div>
                <button id="filter-modal-btn" type="button" className="btn btn-link btn" data-toggle="modal" data-target="#filter-modal">
                    <span className="fa fa-filter"></span>
                    Filter
                </button>

                <div id="filter-modal" className="modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="form-horizontal">
                                    <h2>Types</h2>

                                    <div className="d-flex flex-columns justify-content-around">
                                        <div className="px-1 flex-grow-1">
                                            <div className="form-check">
                                                <label htmlFor="filter-clean" className="form-check-label">
                                                    <input type="checkbox"
                                                        id="filter-clean"
                                                        className="form-check-input"
                                                        defaultChecked={this.state.showClean}
                                                        onChange={(e) => {
                                                            let val = e.target.checked;
                                                            this.setState({ showClean: val }, () => this.props.updateFilters(this.state));
                                                        }} />
                                                    Clean
                                                </label>
                                            </div>

                                            <div className="form-check">
                                                <label htmlFor="filter-grimy" className="form-check-label">
                                                    <input type="checkbox"
                                                        id="filter-grimy"
                                                        className="form-check-input"
                                                        defaultChecked={this.state.showGrimy}
                                                        onChange={(e) => {
                                                            let val = e.target.checked;
                                                            this.setState({ showGrimy: val }, () => this.props.updateFilters(this.state));
                                                        }} />
                                                    Grimy
                                                </label>
                                            </div>
                                        </div>

                                        <div className="px-1 flex-grow-1">
                                            <div className="form-check form-check-inline">
                                                <label htmlFor="filter-seeds" className="form-check-label">
                                                    <input type="checkbox"
                                                        id="filter-seeds"
                                                        className="form-check-input"
                                                        defaultChecked={this.state.showSeeds}
                                                        onChange={(e) => {
                                                            let val = e.target.checked;

                                                            this.setState({ showSeeds: val }, () => this.props.updateFilters(this.state));
                                                        }} />
                                                    Seeds
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex flex-columns flex-md-rows justify-content-between">
                                        <h2>Potions</h2>
                                        <div className="align-self-center">
                                            <button type="button" className="btn btn-link btn-sm" onClick={this.selectAll}>Select All</button>
                                            |
                                            <button type="button" className="btn btn-link btn-sm" onClick={this.selectNone}>Select None</button>
                                        </div>
                                    </div>
                                    

                                    <div className="d-flex flex-columns justify-content-around">
                                        <div className="px-1 flex-grow-1">{potions.slice(0, potions.length/2)}</div>
                                        <div className="px-1 flex-grow-1">{potions.slice(potions.length/2)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}