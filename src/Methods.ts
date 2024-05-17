import cheerio from "cheerio"

class Methods {
    public baseURL = "https://aniwave.to"

    protected getSubtitles(sd: any){
        let $ = cheerio.load(sd.html())
        const sub = parseInt($(".ep-status.sub > span").text().trim())
        return sub || 1
    }
        
    protected getDubtitles(sd: any){
        let $ = cheerio.load(sd.html())
        const dub = parseInt($(".ep-status.dub > span").text().trim())
        return dub || 1
    }
    
    protected getTotal(sd: any){
        let $ = cheerio.load(sd.html())
        const total = parseInt($(".ep-status.total > span").text().trim())
        return total || 1
    }

    protected getItems(animes: any, elem: any){
        let $ = cheerio.load(elem)

        animes.push({
            title: `${$(elem).find(".inner > .info > .b1 > a.name.d-title, .info > a.name.d-title, .inner > .info > div.name.d-title").text()}`,
            jptitle: `${$(elem).find(".inner > .info > .b1 > a.name.d-title, .info > a.name.d-title, .inner > .info > div.name.d-title").attr("data-jp")}` || `${$(elem).find(".inner > .info > .b1 > a.name.d-title, .info > a.name.d-title, .inner > .info > div.name.d-title").text()}`,
            url: `${this.baseURL}${$(elem).find(".inner > .info > .b1 > a.name.d-title, .info > a.name.d-title").attr("href") || $(elem).attr("href")}`,
            poster: `${$(elem).find(".ani.poster > a > img, .inner > .poster > span > img").attr("src")?.replace(/@100(?=\.jpg)/gi, "")}`, // done
            total_episodes: (() => {
                const sd = $(elem).find(".ani.poster > a > .meta > .inner > .left, .inner > .info > div.meta > span.ep-wrap.dot") // not done

                const sub = $(sd).find(".ep-status").hasClass("sub") ? this.getSubtitles(sd) : 0
                // dubtitles LMAOOOOOO
                const dub = $(sd).find(".ep-status").hasClass("dub") ? this.getDubtitles(sd) : 0
                
                // either sub or dub or 0 if no episodes
                const total = $(sd).find(".ep-status").hasClass("total") ? this.getTotal(sd) : sub || dub || 0
    
                return {sub: sub, dub: dub, total: total}
            })(),
            type: `${$(elem).find(".ani.poster > a > .meta > .inner > .right, .inner > .info > div.meta > span[class='dot']").text()}`
        })
    }



    protected getAnimeMeta(anime: any, container: any): void {
        const $ = cheerio.load(container.html())
        // const spen = "span:not([itemprop]):not([class])"             // i wanted to use this somewhere but i forgor

        anime.meta = {
            title: `${$(".info > .title.d-title").text()}`,
            jptitle: `${$(".info > .title.d-title").attr("data-jp")}`,
            names: $(".info > .names").text().split(";").map((e) => e.trim()),
            description: `${$(".info > .synopsis > .shorting > .content").text()}`,
            poster: `${$(".poster > span > img").attr("src")}`,
            aired: {}
        }

        
        $(".info > .bmeta > .meta").each((_m, meta) => {
            $(meta).find("div").each((_d, div) => {
                const metaVar = $(div).text().split(/:(.*)/)[0].toLowerCase().trim().replace(/\s+/g, "_")
                const metaVal = metaVar === "genres" || metaVar === "producers" ? $(div).text().split(/:(.*)/)[1].split(",").map((e) => e.trim()) : (metaVar === "episodes" ? parseInt($(div).text().split(/:(.*)/)[1].trim()) : $(div).text().split(/:(.*)/)[1].trim())
                // translation -> • if genres + producers then make array else if episodes then make array too else dont
                
                if(["premiered", "date_aired", "broadcast", "status"].includes(metaVar)) anime.meta.aired[`${metaVar}`] = metaVal
                else anime.meta[`${metaVar}`] = metaVal
            })
        })
    }



    protected getAnimeRelated(anime: any, container: any): void{
        const $ = cheerio.load(container.html())
        anime.related = []

        // i think it is very clear that im high on air at this point. this thing prolly gon break in no time
        container.container = [".inner > .scaff.side.items > .item", ".inner > .info"]
        $("div.tab-content").each((_e, elem) => {
            $(elem).find(container.container[0]).each((_i, item) => {
                anime.related.push({
                    relation: $(item).find(`${container.container[1]} > .relation`).text().trim(),
                    title: $(item).find(`${container.container[1]} > .name.d-title`).text().trim(),
                    jptitle: $(item).find(`${container.container[1]} > .name.d-title`).attr("data-jp")?.trim() || $(item).find(`${container.container[1]} > .name.d-title`).text().trim(),
                    poster: $(item).find(".inner > .poster > span img").attr("src")?.replace(/@100(?=\.jpg)/gi, ""),
                    url: `${this.baseURL}${$(item).attr("href")}`,
                    type: $(item).find(`${container.container[1]} > .meta > span`).eq(0).text().trim(),
                    plays: $(item).find(`${container.container[1]} > .meta > span`).eq(1).text().trim(),
                    bookmarks: $(item).find(`${container.container[1]} > .meta > span`).eq(2).text().trim(),
                })
            })
        })
    }
}

export default Methods