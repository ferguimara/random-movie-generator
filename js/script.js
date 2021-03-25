// Constant Variables
const theMovieDbApi = '290b2e3aa081caf1278037c5c7ea24d1';
// const omdbApi = 'aa1a65fd';
const omdbApi = 'e79c6fcf';

// State Variables
let imdbId;
let randomMovie;
let numberOfMovies = 0;
let randomId;
let moviesArray = [];
let randomMovieArray;

// Cached Element References
const $movies = $('#movies');
const $generator = $('#generator');

// Event Listeners
$generator.on('click', handleClick);
$movies.on('click', '.card', handleShowModal);

// Functions

function init (){
    randomMovie = '';
    numberOfMovies = 0;
    moviesArray = [];
}

function handleClick (){
    getData();
}

function findMovie () {
    //uses themoviedb API
    let latestId = 806765;     
    let randomId = String(Math.floor(Math.random()*latestId) + 1);
    $.ajax(`https://api.themoviedb.org/3/movie/${randomId}?api_key=${theMovieDbApi}&language=en-US`)
        .then(function (data){
            if(data.adult == true){
                findMovie();
                // console.log('Error 4')
            }else if (data.imdb_id == null || data.imdb_id == undefined || data.imdb_id == ' ' || data.imdb_id == ''){
                findMovie();
                // console.log('Error 5');
            }else {
                imdbId = data.imdb_id;
                // console.log('NO ERROR');
                console.log(imdbId);
            }
        }, function(error){
            console.log(error);
            findMovie();
        });

    /* For Version 2: */
    //Step 1) run ajax on latest ==> https://api.themoviedb.org/3/movie/latest?api_key=290b2e3aa081caf1278037c5c7ea24d1&language=en-US
    //this will get the latest Id for movie
    //step 2) get the id for latest and store it in variable for latestID
}

function getData () {
    //uses omdbapi
    // while (numberOfMovies <= 6) { try length on array function
        findMovie();
        $.ajax(`https://www.omdbapi.com/?apikey=${omdbApi}&i=${imdbId}`)
            .then(function (data){
                //if has rotten tomatoes rating and has a rating over x
                if(data.Type === 'movie' && data.Country === 'USA' && parseFloat(data.imdbRating)>=7.0){
                    randomMovie = data;
                    //why am I not getting a key/value pair they work in REPL!!!!!!!
                    let randomMovieArray = []
                    Object.keys(randomMovie).map(function(key){
                        randomMoviesArray.push({[key]:randomMovie[key]})
                    });
                    moviesArray.push(randomMovieArray);
                    // moviesArray.push(Object.keys(data).map(i => data[i]))
                    renderData ();
                    // console.log(randomMovie);
                    imdbId = '';
                }else{
                    getData();
                }
            }, function(error){
                console.log(error);
                getData();
            });
    // } 

    /* For Version 2: */
    //1) Consider different ratings in if statement like rotten tomatoes 
}

function renderData (){
    const html = `
            <article data-imdbId="${randomMovie.imdbID}"class="card">
                <div class="container">
                    <div class="col-1">
                        <h1 id="content">${randomMovie.Title}</h1>
                        <p id="content">${randomMovie.Year}</p>
                        <p id="content">${randomMovie.imdbRating}</p>
                    </div>
                    <div class="col-2">
                        <img id="poster" src="${randomMovie.Poster}" alt="">
                    </div>
                </div>
            </article>
        `;
    $movies.append(html);
    randomId = '';
    // imdbId = '';
}

/* For Modal:*/
function handleShowModal(){
    const movieId = this.dataset.imdbId;
    const selectedMovie = moviesArray.find(function(movie) {
        return movie.imdbID == movieId;
    });

    //add the content to the modal
    $('#img').attr({src: selectedMovie.Poster, alt:selectedMovie.Title})
    $('#title').text(selectedMovie.mission_name);
    $('#year').text(selectedMovie.launch_year);
    $('#directors').text(`Directors: ${selectedMovie.Director}`);
    $('#actors').text(`Actors: ${selectedMovie.Actors}`);
    $('#plot').text(`Plot: ${selectedMovie.Plot}`);
    
    $('.modal').modal();
}