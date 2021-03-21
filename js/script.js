// Constant Variables
const theMovieDbApi = '290b2e3aa081caf1278037c5c7ea24d1';
// const omdbApi = 'aa1a65fd';
const omdbApi = '53aa2cd6';

// State Variables
let imdbId;
let randomMovie;
let numberOfMovies = 0;
let randomId;

// Cached Element References
const $movies = $('#movies');
const $generator = $('#generator');

// Event Listeners
$generator.on('click', handleClick);

// Functions

function init (){
    randomMovie = '';
    numberOfMovies = 0;
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
            // if(data.imdb_id == null && data.adult == true) {
            //     //this error shows up
            //     findMovie();
            //     console.log('Error 1');
            //     randomId = String(Math.floor(Math.random()*latestId) + 1);
            // }else if (data.imdb_id == 'null' && data.adult == true){
            //     findMovie();
            //     console.log('Error 2')
            //     randomId = String(Math.floor(Math.random()*latestId) + 1);
            // }else if(data.imdb_id == '' && data.adult == true){
            //     findMovie();
            //     console.log('Error 3')
            //     randomId = String(Math.floor(Math.random()*latestId) + 1);
            if(data.adult == true){
                findMovie();
                // console.log('Error 4')
            }else if (data.imdb_id==null || data.imdb_id == undefined || data.imdb_id == ' '){
                findMovie();
                // console.log('Error 5');
            }else {
                //ISSUE #1 I AM STILL GETTING an empty IMDB ID!!!!!!!!
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
    //while (numberOfMovies <= 6){
    findMovie();
    $.ajax(`https://www.omdbapi.com/?apikey=${omdbApi}&i=${imdbId}`)
        .then(function (data){
            if(data.Type === 'movie' && data.Country === 'USA' && parseFloat(data.imdbRating)>=7.0){
                randomMovie = data;
                renderData ();
                numberOfMovies += 1;
                console.log(randomMovie);
                console.log(numberOfMovies);
                imdbId = '';
            }
        }, function(error){
            console.log(error);
    });
 
    /* For Version 2: */
    //1) Consider different ratings in if statement
}

function renderData (){
    // const html = randomMovie.map(function(randomMovie){
    //     return `
    //         <article class="card">
    //             <div class="container">
    //                 <div class="col-1">
    //                     <h1 id="content">${randomMovie.Title}</h1>
    //                     <p id="content">${randomMovie.Year}</p>
    //                     //Get Rotten Tomatoes Rating [array withing array]
    //                     <p id="content">${randomMovie.imdbRating}</p>
    //                 </div>
    //                 <div class="col-2">
    //                     <img id="poster" src="${randomMovie.Poster}" alt="">
    //                 </div>
    //             </div>
    //         </article>
    //     `;
    // })
    // $movies.append(html);
    //randomId = "";
}

/* For Modal:*/