import HTTP from './http-common'
const serviceMarvel = {}

serviceMarvel.getCharacters = (name,limit, offset) => {
    return HTTP.get('/characters', {
        params: {
            nameStartsWith: name || null,
            orderBy: 'name',
            limit,
            offset
            
        }
    })
    .then(res => {
        return res.data.data
    })
}

serviceMarvel.getComicsByCharacter = (id, limit, offset) => {
    return HTTP.get(`/characters/${id}/comics`, {
        params: {
            limit, offset
        }
    })
    .then(res => {
        return res.data.data
    })
}



serviceMarvel.getComics = (title, format, issueNumber, limit, offset) => {
    return HTTP.get('/comics', {
        params: {
            title: title || null,
            format,
            issueNumber,
            limit,
            offset,
            orderBy: 'focDate',
            
        }
    })
    .then(res => {
        return res.data.data
    })
}




serviceMarvel.getCharactersByComic = (id, limit, offset) => {
    return HTTP.get(`/comics/${id}/characters`, {
        params: {
            limit, offset
        }
    })
    .then(res => {
        return res.data.data
    })
}

serviceMarvel.getComicsByCharacter = (id, limit, offset) => {
    return HTTP.get(`/characters/${id}/comics`, {
        params: {
            limit, offset
        }
    })
    .then(res => {
        return res.data.data
    })
}


serviceMarvel.getStoriesByComic = (id) => {
    return HTTP.get(`/comics/${id}/stories`)
    .then(res => {
        return res.data.data
    })
}
serviceMarvel.getComicByTitle = (title) => {
    return HTTP.get(`/comics`, {
        params: { title }
    })
    .then(res => {
        return res.data.data
    })
}
serviceMarvel.getStoriesByCharacter = (id) => {
    return HTTP.get(`/characters/${id}/stories`)
    .then(res => {
        return res.data.data
    })
}





serviceMarvel.getComicById = (id) => {
    return HTTP.get('/comics', {
        params: {
            id
        }
    })
    .then(res => {
        return res.data.data
    })
}

serviceMarvel.getCharacterById = (id) => {
    return HTTP.get('/characters', {
        params: {
            id
        }
    })
    .then(res => {
        return res.data.data
    })
}


serviceMarvel.getCharactersByIdComic = (id) => {
    return HTTP.get(`/comics/${id}/characters`)
    .then(res => {
        return res.data.data
    })
}

export default serviceMarvel