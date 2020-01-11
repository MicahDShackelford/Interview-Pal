import React, {
    useState, 
    useEffect
} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import Register from './Auth/Register';
import Login from './Auth/Login';

const App = () => {
    const [ActiveUser, SetActiveUser] = useState(null);

    if(ActiveUser === null) {
        return(
            <Router>
                <Switch>
                    <Route path='/login' exact>
                        <Login />
                    </Route>
                    <Route path='/register' exact>
                        <Register />
                    </Route>
                </Switch>
            </Router>
        )
    } else {
        return (
            <h1>Logged in</h1>
        )
    }
}

export default App;