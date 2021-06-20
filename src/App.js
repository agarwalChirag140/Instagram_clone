import React from "react"
import { StartingScreen } from "./Components/StartingScreen"
import { Switch, Route } from "react-router"
import { HomeScreen } from "../src/Components/HomeScreen"
import { ProfilePage } from "../src/Components/ProfilePage"
import { NavBar} from "../src/Components/NavBar.jsx"
// import { StartingScreen } from "../src/Components/StartingScreen"

function App() {
  return (
    <div>
        {/* <StartingScreen /> */}
        <NavBar />
        <Switch> 
            <Route exact path="/">
                <HomeScreen />
            </Route>
            <Route path="/starting">
                <StartingScreen />
            </Route>
            <Route path="/profilepage">
                <ProfilePage />
            </Route>
        </Switch>
    </div>
  );
}

export default App;
