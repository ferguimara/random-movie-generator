// Constant Variables
const theMovieDbApi = '290b2e3aa081caf1278037c5c7ea24d1';
const omdbApi = 'aa1a65fd';


// state variables - data that changes
let imdbId;
let randomMovie;
let numberOfMovies = 0;
let randomId;

// cached element references
const $movies = $('#movies');
const $generator = $('#generator');

// event listeners - capture and respond to events
$generator.on('click', handleClick);

// functions -  code that represents actions taken

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
    let randomId = Math.floor(Math.random()*latestId) + 1;
    imdbId = '';
    $.ajax(`https://api.themoviedb.org/3/movie/${randomId}?api_key=${theMovieDbApi}&language=en-US`)
        .then(function (data){
            console.log(data);
            if (data.imdb_id !== "" && data.adult === false || data.imdb_id !== null && data.adult === false){
                imdbId = data.imdb_id;
                console.log(imdbId)
            }else if(imdbId == null){
                findMovie();
            }
        }, function(error){
            console.log(error);
        });

    /* For Version 2: */
    //Step 1) run ajax on latest ==> https://api.themoviedb.org/3/movie/latest?api_key=290b2e3aa081caf1278037c5c7ea24d1&language=en-US
    //this will get the latest Id for movie
    //step 2) get the id for latest and store it in variable for latestID
}

function getData () {
    //uses omdbapi
    //step 1) while numberOfMoives<=6 {}
    //while (numberOfMovies <= 6){
        findMovie();
        $.ajax(`https://www.omdbapi.com/?apikey=${omdbApi}&i=${imdbId}`)
            .then(function (data){
                console.log(data);
                //step 1.3) within (.then function data), create if statement:
                //step 1.3.1) if type === movie && county === USA
                // if(data.Type === 'movie' && data.Country === 'USA' && parseFloat(data.imdbRating)>=6.0){
                //     //step 1.3.2) randomMovie = data
                //     randomMovie = data;
                //     //step 1.4) renderData()
                //     renderData ();
                //     //step 1.5) numberOfMovies += 1
                //     numberOfMovies += 1;
                //     console.log(randomMovie);
                //     console.log(numberOfMovies);
                // }
            }, function(error){
                console.log(error);
        });
    //}
     
    /* For Version 2: */
    //1) Consider rating in if statement
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