const AniwaveScraper = require("./index").default
const aniwave = new AniwaveScraper

aniwave.animeSearch("re:zero").then((data) => {
    console.log(data)
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