import React from 'react';
import { constants } from '../../constants/constants';

export class DummyPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            waiting: false,
            errorMessage: "",
            url: constants.SERVER_URL + constants.GENERATE_DATA_ENDPOINT
        };

        // bind actions
        this.handleClick = this.handleClick.bind(this);
        this.generateDummyData = this.generateDummyData.bind(this);
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    handleClick(event) {
        console.log(this);
        this.setState({ waiting: true});
        this.generateDummyData();
    }

    generateDummyData = () => {
        fetch( this.state.url, {
          method: "POST",
          dataType: "JSON",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          }
        })
        .then((resp) => {
            return resp.statusText
        }) 
        .then((data) => {
            this.setState({ waiting: false, errorMessage: ""});           
        })
        .catch((error) => {
            this.setState({errorMessage: error + "", waiting: false});
        })
    }

    render() {
        console.log("render");
        const { waiting, errorMessage} = this.state;
        console.log(this.state);
        console.log(errorMessage);
        console.log(errorMessage.length);
        return (
            <div className="col-md-6 col-md-offset-3">
                <button type="button" className="btn btn-info" onClick={this.handleClick}>Generate Dummy data</button>
                {waiting &&
                    <div className="text-primary"> Please wait ... </div>
                }
                {errorMessage.length > 0 &&
                    <p className="text-danger">Error : {errorMessage}</p>
                }
            </div>
        );
    }
}
