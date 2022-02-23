import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import "../Pages.css";
import SearchIcon from "@material-ui/icons/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";

import { img_300, noPicture } from "../../config/config";

import { Link } from "react-router-dom";

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });


  const fetchSearch = async () => {
    var mytype = "movie";
    if (type === 0){
      var mytype = "movie";
    }
    else if (type === 1){
      var mytype = "tv";
    }
    else{
      var mytype = "person";
    }
    
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${mytype}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
    // eslint-disable-next-line
  }, [type, page]);

  return (
    <div>
      <span className="pageTitle">What are you looking for?</span>
      <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
            
            
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "33%" }} label="Search Movies" />
          <Tab style={{ width: "33%" }} label="Search TV Series" />
          <Tab style={{ width: "33%" }} label="People" />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content && (type === 1 || type === 0) && 
          content.map((c) => (
            
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv": "movie"}
              vote_average={c.vote_average}
              vote_count={c.vote_count}
            />
          ))}

        {content && type === 2 && 
            content.map((c) => (
              
              <Link to={'/name/'+c.id } className="media">

                <div className="carouselItem">
                  <img
                    src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                    alt={c?.name}
                    
                    className="carouselItem__img"
                  />
                  <b className="carouselItem__txt">{c?.name}</b>
                </div>

              </Link>
          ))}

        
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
