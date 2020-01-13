import React, {useState, useEffect} from 'react';

const Profile = ({ActiveUser}) => {
    const [Profile, SetProfile] = useState({
        id: null,
        level: 'null',
        status: 'null',
        connections: ['null'],
        status: ['null'],
        bio: 'null',
        displayEmail: false,
        displayPhone: false
    })
    useEffect(() => {
        const {id} = ActiveUser;
        console.log(id);
        fetch(`/api/profile/${id}`)
            .then((res) => {
                return res.json();
            }).then((res) => {
                SetProfile(res.profile);
            })
    },[])
    return (
        <div>
            <h1>Profile</h1>
            <div className="card-row">
                <div className="card flex column">
                    <img className="avatar-lg" src={ActiveUser.profilePicture}></img>
                    <h3>{`${ActiveUser.firstName} ${ActiveUser.lastName}`}</h3>

                    <div className="flex">
                        <div className="flex column p-5">
                            <p>Interview Level</p>
                            <h4>{Profile.level}</h4>
                        </div>
                        <div className="flex column p-5">
                            <p>Employment Status</p>
                            <h4>{Profile.employStatus}</h4>
                        </div>
                    </div>
                </div>
                <div className="card card-blank flex column">
                    <div>
                        <h4>Bio:</h4>
                        <p>{Profile.bio}</p>
                    </div>
                    <div>
                        <h4>Connections:</h4>
                        <p>Feature coming soon</p>
                    </div>
                </div>
                
                {/* <div className="card card-empty"></div> */}
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

export default Profile;