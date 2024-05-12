function processReview(review: number | boolean): void {
  if(typeof review === "boolean" && !review) {
    console.log("No reviews available")
  } else if(typeof review === "number" && review >= 1 && review <= 5) {
    console.log("The review rates this movie with " + review + " stars")
  } else {
    throw new Error ("This review is not valid.")
  }
}
