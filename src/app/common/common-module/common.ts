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
  }