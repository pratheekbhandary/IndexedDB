import React, { Component } from "react";
import { connect } from "react-redux";
import pratDB from "../db";

class Fixture extends Component {

    constructor(props){
        super(props);
        this.saveNewFixture=this.saveNewFixture.bind(this);
    }
    componentDidMount(){
      pratDB.open();
    }
  


    saveNewFixture(){
       
      pratDB.fetchSingleValue();
    }

  render() {
  return(
  <div>
    <button onClick={this.saveNewFixture}>Fixture</button></div>
  )
}}

function mapStateToProps(state) {
  return {
    book: {"books":"Harry puttar"}
  };
}

export default connect(mapStateToProps)(Fixture);
