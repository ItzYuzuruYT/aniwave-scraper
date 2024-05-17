# Aniwave Scraper
aniwave-scraper is a simple npm package that scrapes anime related data from aniwave website

[![NPM](https://nodei.co/npm/aniwave-scraper.png)](https://nodei.co/npm/aniwave-scraper/)


# Installation
```bash
npm install aniwave-scraper
```


# Functions

## # animeInfo (url)
>fetches meta information about a particular anime 

below is the information object structure that is returned

NOTE: some properties may not be returned

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
            },
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
> searches for animes with the specified name and returns a list

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
    },
    type: string
}
```

## # recentRelease (type, page)
> returns list of animes that have been released as of recent

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
    },
    type: string
}
```

accepted parameters

1. **Type**: below are the accepted types
<br>
all / sub / dub / china / trending / random

2. **Page**: page number (1, 2, 3,....)


## # topAnime (duration)
> returns list of top animes of the day, week or month

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
    },
    type: string,
    rank: number
}
```

<br>
accepted parameters

1. **Duration**: day / week / month

<br>
<br>

# Examples
let's look at a couple of examples

tried making it as beginner friendly as possible

### **`Searching for an Anime`**

```js
const AniwaveScraper = require("aniwave-scraper").default
const aniwave = new AniwaveScraper

const name = "solo leveling"

aniwave.animeSearch(name).then((animes) => {
    console.log(`There are ${animes.length} results for ${name}`)
    console.log(animes)
})
```

**example output:**
<br>
some outputs shown here are purseposefully incorrect and only meant for the sake of example. the package **won't** actually return incorrect information

```
There are 2 results for solo leveling
[
  {
    title: 'Solo Leveling',
    jptitle: 'Ore dake Level Up na Ken',
    url: 'https://aniwave.to/watch/solo-leveling',
    poster: 'https://static.aniwave.to/i/b/b1/solo-leveling-poster.jpg',
    total_episodes: { sub: 12, dub: 12, total: 12 },
    type: 'TV'
  },
  {
    title: 'Solo Leveling: How to Get Stronger',
    jptitle: 'Ore dake Level Up na Ken',
    url: 'https://aniwave.to/watch/ore-dake-level-up-na-ken-recap',
    poster: 'https://static.aniwave.to/i/d/d5/solo-leveling-how-to-get-stronger-poster.jpg',
    total_episodes: { sub: 1, dub: 0, total: 1 },
    type: 'SPECIAL'
  }
]
```

then to access the properties

```js
console.log(`result 1 = ${animes[0].title}`)
console.log(`episodes = ${animes[0].total_episodes.total}`)

console.log(`result 2 = ${animes[1].title}`)
console.log(`episodes = ${animes[1].total_episodes.total}`)
```

which would output

```js
result 1 = Solo Leveling
episodes = 12
result 2 = Solo Leveling: How to Get Stronger
episodes = 1
```

> the above example should provide a basic idea so i wont include any more outputs as it's pretty straightforward
<br>
checkout https://github.com/ItzYuzuruYT/aniwave-scraper/blob/main/examples.js for more detailed examples


### **`Fetch Recently Released Animes`**

type : all | sub | dub | china | trending | random

page : 1, 2, 3, 4,....

```js
aniwave.recentRelease("all", 1).then((animes) => {
    console.log(animes)
})
```
another example with **type - china** and **page - 5**

```js
aniwave.recentRelease("china", 5).then((animes) => {
    console.log(animes)
})
```



### **`Fetch Top Ranking Animes`**

duration : day | week | month

returns top anime list of the day
```js
aniwave.topAnime("day").then((animes) => {
    console.log(animes)
})
```

returns top anime list of the week
```js
aniwave.topAnime("week").then((animes) => {
    console.log(animes)
})
```

returns top anime list of the month
```js
aniwave.topAnime("month").then((animes) => {
    console.log(animes)
})
```

<br>

### **`Get details on Specific Anime`**

```js
aniwave.animeInfo("https://aniwave.to/watch/solo-leveling.3rpv2").then((anime) => {
    console.log(anime)
})
```
> animeInfo method returns a ton of metadata properties depending upon the anime being scraped
<br>

do check the `Functions` section above for whole list

<br>

### **`Search Anime + Get Details`**
now let's try `searching for an anime` and then `fetch the data` for one of the results

```js
const name = "Solo Leveling"

aniwave.animeSearch(name).then((animes) => {
    aniwave.animeInfo(animes[0].url).then((anime) => {
        console.log(anime)
    })
})
```

with this we fetch the url of anime on first index of search result and use it to fetch details about that anime

<br>


# Conclusion

Upcoming Changes?

- [x] temporary errors handled
- [ ] more error handling?
- [ ] #getEpisodes function
- [ ] return genres on searchAnime (i got bored and forgor 💀)

I'm not sure how often i'll be updating this or at all even so feel free to pull request on my github if you're interested
<br>
I'll prolly accept as long as it's a meaningful addition

<br>
Thank you for your visit :)
<br>
here cookie 🍪
