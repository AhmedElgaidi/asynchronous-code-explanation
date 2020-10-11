//==============================================================================================
//==============================================================================================
//===                               The evolution                                            ===
//===        Callbacks => callbacks hell => promises (then, catch) => async & await          ===
//===         XMLHttpRequest => fetch API                                                    ===
//==============================================================================================
//==============================================================================================



// JS is a synchronous language by default (single threaded)
// But most of the time we use it in a an asynchronous form in reall application as we get data from 
// External server(Database, API endpoints, etc...)
// Simply, Async means "Start now and finish later"

// Let's practice
//==================================

// XML object is used to interact with an external server, and retrieve that data and update our page without
// refreshing the page and disturping the user.

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;// because we are in node env not the browser

// put all our code in a func to work with callbacks
const myFunc  = () => {
    // create a request object
    const req = new XMLHttpRequest();// this deals with any kind of data (XML, json, plain text, etc...)

    // we can track the req throuh an event listener with event 'readystatechange'

    req.addEventListener('readystatechange', () => {
        if(req.readyState === 4 && req.status === 200) {// req has 4 states (4) means it's done
            // JSON.parse => turns string to a js object (easily accsible)
            // JSON.stringify => it returns it back to a string;
            console.log(JSON.parse(req.responseText)[9]);
        }else if(req.readyState === 4) {// req is finished but there is a problem a long the way, 
            // the endpoint isn't correct
            console.log('Data not found... \nmay be the endpoint isn\'t right');
        }
    });

    // let's intiate our req obj
    req.open('GET', 'https://jsonplaceholder.typicode.com/posts/');
    req.send() // now send this request
}
// Send my request by running my func.
// myFunc()
//=============================================================== 
// promise example
// promise is that code (function) that takes some time to be finished and it may success or fails
// It either be resolved or rejected
const getSomething = () => {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.addEventListener('readystatechange', () => {
            if(req.readyState === 4 && req.status === 200) {// req has 4 states (4) means it's done
                // JSON.parse => turns string to a js object (easily accsible)
                // JSON.stringify => it returns it back to a string;
                resolve(JSON.parse(req.responseText)[0]);
            }else if(req.readyState === 4) {// req is finished but there is a problem a long the way, 
                // the endpoint isn't correct
                reject('Data not found... \nmay be the endpoint isn\'t right');
            }
        });
        req.open('GET', 'https://jsonplaceholder.typicode.com/todos/')
        req.send();
    })
};
// getSomething()
//     .then(data => {
//         console.log(`promise (1) is resolved: `, data)
//         return
//     })
//     .then(data => {// we made a promise chaining
//         console.log('promise (2) is resolved....')
//     }) 
//     .catch(err => console.log(err));// The good thing is that if there were any errors at any point (promise)
//     // catch method will throw it to us

//=============================
// fetch API
// the problem with fetch api is the rejection happens only if there were a network problem
// not when a request is sent to a false API endpoint.
// But we can solve this by checking the status of the req.
// let's install node-fetch, because fetch api is built in only in the browser
const fetch = require('node-fetch'); // default method is GET
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => {
//         // json() it parses the resonse data, just as we did before JSON.parse()
//         return response.json() // by writing return we avoid the callback hell by returning a promise 
//         // then tackle it with then() method
//     })
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

//=============================
// async & await
// A modern js features for async code
// Used to chain promises in an easy way to maintain and of course with less code
// we use promises in the situation where there aren't many of chaining, otherwise we use async & await 
// to avoid the happing mess in our code
// In some situation, we can use both of them together 

const getMeSomething = async () => { // async converts synchronous to synchronous
    // Do the fetch (which returns a promise), and the await keyword stops assinging the value to the 
    // varialbe untils the promise is resolved
    const response1 = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if(response1.status !== 200) { // because the fetch api only reject in network issues
        throw new Error('Endpoint 1 is mis-typed...');
    }
    const data1 = await response1.json();
    // we can get diffent data in prefered order ( making blocking code in a non-blocking code)
    const response2 = await fetch('https://jsonplaceholder.typicode.com/todos/2');
    if(response2.status !== 200) { // because the fetch api only reject in network issues
        throw new Error('Endipoint 2 is mis-typed...');
    }
    const data2 = await response2.json();
    const response3 = await fetch('https://jsonplaceholder.typicode.com/todos/3');
    if(response3.status !== 200) { // because the fetch api only reject in network issues
        throw new Error('Endpoint 3 is mis-typed...');
    }
    const data3 = await response3.json();

    return {data1, data2, data3};
};
getMeSomething()
    .then(({data1, data2, data3}) => {
        console.log(data1, '\n', data2, '\n', data3);
    })
    .catch(err => console.log(err.message));




