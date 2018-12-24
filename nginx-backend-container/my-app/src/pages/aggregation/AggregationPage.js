import React from 'react';
import { constants } from '../../constants/constants';

export class AggregationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: constants.SERVER_URL + constants.AGGREGATION_ENDPOINT,
            errorMessage: "",
            durationInfo: ""
        };

        // bind actions
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount(){
        this.fetchData();
    }
    
    fetchData = () => {
        fetch(this.state.url, {
            method: "GET",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then((resp) => {
            console.log(resp);
            return resp.json()
        }) 
        .then((data) => {
            this.setState({ durationInfo: data})                    
        })
        .catch((error) => {
            this.setState({ errorMessage : error})  
            console.log(error)
        })
    }

    render() {
        console.log("state");
        console.log(this.state);
        const msg = this.state.errorMessage;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>Aggregation Time : {this.state.durationInfo} ms</h3>
                {msg.length > 0 &&
                    <div> Error: msg</div>
                }
            </div>
        );
    }
}
