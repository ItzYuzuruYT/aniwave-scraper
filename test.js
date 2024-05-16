const AniwaveScraper = require("./index").default
const aniwave = new AniwaveScraper

const name = "solo leveling"

aniwave.animeSearch(name).then((data) => {
    console.log(`There are ${data.length} results for ${name}`)
    console.log(data)

    console.log(`Anime Name: ${data[0].title}`)
    console.log(`Episodes: ${data[0].total_episodes.total}`)
    console.log(`Link: ${data[0].url}`)
})

// aniwave.recentRelease("china", 1).then((data) => {
//     console.log(data)
// })

// aniwave.topAnime("month").then((data) => {
//     console.log(data)
// })

// aniwave.animeInfo("https://aniwave.to/watch/attack-on-titan-the-roar-of-awakening.wpx4").then((data) => {
//     console.log(data)
// })

// aniwave.animeInfo("https://aniwave.to/watch/solo-leveling.3rpv2").then((data) => {
//     console.log(data)
// })

// aniwave.animeInfo("https://aniwave.to/watch/doraemon.r09o").then((data) => {
//     console.log(data.meta?.title)
// })

// aniwave.animeInfo("https://aniwave.to/watch/attack-on-titan.kww/ep-1").then((data) => {
//     console.log(data)
// })