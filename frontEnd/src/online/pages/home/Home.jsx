import ListMovies from './ListMovies'

import {
    Switch,
    Route,
    Redirect,
    useRouteMatch,
  } from "react-router-dom";
  
export default function Home() {

    let match = useRouteMatch();

  return (
    <div className="staff">
        <Switch>
            <Route exact path={`${match.path}`}>
                <ListMovies />
            </Route>
        </Switch>
    </div>
  );
}
