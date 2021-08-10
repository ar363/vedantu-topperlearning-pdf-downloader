import cheerio from 'cheerio'
import axios from 'axios'

export default async function handler(req, res) {
  const { url } = req.body

  if (!url) {
    return res.status(400).json({ err: 'no_url' })
  }

  if (url.match(/^http(s?)\:\/\/www\.vedantu\.com(.*?)$/) === null) {
    return res.status(400).json({ err: 'invalid_url' })
  }

  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    return res.json({
      'pdfs': JSON.parse($('#__NEXT_DATA__').html()).props.pageProps.initialState.seo.categoryPage.downloadableLinks
    })
  } catch (e) {
    console.log(e)
    return res.status(404).json({ err: 'unknown', detail: e })
  }
}
  