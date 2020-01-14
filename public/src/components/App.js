import React, {
    useState,
    useEffect
} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './Protected/Dashboard';
import Navigation from './Protected/Navigation';
import Profile from './Protected/Profile';
import NotFound from './NotFound';
import Forbidden from './Forbidden';
import TopBar from './Protected/TopBar';
import Calendar from './Protected/Calendar';
import Notes from './Protected/Notes';
import About from './Protected/About';
import Support from './Protected/Support';

const App = () => {
    const [ActiveUser, SetActiveUser] = useState(null);

    useEffect(() => {
        const sessionId = localStorage.getItem('sessionId');
        fetch(`/api/session/${sessionId}`)
            .then((res) => {
                return res.json();
            }).then((res) => {
                if(res.auth) {
                    SetActiveUser(res.payload);
                } else {
                    localStorage.removeItem('sessionId');
                }
            })
    },[])

    const Logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('sessionId');
        SetActiveUser(null);
    }

    if(ActiveUser === null) {
        return(
            <Router>
                <Switch>
                    <Route path='/login' exact>
                        <Login SetActiveUser={SetActiveUser} />
                    </Route>
                    <Route path='/register' exact>
                        <Register SetActiveUser={SetActiveUser} />
                    </Route>
                    <Route path="/dashboard" exact>
                        <Redirect to="/login"/>
                    </Route>
                    <Route path="/profile" exact>
                        <Redirect to="/login"/>
                    </Route>
                    <Route path="/" exact>
                        <Redirect to="/login"/>
                    </Route>
                    <Route>
                        <NotFound ActiveUser={ActiveUser} />
                    </Route>
                </Switch>
            </Router>
        )
    } else {
        return (
            <Router>
                <div className="container flex">
                    <Switch>
                            <Route path='/dashboard' exact>
                                <Navigation id="sidebar" ActiveUser={ActiveUser}/>
                                <div className="right-pane">
                                    <TopBar ActiveUser={ActiveUser} Logout={Logout}/>
                                    <div className="primary-display">
                                        <Dashboard ActiveUser={ActiveUser} />
                                    </div>
                                </div>
                            </Route>
                            <Route path='/profile' exact>
                                <Navigation id="sidebar" ActiveUser={ActiveUser}/>
                                <div className="right-pane">
                                    <TopBar ActiveUser={ActiveUser} Logout={Logout}/>
                                    <div className="primary-display">
                                        <Profile ActiveUser={ActiveUser}/>
                                    </div>
                                </div>
                            </Route>
                            <Route path='/calendar' exact>
                                <Navigation id="sidebar" ActiveUser={ActiveUser}/>
                                <div className="right-pane">
                                    <TopBar ActiveUser={ActiveUser} Logout={Logout}/>
                                    <div className="primary-display">
                                        <Calendar ActiveUser={ActiveUser}/>
                                    </div>
                                </div>
                            </Route>
                            {/* Interviews */}
                            <Route path='/notes' exact>
                                <Navigation id="sidebar" ActiveUser={ActiveUser}/>
                                <div className="right-pane">
                                    <TopBar ActiveUser={ActiveUser} Logout={Logout}/>
                                    <div className="primary-display">
                                        <Notes ActiveUser={ActiveUser}/>
                                    </div>
                                </div>
                            </Route>
                            <Route path='/about' exact>
                                <Navigation id="sidebar" ActiveUser={ActiveUser}/>
                                <div className="right-pane">
                                    <TopBar ActiveUser={ActiveUser} Logout={Logout}/>
                                    <div className="primary-display">
                                        <About />
                                    </div>
                                </div>
                            </Route>
                            <Route path='/support' exact>
                                <Navigation id="sidebar" ActiveUser={ActiveUser}/>
                                <div className="right-pane">
                                    <TopBar ActiveUser={ActiveUser} Logout={Logout}/>
                                    <div className="primary-display">
                                        <Support />
                                    </div>
                                </div>
                            </Route>

                            <Route path="/login">
                                <Redirect to="/dashboard"/>
                            </Route>
                            <Route path="/register">
                                <Redirect to="/dashboard"/>
                            </Route>
                            <Route path="/" exact>
                                <Redirect to="/dashboard"/>
                            </Route>
                            <Route>
                                <NotFound ActiveUser={ActiveUser} />
                            </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;