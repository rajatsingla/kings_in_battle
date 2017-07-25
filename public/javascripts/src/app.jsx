
var $ = jQuery = require("../../../libraries/jquery/jquery-3.1.1.min")
var bootstrap = require("../../../libraries/bootstrap-3.3.7-dist/js/bootstrap");
var React = require('react');
var ReactDOM = require('react-dom');
var Kings = require('./kings.jsx');

ReactDOM.render(
    <Kings />,
    document.getElementById('king-list')
);
