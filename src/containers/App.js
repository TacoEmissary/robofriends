import React, { Component, useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ErrorBoundary from "../components/ErrorBoundary";
import Scroll from "../components/Scroll";
import "./App.css";
import "tachyons";

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ""
        }
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(Response => {
                return Response.json();
            })
            .then(users => {
                this.setState({ robots: users })
            }
        )
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const { robots, searchfield } = this.state;

        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        
        return !robots.length ? 
        <h1 className="tc">Loading ...</h1> :
        (
            <div className="tc center">
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default App;