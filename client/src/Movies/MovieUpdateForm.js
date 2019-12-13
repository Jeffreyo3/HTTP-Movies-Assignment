import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MovieUpdateForm = (props) => {
    const initialState = {
        title: '',
        director: '',
        metascore: '',
        stars: []
    };

    const [movieValue, setMovieValue] = React.useState(initialState);
    const [error, setError] = React.useState('');
    
    let history = useHistory();

    const id = Number(props.match.params.id);

    const fetchMovie = id => {
        axios 
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovieValue(res.data))
            .catch(err => console.log(err.response));
    };

    React.useEffect(() => {
        fetchMovie(props.match.params.id);
    }, [props.match.params.id]);
    

    const onChangeHandler = e => {
        console.log(e.target.value);

        if (e.target.name === "stars") {
            setMovieValue({
                ...movieValue,
                stars: [e.target.value]
            });
        } else {
            setMovieValue({
                ...movieValue, [e.target.name]: e.target.value
            });
        };
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieValue)
            .then(res => {
                console.log("Updating Movie Values...", res);
                // props.history.goBack(2);
                // props.history.push('/');
                history.push('/');
            })
            .catch(err => console.log(err.response));
    }

    return (
        <div className="card">
            <form onSubmit={onSubmitHandler} className="form">
                <input type="text" 
                    name="title" 
                    value={movieValue.title} 
                    onChange={onChangeHandler} 
                    placeholder="Title"/>

                <input type="text" 
                    name="director" 
                    value={movieValue.director} 
                    onChange={onChangeHandler} 
                    placeholder="Director"/>

                <input type="text" 
                    name="metascore" 
                    value={movieValue.metascore} 
                    onChange={onChangeHandler} 
                    placeholder="Metascore"/>

                <input type="text" 
                    name="stars" 
                    value={movieValue.stars} 
                    onChange={onChangeHandler} 
                    placeholder="Stars"/>
                
                <button>Submit Changes</button>
            </form>
        </div>
    )
}

export default MovieUpdateForm;