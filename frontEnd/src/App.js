import 'fontsource-roboto';
import './App.css';

import {
  BrowserRouter as Router,
  Route ,
  Switch,
  Redirect
} from "react-router-dom";

import Offline from './offline/Offline'
import Online from './online/Online'
import ApolloProvider from './ApolloProvider';
import { AuthProvider } from './_shared/context/auth';
import GuardRoute from './_shared/guards/GuardRoute';

function App() {
  return (
    <div className="App">
    <ApolloProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
                <Redirect to={`/online`} />
            </Route>
            <GuardRoute path="/offline" component={Offline} guest />
            <GuardRoute path="/online" component={Online} authenticated  />
          </Switch>
        </Router>
      </AuthProvider>
    </ApolloProvider>
    </div>
  );
}

export default App;
