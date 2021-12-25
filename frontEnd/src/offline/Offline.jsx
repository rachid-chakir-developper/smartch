import SignInSide from './pages/SignInSide'
import SignUp from './pages/SignUp'

import {
    Switch,
    Route,
    Redirect,
    useRouteMatch,
  } from "react-router-dom";
  
export default function Offline() {

    let match = useRouteMatch();

  return (
    <div className="offline">
        <Switch>
            <Route exact path={match.path}>
                <Redirect to={`${match.path}/login`} />
            </Route>
            <Route path={`${match.path}/login`}>
                <SignInSide />
            </Route>
            <Route path={`${match.path}/register`}>
                <SignUp />
            </Route>
        </Switch>
    </div>
  );
}
