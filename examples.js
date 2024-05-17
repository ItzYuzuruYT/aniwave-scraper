const AniwaveScraper = require("./index").default
const aniwave = new AniwaveScraper

const name = "solo leveling"

aniwave.animeSearch(name).then((animes) => {
    console.log(`There are ${animes.length} results for ${name}`)
    console.log(animes)

    console.log(`result 1 = ${animes[0].title}`)
    console.log(`episodes = ${animes[0].total_episodes.total}`)
    console.log(`result 2 = ${animes[1].title}`)
    console.log(`episodes = ${animes[1].total_episodes.total}`)
})



// aniwave.recentRelease("china", 5).then((animes) => {
//     console.log(animes)
// })




// aniwave.topAnime("day").then((animes) => {
//     console.log(animes)
// })

// aniwave.topAnime("week").then((animes) => {
//     console.log(animes)
// })

// aniwave.topAnime("month").then((animes) => {
//     console.log(animes)
// })




// aniwave.animeInfo("https://aniwave.to/watch/solo-leveling.3rpv2").then((anime) => {
//     console.log(anime)
// })



// aniwave.animeSearch(name).then((animes) => {
//     aniwave.animeInfo(animes[0].url).then((anime) => {
//         console.log(anime)
//     })
// })