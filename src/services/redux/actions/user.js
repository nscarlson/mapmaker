function fetchSession(subreddit) {
    return dispatch => {
        dispatch(requestPosts(subreddit))

        return fetch(`//api/v1/`)
            .then(response => response.json())
            .then(json => dispatch(
                receivePosts(subreddit, json)
            ))
    }
}
