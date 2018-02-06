import React from "react";
import { Component } from "react";

import BookList from "../containers/book-list";
import BookDetail from "../containers/book-detail";
import Fixtures from "../containers/Fixtures";

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
        <BookDetail />
        <Fixtures />
      </div>
    );
  }
}
