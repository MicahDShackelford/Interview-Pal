const express = require('express');
const crypto = require('crypto');

const database = require('./server/database/database');
const User = require('./server/database/models/User');
const Profile = require('./server/database/models/Profile');
const Counter = require('./server/database/models/Counter');
const BetaKey = require('./server/database/models/BetaKey');
const Session = require('./server/database/models/Session');
const Calendar = require('./server/database/models/Calendar');
const Notes = require('./server/database/models/Notes');
const Interview = require('./server/database/models/Interview');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public/dist'));

// app.get('/setup/counter/user', (req,res) => {
//     let user = new Counter({model: 'User'});
//     user.save();
// })
app.get('/setup/generate/betakey', (req,res) => {
    let key = new BetaKey({name: 'BetaKeyId1', key: '07978396594239693788', uses: 0});
    key.save();
});

app.post('/api/login', (req,res) => {
    let {username, password, remember} = req.body;
    username = username.toLowerCase();
    User.findOne({username})
    .then((response) => {
        if(response === null) {
            res.send({auth: false, message: "Invalid Username or Password"});
        }else {
            if(response.username === username && response.password === password) {
                if(remember) {
                    var date = (new Date()).valueOf().toString();
                    var rand = Math.random().toString();
                    const sId = crypto.createHash('sha1').update(date + rand).digest('hex');
                    let session = new Session({
                        sId,
                        userId: response.id
                    });
                    session.save(() => {
                        res.send({auth: true, message: "Logged In", sessionId: sId, payload: {id: response.id, email: response.email, firstName: response.firstName, lastName: response.lastName, username: response.username, profilePicture: response.profilePicture}});
                    })
                } else {
                    res.send({auth: true, message: "Logged In", payload: {id: response.id, email: response.email, firstName: response.firstName, lastName: response.lastName, username: response.username, profilePicture: response.profilePicture}});
                }
            }else {
                res.send({auth: false, message: "Invalid Username or Password"});
            }
        }
    })
});

app.post('/api/register', (req,res) => {
    let {email, firstName, lastName, username, password, betaKey} = req.body;
    email = email.toLowerCase();
    firstName = firstName.toLowerCase();
    lastName = lastName.toLowerCase();
    username = username.toLowerCase();

    Counter.findOne({model: 'User'})
        .then((doc) => {
            BetaKey.findOne({key: betaKey})
                .then((betaKeyResponse) => {
                    if(betaKeyResponse !== null) {
                        let user = new User({id: doc.int, email, firstName, lastName, username, password});
                        user.save((err, response) => {
                            if(err) {
                                res.send({success: false, message: err.errmsg});
                            }else {
                                let note = new Notes({uId: doc.int});
                                let calendar = new Calendar({uId: doc.int});
                                calendar.save(() => {
                                    let profile = new Profile({id: doc.int});
                                    profile.save(() => {
                                        let note = new Notes({uId: doc.int});
                                        note.save(() => {
                                            let interview = new Interview({uId: doc.int});
                                            interview.save(() => {
                                                doc.int++;
                                                doc.save();
                                            });
                                        });
                                    });
                                });

                                res.send({success: true, message: "Registerd", payload: {id: doc.int, email, firstName, lastName, username, profilePicture: response.profilePicture}});
                            }
                        });
                    } else {
                        res.send({success: false, message: "Invalid Beta Key"});
                    }
                })
        })
});

app.get('/api/session/:id', (req,res) => {
    Session.findOne({sId: req.params.id})
        .then((docs) => {
            User.findOne({id: docs.userId})
                .then((user) => {
                    if(user !== null) {
                        res.send({auth: true, payload: user});

                    }else {
                        res.send({auth: false, payload: {}});
                    }
                })
        }).catch(() => {
            res.send({auth: false, payload: {}});
        })
});

app.get('/api/calendar/:id', (req,res) => {
    Calendar.findOne({uId: req.params.id}) 
        .then((docs) => {
            res.send({payload: docs.events});
        }).catch(() => {
            res.send({payload: []});
        })
});

app.patch('/api/calendar/:id', (req,res) => {
    return new Promise((resolve,reject) => {
        let doc = Calendar.findOneAndUpdate({uId: req.params.id}, {events: req.body});
        resolve(doc);
    }).then((doc) => {
        doc.save();
    }).then(() => {
        res.statusCode = 200;
        res.end();
    }).catch(() => {
        res.statusCode = 400;
        res.end();
    })
});

app.get('/api/interview/:id', (req,res) => {
    Interview.findOne({uId: req.params.id}) 
        .then((docs) => {
            res.send({payload: docs.interviews});
        }).catch(() => {
            res.send({payload: []});
        })
});

app.patch('/api/interview/:id', (req,res) => {
    return new Promise((resolve,reject) => {
        let doc = Calendar.findOneAndUpdate({uId: req.params.id}, {events: req.body});
        resolve(doc);
    }).then((doc) => {
        doc.save();
    }).then(() => {
        res.statusCode = 200;
        res.end();
    }).catch(() => {
        res.statusCode = 400;
        res.end();
    })
});

app.get('/api/notes/:id', (req,res) => {
    Notes.findOne({uId: req.params.id}) 
        .then((docs) => {
            res.send({payload: docs.notes});
        }).catch(() => {
            res.send({payload: []});
        })

});

app.patch('/api/notes/:id', (req,res) => {
    return new Promise((resolve,reject) => {
        let doc = Notes.findOneAndUpdate({uId: req.params.id}, {notes: req.body}); 
        resolve(doc);
    }).then((doc) => {
        doc.save();
    }).then(() => {
        res.statusCode = 200;
        res.end();
    }).catch(() => {
        res.statusCode = 400;
        res.end();
    });
});

app.get('/api/profile/:id', (req,res) => {
    let id = req.params.id;
    Profile.findOne({id})
        .then((doc) => {
            res.send({profile: doc});
        })
});

// Web Routes
// app.get('/register', (req,res) => {
//     res.sendFile("index.html", { root: "./public/dist" });
// });

// app.get('/login', (req,res) => {
//     res.sendFile("index.html", { root: "./public/dist" });
// });

// app.get('/dashboard', (req,res) => {
//     res.sendFile("index.html", { root: "./public/dist" });
// });

// app.get('/profile', (req,res) => {
//     res.sendFile("index.html", { root: "./public/dist" });
// });

app.get('*', (req,res) => {
    res.sendFile("index.html", { root: "./public/dist" });
});

app.listen(PORT, () => {
    console.log(`[InterviewPal-Server] Online & listening on port ${PORT}`);
});
