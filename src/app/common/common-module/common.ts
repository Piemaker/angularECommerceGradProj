export const categories: string[] = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
];

// to correctly render the stars
export const getRatingArr = (rating: number): number[] => {
  let ratingArr = [];
  for (let i = 0; i < 5; i++) {
    let ratingValue = rating;
    rating -= 1;
    ratingArr.push(rating);
  }
  return ratingArr;
};

// export const deepCopy = (obj: any): any => {
//   var copy;

//   // Handle the 3 simple types, and null or undefined
//   if (null == obj || 'object' != typeof obj) return obj;

//   // Handle Date
//   if (obj instanceof Date) {
//     copy = new Date();
//     copy.setTime(obj.getTime());
//     return copy;
//   }

//   // Handle Array
//   if (obj instanceof Array) {
//     copy = [];
//     for (var i = 0, len = obj.length; i < len; i++) {
//       copy[i] = deepCopy(obj[i]);
//     }
//     return copy;
//   }

//   // Handle Object
//   if (obj instanceof Object) {
//     copy = {};
//     for (var attr in obj) {
//       if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
//     }
//     return copy;
//   }

//   throw new Error("Unable to copy obj! Its type isn't supported.");
// };
