import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { memoryArticle } from './memoryArticleInfo'

const articlePath = '/writing/why-do-we-need-so-much-memory-anyway'
const articleTitle = 'Why do we need so much memory, anyway?'

async function renderArticle(pathname = articlePath) {
  render(<App pathname={pathname} />)
  await screen.findByRole('heading', { level: 1, name: articleTitle })
  return screen.getByRole('article')
}

describe('the memory article', () => {
  it('opens and leaves the article without discarding the gallery or reloading the document', async () => {
    render(<App />)
    const gallery = screen.getByRole('region', { name: 'Art and references' })
    const photo = gallery.querySelector('img')
    fireEvent.click(screen.getByRole('link', { name: 'Writing' }))
    fireEvent.click(screen.getByRole('link', { name: articleTitle }))

    const article = await screen.findByRole('article')
    expect(window.location.pathname).toBe(articlePath)
    expect(screen.queryByRole('region', { name: 'Art and references' })).not.toBeInTheDocument()
    expect(gallery).toBeInTheDocument()
    expect(gallery.closest('main')).toHaveAttribute('inert')
    expect(screen.getAllByRole('main')).toHaveLength(1)
    expect(document.querySelectorAll('#main')).toHaveLength(1)
    expect(within(article).getByRole('heading', { level: 1 })).toHaveFocus()

    fireEvent.click(within(article).getByRole('link', { name: 'ahtar.dev' }))
    expect(window.location.pathname).toBe('/')
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Art and references' })).toBe(gallery)
    expect(gallery.querySelector('img')).toBe(photo)
    expect(screen.getByRole('heading', { level: 1, name: 'Nima Kamali' })).toHaveFocus()
  })

  it('replaces the Writing placeholder with the article title and local page link', () => {
    render(<App pathname="/writing" />)

    const link = screen.getByRole('link', { name: articleTitle })
    expect(link).toHaveAttribute('href', articlePath)
    expect(link.closest('li')).toBeInTheDocument()
    expect(screen.queryByText('A recent piece')).not.toBeInTheDocument()
    expect(memoryArticle.path).toBe(articlePath)
  })

  it.each([articlePath, `${articlePath}/`])('opens %s directly as an article', async (pathname) => {
    const article = await renderArticle(pathname)

    expect(within(article).getByText('A (not so) quick primer on the inference ecosystem')).toBeVisible()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Art and references' })).not.toBeInTheDocument()
    expect(document.title).toContain(articleTitle)
    expect(screen.queryByText('Wireframe to come.')).not.toBeInTheDocument()
    expect(article).toHaveTextContent('For regular deployments, the question is whether local models become capable enough that avoiding network delays and recurring cloud costs outweighs access to a larger remote model.')
  })

  it('retains the sixteen source figures in order with their original aspect ratios and alt text', async () => {
    const article = await renderArticle()
    const figures = Array.from(article.querySelectorAll('figure img'))
    const sourceDimensions = [
      [1200, 821], [1400, 715], [1279, 720], [1456, 630],
      [950, 447], [950, 447], [1175, 702], [1101, 524],
      [908, 783], [1262, 1600], [1116, 1126], [928, 1328],
      [1456, 971], [423, 119], [960, 720], [2048, 1536],
    ]

    expect(figures).toHaveLength(16)
    expect(figures.map((figure) => [
      Number(figure.getAttribute('width')),
      Number(figure.getAttribute('height')),
    ])).toEqual(sourceDimensions)
    expect(figures.map((figure) => figure.getAttribute('src')?.split('/').pop()))
      .toEqual(sourceDimensions.map((_, index) => `image${index + 1}.png`))
    for (const figure of figures) expect(figure.getAttribute('alt')?.trim()).toBeTruthy()
  })

  it('preserves nested memory lists, numbered inference steps, and linked sources', async () => {
    const article = await renderArticle()
    const memoryDetail = within(article).getByText('This doesn’t work in regular DDR because of issues with heat and smaller bus widths')
    expect(memoryDetail.closest('ul ul ul')).not.toBeNull()
    expect(Array.from(article.querySelectorAll('strong'), (span) => span.textContent)).toEqual([
      'Static Random-Access Memory (SRAM):',
      'Dynamic Random-Access Memory (DRAM):',
      'Prefill:',
      'Decode:',
    ])

    const prefill = within(article).getByText('Prefill:').closest('li')
    const decode = within(article).getByText('Decode:').closest('li')
    expect(prefill?.parentElement?.tagName).toBe('OL')
    expect(decode?.parentElement).toBe(prefill?.parentElement)

    expect(within(article).getByRole('link', { name: 'Majestic Labs' }))
      .toHaveAttribute('href', 'https://majestic-labs.ai/')
    expect(within(article).getByRole('link', { name: 'ANYbotics' }))
      .toHaveAttribute('href', 'https://www.anybotics.com/')
    expect(within(article).getByRole('link', { name: 'View source: The Memory Guy' }))
      .toHaveAttribute('href', 'https://thememoryguy.com/how-high-can-memory-prices-go/')
  })

  it('embeds both videos without autoplay and leaves out publication cards and byline chrome', async () => {
    const article = await renderArticle()
    const videos = Array.from(article.querySelectorAll('iframe'))

    expect(videos).toHaveLength(2)
    expect(videos.map((video) => video.getAttribute('src'))).toEqual([
      'https://www.youtube-nocookie.com/embed/ENkuf_2zbkc',
      'https://www.youtube-nocookie.com/embed/B8O3pLcX2w4',
    ])
    expect(videos[0]).toHaveAttribute('title', 'The Engineering Behind LLM Inference: The Memory Wall')
    expect(videos[1]).toHaveAttribute('title', 'Why Positron AI is Choosing LPDDR over HBM for Next-Gen LLM | Researcher Conversations at GTC')
    for (const video of videos) expect(video).not.toHaveAttribute('autoplay')
    expect(within(article).queryByRole('complementary')).not.toBeInTheDocument()
    expect(within(article).queryByText('THETECHBRUIN')).not.toBeInTheDocument()
    const date = within(article).getByText('September 20, 2026')
    expect(date).toHaveAttribute('datetime', '2026-09-20')
    expect(article.querySelector('h1')?.nextElementSibling).toContainElement(date)
    expect(within(article).getAllByRole('img')).toHaveLength(16)
  })

  it.each(['/writing/not-a-post', `${articlePath}/extra`])('does not treat %s as the article route', (pathname) => {
    render(<App pathname={pathname} />)

    expect(screen.getByText('Page not found.')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: articleTitle })).not.toBeInTheDocument()
  })
})
