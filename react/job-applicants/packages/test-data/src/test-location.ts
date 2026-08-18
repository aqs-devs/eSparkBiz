// // import { randomLocation } from './factories/location.js';

// // const location = await randomLocation();

// // console.dir(location, {
// //     depth: null,
// // });


// import { randomLocation } from './factories/location.js';

// for (let index = 0; index < 10; index++) {
//     console.log(await randomLocation());
// }

import { randomLocation } from './factories/location.js';

for (let index = 0; index < 20; index++) {
    console.log(await randomLocation());
}