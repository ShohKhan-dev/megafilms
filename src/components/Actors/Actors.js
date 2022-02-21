import "./Actors.css";
import { useParams } from "react-router-dom";
import { img_300, noPicture,  unavailable,
    unavailableLandscape, img_500 } from "../../config/config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { act } from "react-dom/cjs/react-dom-test-utils.production.min";



const Actor = () => {
    let { id } = useParams();
    const [actorData, setActor] = useState([]);

    const fetchActor = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setActor(data);
    };

    useEffect(() => {
        fetchActor();
    }, []);

            

    return (
        <div>

            <div className="actor-info">
              
                <div className="ActorModal">
                <img
                  src={
                    actorData.profile_path? `${img_500}/${actorData.profile_path}`: unavailable
                  }
                  alt={actorData.name}
                  className="ActorModal__portrait"
                />
                <img
                  src={
                    actorData.profile_path ? `${img_500}/${actorData.profile_path}`: unavailableLandscape
                  }
                  alt={actorData.name}
                  className="ActorModal__landscape"
                />
                
                <div className="ActorModal-about">
                    <span className="Actor-name">
                    {actorData.name}
                    </span>
                    {
                    <i className="tagline">{actorData.birthday} - {actorData.deathday ? actorData.deathday: "Alive"}</i>
                    }

                    <span className="Actor-description">
                    {actorData.biography}
                    </span>

                    <span className="Basic-Info-actor">
                        <span>
                            <span className="info-tag">Occupation:</span> {actorData.known_for_department}
                        </span>

                        <span>
                            <span className="info-tag">Rating:</span> {actorData.popularity} 
                        </span>
                    </span>

                    <span className="Basic-Info-actor">
                        <span>
                            <span className="info-tag">Place of birth:</span> {actorData.place_of_birth}
                        </span>

                        <span>
                            <span className="info-tag">Gender:</span> {actorData.gender == 1 ? "Female": "Male"}
                        </span>
                    </span>

                </div>
                </div>
            </div>


            {/* { <div className="Item">
                    <img
                    src={actorData.profile_path ? `${img_300}/${actorData.profile_path}` : noPicture}
                    alt={actorData?.name}
                    className="Item__img"
                    />
                    <b className="Item__txt">{actorData?.name}</b>
                    
                    
            </div>  } */}

        </div>
        
    );
};

export default Actor;
