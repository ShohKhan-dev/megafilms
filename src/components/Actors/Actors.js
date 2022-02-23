import "./Actors.css";
import { useParams } from "react-router-dom";
import { img_300, noPicture,  unavailable,
    unavailableLandscape, img_500 } from "../../config/config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieIcon from "@material-ui/icons/Movie";
import TvIcon from "@material-ui/icons/Tv";
import InfoIcon from "@material-ui/icons/Info";
import SingleContent from "../../components/SingleContent/SingleContent";
import { Button } from "@material-ui/core";


const Actor = () => {
    let { id } = useParams();
    const [actorData, setActor] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [seriesCredits, setSeriesCredits] = useState([]);

    const fetchActor = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setActor(data);
    };

    const fetchActorMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setMovieCredits(data.cast);
    };

    const fetchActorSeries = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        console.log(data.cast);

        setSeriesCredits(data.cast);
    };


    useEffect(() => {
        fetchActor();
        fetchActorMovies();
        fetchActorSeries();

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
                            <span className="info-tag">Gender:</span> {actorData.gender === 1 ? "Female": "Male"}
                        </span>
                    </span>

                    <Button
                          variant="contained"
                          startIcon={<InfoIcon />}
                          color="primary"
                          target="__blank"
                          
                          href={`https://www.imdb.com/name/${actorData.imdb_id}/`}
                        >
                          Check IMBD for more
                    </Button>


                </div>
                
                </div>
            </div>
            <div className="Movies-section">
                <span className="pageTitle"><MovieIcon/>Movie Credits ({movieCredits.length})<MovieIcon/></span>
                <div className="movies">
                    {movieCredits &&
                    movieCredits.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="movie"
                            vote_average={c.vote_average}
                            vote_count={c.vote_count}
                        />
                    ))}
                </div>
            </div>

            <div className="Series-section">
                <span className="pageTitle"><TvIcon/>TV Series Credits ({seriesCredits.length})<TvIcon/></span>
                <div className="movies">
                    {seriesCredits &&
                    seriesCredits.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type="tv"
                            vote_average={c.vote_average}
                            vote_count={c.vote_count}
                        />
                    ))}
                </div>
            </div>
        </div>
        
    );
};

export default Actor;
