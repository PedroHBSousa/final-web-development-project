async function getRandomMovie(genre, page) {
  const chosenGenre = genre;
  const randomPageNumber = page;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZmM3ZWNiMGYzOWZhMDc3Y2E1YWIzZjNhZTU2NmFjMCIsInN1YiI6IjY2NWZhZmIxMzU1MjFlZjc4MmI0YTI2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.v68XA_FTrnGRuhqWgdaqieJgz8wI8WqywfEauczlFIs",
    },
  };

  const responsePage = await fetch(
    `https://api.themoviedb.org/3/discover/movie?&with_original_language=en&with_genres=${chosenGenre}&page=${randomPageNumber}`,
    options
  );
  const data = await responsePage.json();
  console.log(data);
  const results = data.results;
  const randomMovie = results[Math.floor(Math.random() * results.length)];
  console.log(randomMovie);
  console.log(results);
}
getRandomMovie(28, 1);
