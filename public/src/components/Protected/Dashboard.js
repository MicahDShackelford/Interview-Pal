import React, {useState, useEffect} from 'react';
import fetcher from './../util/fetch/fetcher';


const Dashboard = ({ActiveUser}) => {
    const [Interviews, SetInterviews] = useState([]);
    const [Events, SetEvents] = useState([]);
    useEffect(() => {
        fetcher.Events(ActiveUser.id)
            .then((res) => {
                let interviews = [];
                let events = [];
                for(var i = 0; i < res.length; i++) {

                    if(res[i].interview) {
                        let date, time;
                        if(res[i].start) {
                            date = res[i].start.slice(0, 10);
                            if(res[i].end) {
                                time = `${res[i].start.slice(11, 16)} - ${res[i].end.slice(11, 16)}`; 
                            } else {
                                time = res[i].start.slice(11, 16);
                            }
                        } else {
                            time = "-";
                        }
                        interviews.push({title: res[i].title, time, date, key: `interview-${i}`});
                        console.log(interviews)
                        // let interviewsUpdate = Interviews;
                        // interviewsUpdate.push({title: res[i].title, time, date, key: `interview-${i}`});
                        // SetInterviews(interviewsUpdate);
                    }else {
                        let date, time;
                        if(res[i].start) {
                            date = res[i].start.slice(0, 10);
                            if(res[i].end) {
                                time = `${res[i].start.slice(11, 16)} - ${res[i].end.slice(11, 16)}`; 
                            } else {
                                time = res[i].start.slice(11, 16);
                            }
                        } else {
                            time = "-";
                        }
                        events.push({title: res[i].title, time, date, key: `event-${i}`});
                    }
                }
                if(interviews.length === 0) {
                    interviews.push({title: "No Events Scheduled", date: "", time: ""})
                }
                if(events.length === 0) {
                    events.push({title: "No Events Scheduled", date: "", time: ""})
                }
                SetInterviews(interviews);
                SetEvents(events);
            })
    },[])
  return (
    <div>
        <h1>Dashboard</h1>
        <div className="card-row">
            <div className="card">
                <h4>Upcoming Interviews</h4>
                <h1 className="colored">{Interviews.length}</h1>
                <div className="icon colored">
                    <i className="far fa-calendar-alt"></i>
                </div>
            </div>
            <div className="card">
                <h4>Completed Interviews</h4>
                <h1 className="colored">32</h1>
                <div className="icon colored">
                    <i className="far fa-calendar-check"></i>
                </div>
            </div>
            <div className="card">
                <h4>Total Notes</h4>
                <h1 className="colored">132</h1>
                <div className="icon colored">
                    <i className="far fa-sticky-note"></i>
                </div>
            </div>
        </div>
        <h3>Upcoming</h3>
        <div className="card-row">
            <div className="card">
                <h4 className="colored">Upcoming Interviews</h4>
                <table>
                    <tr>
                        <th>Interview</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                    {Interviews.map((interview) => (
                        <tr key={interview.key}>
                            <td><p>{interview.title}</p></td>
                            <td><p>{interview.date}</p></td>
                            <td><p>{interview.time}</p></td>
                        </tr>
                    ))}
                </table>
            </div>
            <div className="card">
                <h4 className="colored">Upcoming Events</h4>
                <table>
                    <tr>
                        <th>Events</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th></th>
                    </tr>
                    {Events.map((event) => (
                        <tr>
                            <td><p>{event.title}</p></td>
                            <td><p>{event.date}</p></td>
                            <td><p>{event.time}</p></td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
        <div className="card-row">
            <div className="card">
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Last Edit</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td><p>Interview 4 Notes</p></td>
                        <td><p>Jan. 5, 2020<br/> 3:28pm</p></td>
                        <td><i className="fas fa-cog"></i></td>
                    </tr>
                    <tr>
                        <td><p>Micasoft Contact Emails</p></td>
                        <td><p>Jan. 1, 2020<br/> 7:45pm</p></td>
                        <td><i className="fas fa-cog"></i></td>
                    </tr>
                </table>
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

export default Dashboard;