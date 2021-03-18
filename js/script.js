// constant Variables - data that never changes

// state variables - data that changes
let imdbId;
let randomMovie;
let numberOfMovies = 0;
let randomId;

// cached element references - parts of the dom we need to touch
const $movies = $('#movies');
const $generator = $('#generator');

// event listeners - capture and respond to events
$generator.on('click', getData);

// functions -  code that represents actions taken

function init (){
    imdbId = null;
    randomMovie = '';
    numberOfMovies = 0;
}

function findMovie () {
    //uses themoviedb API
    //step 1) initiate variable, latestId [put this outside of this function -- start at random number]
    //step 2) run ajax on latest ==> https://api.themoviedb.org/3/movie/latest?api_key=290b2e3aa081caf1278037c5c7ea24d1&language=en-US
    //step 3) get the id for latest and store it in variable for latestID
    //step 4) create variable randomId = random number between 0 and latest id
    //step 5) load ajax with template literals adding variables for randomId and api key
    //step 6) withing (.then function(data)), create if statement:
        //6.1) if (data.imdb_id !== "" && data.adult === false) 
        //6.2) imdbId = imdb_id
        //6.3) console.log(imdbId)
    //step 7) error function
}

function getData () {
    //uses omdbapi
    //step 1) while numberOfMoives<=6 {}
        //step 1.1) findMovie ();
        //step 1.2) load ajax with template literals adding imdbId, apiKey,
        //step 1.3) within (.then function data), create if statement:
            //step 1.3.1) if type === movie && county === USA (REMINDER TO CONSIDER RATING IN V 1.2)
            //step 1.3.2) randomMovie = data
        //step 1.4) renderData()
        //step 1.5) numberOfMovies += 1
}

function renderData (){
    // const html = randomMovie.map(function(launch){
    //     return `
    //         <article class="card">
    //             <div class="container">
    //                 <div class="col-1">
    //                     <h1 id="content">Movie Title</h1>
    //                     <p id="content">Year Released</p>
    //                     <p id="content">Rating</p>
    //                 </div>
    //                 <div class="col-2">
    //                     <img id="poster" src="" alt="">
    //                 </div>
    //             </div>
    //         </article>
    //     `;
    // })
    // $movies.append(html);
    //randomId = "";
}



// // constant Variables - data that never changes
// const BASE_URL = 'https://api.spacexdata.com/v3/launches';

// // state variables - data that changes
// let launches; 

// // cached element references - parts of the dom we need to touch
// const $launches = $('#launches');

// //event listeners - capture and respond to events

// //functions -  code that represents actions taken
// init ();

// function init (){
//     getData();
// }

// function getData(){
//     $.ajax(BASE_URL + '?limit=12')
//         .then(function (data){
//             launches = data;
//             render();
//         }, function(error){
//             console.log(error);
//         });
// }

// function render () {
//     const html = launches.map(function(launch){
//         return `
//             <article class="card">
//                 <h1>${launch.mission_name}</h1>
//                 <p>${launch.launch_year}</p>
//             </article>
//         `;
//     })
//     $launches.append(html);
// }