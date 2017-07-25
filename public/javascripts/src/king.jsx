var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading listing-company">
                    <span className="listing-position-name">{ this.props.attacker_king }</span>
                </h4>
            </a>
        );
    }
});
