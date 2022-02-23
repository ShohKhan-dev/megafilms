import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import Star from "@material-ui/icons/Star";
import HowToVote from "@material-ui/icons/HowToVote";
import { Link } from "react-router-dom";


const SingleContent = ({

  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
  vote_count,
  
}) => {
  return (


        <Link to={'/'+media_type+'/'+id } className="media">
          
        
            <img
              className="poster"
              src={poster ? `${img_300}${poster}` : unavailable}
              alt={title}
            />
            <b className="title">{title}</b>
            <span className="subTitle">
              {media_type === "tv" ? "TV Series" : "Movie"}
              <span className="subTitle">{date}</span>
            </span>
            <span className="voteAverage">

              <span color={vote_average > 6 ? "primary" : "secondary"}>
                <HowToVote className="star-icon"/>
                {vote_count}
              </span>
              
              <span >
                <Star className="star-icon"/>
                {vote_average}

              </span>
              
            </span>
          

        </Link>
    
  );
};

export default SingleContent;
