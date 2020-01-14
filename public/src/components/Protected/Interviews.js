import React, {useState, useEffect} from 'react';
import fetcher from '../util/fetch/fetcher';

const Interviews = ({ActiveUser}) => {
    const [MyInterviews, SetMyInterviews] = useState([]); // Company, Role, Desc, Date, Completed
    const [Events, SetEvents] = useState([]);

    useEffect(() => {
        // fetcher.Interviews()
        //     .then((res) => {
        //         SetMyInterviews(res);
        //     })
        fetcher.Events(ActiveUser.id)
            .then((res) => {
                let interviews = [];
                for(var i = 0; i < res.length; i++) {
                    if(res[i].interview) {
                        interviews.push(res[i]);
                    }
                }
                SetMyInterviews(interviews);
            });
    },[]);

    return (
        <div id="interviews">
            <div className="card-row">
                <div className="card">
                    <h4>Upcoming Interviews</h4>
                    <h1 className="colored">{MyInterviews.length}</h1>
                    <div className="icon colored">
                        <i className="far fa-calendar-alt"></i>
                    </div>
                </div>
                <div className="card">
                    <h4>Completed Interviews</h4>
                    <h1 className="colored">0</h1>
                    <div className="icon colored">
                        <i className="far fa-calendar-check"></i>
                    </div>
                </div>
            </div>
            <div className="card-row">
                <div className="card">
                    <div className="flex column">
                        <h1>More coming soon!</h1>
                        <p>Check back later for a lot of cool new features!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interviews;