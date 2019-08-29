import config from 'movies/config';

/**
* see the movie db API docs for more details 
* (https://developers.themoviedb.org/3/)
*/
export function GetMovieListUrl(listName, page = 1) {
	return `${config.API_URL}movie/${listName}?
			api_key=${config.API_KEY}&region=CA&page=${page}`;
}

export function GetMovieUrl(movieId) {
    return `${config.API_URL}movie/${movieId}
    		?api_key=${config.API_KEY}&append_to_response=videos,images`;
}

export function GetImageUrl(imagePath) {
	return `${config.IMG_URL}${config.BACKDROP_SIZE}${imagePath}`;
}