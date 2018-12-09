import React, {Component} from 'react';
import RenderTable from "./RenderTable";

class Username extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.match.params.username
        }
    }
    
    render(){
        const columns = [{
            Header: 'Username',
            accessor: 'username' 
            }, {
            Header: 'Date',
            accessor: 'date',
            }, {
            Header: 'Start Hour',
            accessor: 'start',
            },{
            Header: 'End Hour',
            accessor: 'end',
        }]

        const dataFiltered = this.props.fetchInitialData().filter(user => user.username === this.state.username)
        
        return (
            <RenderTable
                data={dataFiltered}
                columns={columns}
            />
        );
               
    }
};

export default Username;