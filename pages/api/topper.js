import cheerio from 'cheerio'
import axios from 'axios'

export default async function handler(req, res) {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({ err: 'no_url' })
  }

  if (url.match(/^http(s?)\:\/\/www\.topperlearning\.com(.*?)$/) === null) {
    return res.status(400).json({ err: 'invalid_url' })
  }

  try {
    const { data } = await axios.get(url)
    // console.log(data)
    const $ = cheerio.load(data)
    let urls = []
    
    $('.tabCont iframe').each((i, el) => {
      urls.push($(el).attr('src').match(/^https\:\/\/mozilla\.github\.io\/pdf\.js\/web\/viewer\.html\?file=(.*)$/)[1])
    })

    return res.status(200).json({ pdfs: urls })
  } catch (e) {
    console.log(e)
    return res.status(404).json({ err: 'unknown', detail: e })
  }
}
  