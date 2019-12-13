import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Route } from 'react-router-dom';
import MovieUpdateForm from './MovieUpdateForm';

// export default class MovieList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       movies: []
//     };
//   }

//   componentDidMount() {
//     axios
//       .get("http://localhost:5000/api/movies")
//       .then(res => this.setState({ movies: res.data }))
//       .catch(err => console.log(err.response));
//   }

//   render() {
//     return (
//       <div className="movie-list">
//         {this.state.movies.map(movie => (
//           <MovieDetails key={movie.id} movie={movie} />
//         ))}
//       </div>
//     );
//   }
// }

// function MovieDetails({ movie }) {
//   return (
//     <Link to={`/movies/${movie.id}`}>
//       <MovieCard movie={movie} />
//     </Link>
//   );
// }

function MovieList () {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response));
  }, []);

  return (
    <>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div> 
    </>
  )

}

function MovieDetails({ movie }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} />
    </Link>
  );


}
export default MovieList;

