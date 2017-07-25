var React = require('react');
var request = require('request');

var King = require('./king.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {kings: []}
    },

    componentDidMount: function() {
        request('http://localhost:3000/api/king/', function(error, response, body) {
            var result = JSON.parse(body);
            if (this.isMounted()) {
                this.setState(result);
            }
        }.bind(this));
    },

    render: function(){
        return (
            <div className="list-group">
                {this.state.kings.map(function(king){
                    return (
                        <King
                            attacker_king = {king.attacker_king}
                        />
                    )
                })}
            </div>
        );
    }
});
