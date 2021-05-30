import React from "react"
import { StartingScreen } from "./Components/StartingScreen"
import { Switch, Route } from "react-router"
import { HomeScreen } from "../src/Components/HomeScreen"
// import { StartingScreen } from "../src/Components/StartingScreen"

function App() {
  return (
    <div>
        {/* <StartingScreen /> */}
        <Switch> 
            <Route exact path="/">
                <HomeScreen />
            </Route>
            <Route path="/starting">
                <StartingScreen />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
