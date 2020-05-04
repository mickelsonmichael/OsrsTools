import Loading from '../loading.js'

class Herblore extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            potions: []
        };
        this.getPotions = this.getPotions.bind(this);

        this.getPotions();
    }

    getPotions() {
        fetch(this.props.url)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ potions: json });
            })
    }

    render() {
        if (this.state.potions.length > 0) {
            return (<span>Done. There are { this.state.potions.length} Potions.</span>);
        }
        else {
            return (<Loading />);
        }
    }
}

let container = document.getElementById("herblore-container");
let url = container.dataset.url;
ReactDOM.render(<Herblore url={url} />, container);
