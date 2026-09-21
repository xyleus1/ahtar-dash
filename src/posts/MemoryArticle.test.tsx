import { render, screen, within } from '@testing-library/react'
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
    for (const link of screen.getAllByRole('link', { name: 'Writing' })) {
      expect(link).toHaveAttribute('href', '/writing')
    }
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

    const prefill = within(article).getByText('Prefill:').closest('li')
    const decode = within(article).getByText('Decode:').closest('li')
    expect(prefill?.parentElement?.tagName).toBe('OL')
    expect(decode?.parentElement).toBe(prefill?.parentElement)

    expect(within(article).getByRole('link', { name: 'Majestic Labs' }))
      .toHaveAttribute('href', 'https://majestic-labs.ai/')
    expect(within(article).getByRole('link', { name: 'ANYbotics' }))
      .toHaveAttribute('href', 'https://www.anybotics.com/')
    expect(within(article).getByRole('link', { name: 'https://thememoryguy.com/how-high-can-memory-prices-go/' }))
      .toHaveAttribute('href', 'https://thememoryguy.com/how-high-can-memory-prices-go/')
  })

  it.each(['/writing/not-a-post', `${articlePath}/extra`])('does not treat %s as the article route', (pathname) => {
    render(<App pathname={pathname} />)

    expect(screen.getByText('Page not found.')).toBeVisible()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.queryByRole('article')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: articleTitle })).not.toBeInTheDocument()
  })
})
