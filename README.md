# Aniwave Scraper
aniwave-scraper is a simple npm package that scrapes anime related data from [aniwave](https://aniwave.to) website

[![NPM](https://nodei.co/npm/aniwave-scraper.png)](https://nodei.co/npm/aniwave-scraper/)


# Installation
```bash
npm install aniwave-scraper
```


# Functions

## # animeInfo (url) 
fetches meta information about a particular anime 
<br>
below is the information object structure that is returned
<br>
`NOTE: some properties may not be returned`

```js
{
    meta: {
            title: string,
            jptitle: string,
            names: string[],
            description: string,
            poster: string,
            aired: {
                premiered: string,
                date_aired: string,
                broadcast: string,
                status: string
            }
            type: string,
            country: string,
            genres: string[],
            mal: string,
            duration: string,
            episodes: number,
            studios: string,
            producers: string[]
    },
    related: {
        relation: string,
        title: string,
        jptitle: string,
        poster: string,
        url: string,
        type: string,
        plays: string,
        bookmarks: string
    }
}
```

## # animeSearch (name)
searches for animes with the specified name and returns a list
<br>
below are the accessible properties for every item that exists in the list

```js
{
    title: string,
    jptitle: string,
    url: string,
    poster: string,
    total_episodes: {
        sub: number,
        dub: number,
        total: number
    }
    type: string
}
```

## # recentRelease (type, page)
returns list of animes that have been released as of recent
<br>
list structure is same as `animeSearch`
<br>
accepted parameters

1. **Type**: below are the accepted types
<br>
all / sub / dub / china / trending / random

2. **Page**: page number (1, 2, 3,....)


## # topAnime (duration)
returns list of top animes of the day, week or month
<br>
accepted parameters

1. **Duration**: day / week / month

<br>
<br>

# Examples
let's look at a couple of examples
<br>
beginners especially love this part :\)

### **searching for an anime**
```js
const AniwaveScraper = require("aniwave-scraper").default
const aniwave = new AniwaveScraper

const name = "solo leveling"

aniwave.animeSearch(name).then((data) => {
    console.log(`There are ${data.length} results for ${name}`)
    console.log(data)

    console.log(`Anime Name: ${data[0].title}`)
    console.log(`Episodes: ${data[0].total_episodes.total}`)
    console.log(`Link: ${data[0].url}`)
})
```