import React, { useEffect, useState} from "react";

import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import { useParams } from "react-router-dom";



import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import "./ContentModal.css";
import { Button, Box } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InfoIcon from "@material-ui/icons/Info";
import Carousel from "../Carousel/Carousel";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
  },
}));

const ContentModal = () => {
  let { media_type, id } = useParams();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <>
          {content && (
            
            
            <div className={classes.paper}>
              
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <span className="Basic-Info">
                    <span>
                      <span className="info-tag">Budjet:</span> {content.budget}$ USD
                    </span>

                    <span>
                      <span className="info-tag">Duration:</span> {content.runtime} min
                    </span>

                    <span>
                      <span className="info-tag">Country:</span> {content.production_countries.length > 0 ? content.production_countries[0].name: ""} 
                    </span>
                    

                  </span>

      
                  

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>


                  <Box display="flex" justifyContent="space-between">
                    <div className="trailer-button">
                        <Button
                          variant="contained"
                          startIcon={<YouTubeIcon />}
                          color="secondary"
                          target="__blank"
                          
                          href={`https://www.youtube.com/watch?v=${video}`}
                        >
                          Watch the Trailer
                        </Button>

                      </div>
                      
                      <div className="imbd-button">
                        <Button
                          variant="contained"
                          startIcon={<InfoIcon />}
                          color="primary"
                          target="__blank"
                          
                          href={`https://www.imdb.com/title/${content.imdb_id}/`}
                        >
                          Check IMBD for more
                        </Button>
                      </div>

                  </Box>
                </div>
              </div>
            </div>
          )}
    </>
  );
}


export default ContentModal;