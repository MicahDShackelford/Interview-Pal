import React, {useEffect, useState} from 'react';

import FullCalendar from '@fullcalendar/react';
// import { Calendar as Cal } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';


import './main.scss';
// import CalendarCreate from './CalendarCreate';

const Calendar = ({ActiveUser}) => {
    const [Events, SetEvents] = useState(null);
    const [ActiveEvent, SetActiveEvent] = useState(null);
    const [Active, SetActive] = useState(0);
    // { title: 'event 1', date: '2020-01-12' },
    // {title:"test", date:"2020-01-12", id: 0},
    // { title: 'event 1', 
    // start  : '2020-01-13T12:30:00',
    // end  : '2020-01-13T1:30:00',
    // allDay : false }
    
    useEffect(() => {
        FetchEvents()
    },[]);
    useEffect(() => {
        let next = Array.prototype.slice.call(document.getElementsByClassName('fc-next-button'));
        let prev = Array.prototype.slice.call(document.getElementsByClassName('fc-prev-button'));
        let today = Array.prototype.slice.call(document.getElementsByClassName('fc-today-button'));
        let date = Array.prototype.slice.call(document.getElementsByClassName('fc-left'));
        
        next[1].onclick = () => {
            next[0].click();
        }
        prev[1].onclick = () => {
            prev[0].click();
        }
        today[1].onclick = () => {
            today[0].click();
        }
    },[Active, Events, ActiveEvent])
    
    useEffect(() => {
        if(Events !== null) {
            PatchEvents();
        }
    }, [Events]);
    
    const FetchEvents = () => {
        fetch(`/api/calendar/${ActiveUser.id}`)
            .then((res) => {
                return res.json();
            }).then((res) => {
                SetEvents(res.payload);
            });
    }

    const PatchEvents = () => {
        fetch(`/api/calendar/${ActiveUser.id}`, {
            method: "PATCH",
            body: JSON.stringify(Events),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const DateClick = e => {
        let {dateStr, date} = e;

        // SetActiveEvent({date: dateStr});

        let inputs = Array.prototype.slice.call(document.getElementsByClassName('cal-create-input'));
        inputs[1].value = dateStr;
        let create = document.getElementById('cal-create');
        create.style.opacity = 1;
        create.style.visibility = "visible";



        // let eventsUpdate = Events.slice();
        // eventsUpdate.push({title: eventName, date: dateStr});
        // SetEvents(eventsUpdate);
        // console.log(eventsUpdate);
    }
    const CreateEvent = e => {
        e.preventDefault();

        let event = {};
        if(e.target[2].value !== "") {
            const start = `${e.target[1].value}T${e.target[2].value}:00`;
            const end = `${e.target[1].value}T${e.target[3].value}:00`; 
            event = {title: e.target[0].value, start, end, interview:e.target[4].checked, desc: e.target[5].value, id: `event-${Events.length}`};
        }else {
            event = {title: e.target[0].value, date: e.target[1].value, interview:e.target[4].checked, desc: e.target[5].value, id: `event-${Events.length}`};
        }

        let eventsUpdate = Events.slice();
        eventsUpdate.push(event);
        SetEvents(eventsUpdate);

        CloseModal();
    }

    const EventClick = e => {
        let edit = document.getElementById('cal-edit');
        edit.style.opacity = 1;
        edit.style.visibility = "visible";
        let inputs = Array.prototype.slice.call(document.getElementsByClassName('cal-edit-input'));
        
        let event = Events[e.event.id.split('-')[1]];
        SetActiveEvent(parseInt(e.event.id.split('-')[1]));

        inputs[0].value = event.title;
        if(event.date !== undefined) {
            inputs[1].value = event.date; 
        } else {
            inputs[1].value = event.start.slice(0, 10);
            inputs[2].value = event.start.slice(11, 16);
            if(event.end) {
                inputs[3].value = event.end.slice(11, 16); 
            }
        }
        // console.log(inputs);
        document.getElementById("e-interview").checked = event.interview;
        inputs[4].value = event.desc;
        
        // let eventsUpdate = Events.slice();
        // eventsUpdate.push(event);
        // SetEvents(eventsUpdate);
    }

    const EditEvent = e => {
        e.preventDefault();
        let editInputs = Array.prototype.slice.call(document.getElementsByClassName('cal-edit-input'));
        let event = {};
        if(e.target[2].value !== "") {
            const start = `${e.target[1].value}T${e.target[2].value}:00`;
            const end = `${e.target[1].value}T${e.target[3].value}:00`; 
            event = {title: e.target[0].value, start, end, interview:e.target[4].checked, desc: e.target[5].value, id: `event-${ActiveEvent}`};
        }else {
            event = {title: e.target[0].value, date: e.target[1].value, interview:e.target[4].checked, desc: e.target[5].value, id: `event-${ActiveEvent}`};
        }

        let eventsUpdate = Events.slice();
        eventsUpdate.splice(ActiveEvent,1,event);
        SetEvents(eventsUpdate);
        CloseModal();
    }

    const DeleteEvent = e => {
        e.preventDefault();
        let eventsUpdate = Events.slice();
        eventsUpdate.splice(ActiveEvent,1);
        for(var i = 0; i < eventsUpdate.length; i++) {
            eventsUpdate[i].id = `event-${i}`;
        }
        SetEvents(eventsUpdate);
        CloseModal();
    }
 
    const CloseModal = e => {
        const calCreateModal = document.getElementById("cal-create");
        const calEditModal = document.getElementById("cal-edit");
        if(document.getElementById("c-interview")) {
            document.getElementById("c-interview").checked = false;
        }else {
            document.getElementById("e-interview").checked = false;
        }

        calCreateModal.style.opacity = "0";
        calEditModal.style.opacity = "0";
        calCreateModal.style.visibility = "hidden";
        calEditModal.style.visibility = "hidden";

        setTimeout(() => {
            let createInputs = Array.prototype.slice.call(document.getElementsByClassName('cal-create-input'));
            let editInputs = Array.prototype.slice.call(document.getElementsByClassName('cal-edit-input'));
            createInputs.forEach((input) => {
                input.value = "";
            });
            editInputs.forEach((input) => {
                input.value = "";
            });
        }, 1000);
    }
    return (
        <div id="cal-container">
            <div className="calendar month-view">
                <FullCalendar 
                defaultView="dayGridMonth" 
                plugins={[ dayGridPlugin, interactionPlugin ]}
                events={Events}
                dateClick={DateClick}
                eventClick={EventClick}/>
                {/* <Cal
                plugins={[listPlugin]}
                defaultView='listWeek'/> */}
            </div>
            <div className="calendar list-view">
                <FullCalendar 
                defaultView="listMonth" 
                plugins={[ listPlugin ]}
                events={Events}
                eventClick={EventClick}/>
            </div>

            <div id="cal-create">
                <div className="modal">
                    <h3>Create an Event</h3>
                    <span className="close" onClick={CloseModal}>&times;</span>
                    <form onSubmit={CreateEvent}>
                        <div className="flex column h-100">
                            <div className="input-group">
                                <input className="cal-create-input" type="text" placeholder="Event Title"/>
                                <i className="far fa-user line"></i>
                            </div>
                            <div className="input-group">
                                <input className="cal-create-input" type="text" placeholder="Event Date"/>
                                <i className="far fa-user line"></i>
                            </div>
                            <div className="flex">
                                <div className="input-group">
                                    <input className="cal-create-input" type="text" placeholder="Start (00:00)"/>
                                    <i className="far fa-user"></i>
                                </div>
                                <div className="input-group">
                                    <input className="cal-create-input" type="text" placeholder="End (00:00)"/>
                                    <i className="far fa-user"></i>
                                </div>
                            </div>
                            <div className="checkbox p-5">
                                <label>
                                    <input type="checkbox" id="c-interview"/>
                                    <span className="checkmark" checked="checked">
                                        <i className="fas fa-check"></i>
                                    </span> Is this an interview?
                                </label>
                            </div>
                            <div className="input-group">
                                <textarea className="cal-create-input" className="w-100" placeholder="Enter a breif description"></textarea>
                            </div>
                            <button type="submit" className="btn btn-2x w-10 m-5">Create</button>
                        </div>
                    </form>
                </div>
            </div>

            <div id="cal-edit">
                <div className="modal">
                    <h3>Edit an Event</h3>
                    <span className="close" onClick={CloseModal}>&times;</span>
                    <form onSubmit={EditEvent}>
                        <div className="flex column h-100">
                            <div className="input-group">
                                <input className="cal-edit-input" type="text" placeholder="Event Title"/>
                                <i className="far fa-user line"></i>
                            </div>
                            <div className="input-group">
                                <input className="cal-edit-input" type="text" placeholder="Event Date"/>
                                <i className="far fa-user line"></i>
                            </div>
                            <div className="flex">
                                <div className="input-group">
                                    <input className="cal-edit-input" type="text" placeholder="Start (00:00)"/>
                                    <i className="far fa-user"></i>
                                </div>
                                <div className="input-group">
                                    <input className="cal-edit-input" type="text" placeholder="End (00:00)"/>
                                    <i className="far fa-user"></i>
                                </div>
                            </div>
                            <div className="checkbox p-5">
                                <label>
                                    <input type="checkbox" id="e-interview"/>
                                    <span className="checkmark" checked="checked">
                                        <i className="fas fa-check"></i>
                                    </span> Is this an interview?
                                </label>
                            </div>
                            <div className="input-group">
                                <textarea className="cal-edit-input w-100" placeholder="Enter a breif description"></textarea>
                            </div>
                            <div className="flex">
                                <button onClick={DeleteEvent} className="btn btn-2x w-10 m-5">Delete</button>
                                <button type="submit" className="btn btn-2x w-10 m-5">Edit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Calendar;