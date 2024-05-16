import axios from "axios"
import cheerio from "cheerio"
import Methods from "./Methods"

import { items, meta } from "./Interfaces"

const errmsg = ["[ X ] failed to fetch the data", "check whether the anime name or url is valid"]

// interface items {
//     title: string,
//     jptitle: string,
//     url: string,
//     poster: string,
//     total_episodes: {
//         sub: number,
//         dub: number,
//         total: number
//     }
//     type: string,
//     rank?: number
// }[]


// interface meta {
//     title?: string,
//     jptitle?: string,
//     names?: string[],
//     description?: string,
//     poster?: string,
//     aired?: {
//         premiered?: string,
//         date_aired?: string,
//         broadcast?: string,
//         status?: string
//     }
//     type?: string,
//     country?: string,
//     genres?: string[],
//     mal?: string,
//     duration?: string,
//     episodes?: number,
//     studios?: string,
//     producers?: string[]
// }

class AniwaveScraper extends Methods {
    async animeSearch(query: string): Promise<items[]> {
        let searchURL = `${this.baseURL}/filter?keyword=${encodeURIComponent(query).replace(/%20/g, "+")}`
        return new Promise((resolve, _reject) => {
            axios({
                url: searchURL,
                method: "GET",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
                }
            }).then((res) => {
                let $ = cheerio.load(res.data)
                let animes: items[] = []

                $("body").find(".aside-wrapper.mt-5 > .main > section > .body").find("#list-items > .item").each((_i, elem) => this.getItems(animes, elem));

                resolve(animes)
            }).catch(() => {
                return console.error(errmsg.join(". "))
            })
        })
    }




    async recentRelease(type: "all" | "sub" | "dub" | "china" | "trending" | "random" = "all", page: number = 1): Promise<items[]> {
        const recentURL = (type === "trending" || type === "random") ? `${this.baseURL}/ajax/home/widget/${type}?page=${page}` : `${this.baseURL}/ajax/home/widget/updated-${type}?page=${page}`

        return new Promise((resolve, _reject) => {
            axios({
                url: recentURL,
                method: "GET",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
                }
            }).then((res) => {
                let $ = cheerio.load(res.data.result)
                let animes: items[] = []
                
                $(".ani.items > .item").each((_i, elem) => {
                    this.getItems(animes, elem)
                })

                resolve(animes)
            }).catch(() => {
                return console.error(errmsg[0])
            })
        })
    }



    async topAnime(duration: "day" | "week" | "month" = "day"): Promise<items[]> {
        const topURL = `${this.baseURL}/home`

        return new Promise((resolve, _reject) => {
            axios({
                url: topURL,
                method: "GET",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
                }
            }).then((res) => {
                const $ = cheerio.load(res.data)
                const wrapper = $(`.home > #wrapper > #body > .container`).find(`.sidebar > #top-anime > .body > div[data-name="${duration}"] > .scaff.side.items`)
                let animes: items[] = []
    
                $(wrapper).find(".item").each((i, elem) => {
                    this.getItems(animes, elem)
                    animes[i].rank = (i+1)
                })
    
                resolve(animes)
            }).catch(() => {
                return console.error(errmsg[0])
            })
        })
    }



    async animeInfo(url: string): Promise<meta> {
        return new Promise((resolve, _reject) => {
            axios({
                url: url,
                method: "GET",
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
                }
            }).then((res) => {
                let $ = cheerio.load(res.data)
                // const errPage = $("body").find(".error-page").hasClass("error-page")
                // console.log(errPage)
                // if(errPage) reject(errmsg)

                const metaContainer = $("#body").find(".aside-wrapper > .main > #w-info > .binfo")
                const relatedContainer = $("#body").find(".aside-wrapper > .sidebar > #w-related > .body")
                let anime: meta = {}

                this.getAnimeMeta(anime, metaContainer)
                this.getAnimeRelated(anime, relatedContainer)

                resolve(anime)
            }).catch(() => {
                return console.error(errmsg.join(". "))
            })

        })
    }
}

export default AniwaveScraper