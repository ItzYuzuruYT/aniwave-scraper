interface items {
    title: string,
    jptitle: string,
    url: string,
    poster: string,
    total_episodes: {
        sub: number,
        dub: number,
        total: number
    }
    type: string,
    rank?: number
}[]


interface meta {
    meta?: {
        title?: string,
        jptitle?: string,
        names?: string[],
        description?: string,
        poster?: string,
        aired?: {
            premiered?: string,
            date_aired?: string,
            broadcast?: string,
            status?: string
        }
        type?: string,
        country?: string,
        genres?: string[],
        mal?: string,
        duration?: string,
        episodes?: number,
        studios?: string,
        producers?: string[]
    },
    related?: {
        relation?: string,
        title?: string,
        jptitle?: string,
        poster?: string,
        url?: string,
        type?: string,
        plays?: string,
        bookmarks?: string
    }[]
}


export { items, meta }