import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { galleryImages } from './gallery-images'
import './gallery.css'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

export default function GalleryCarousel() {
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(
    () => window.matchMedia?.(reducedMotionQuery).matches ?? false,
  )
  const autoplay = useMemo(() => Autoplay({
    delay: 20_000,
    playOnInit: !paused,
    stopOnInteraction: paused,
    stopOnMouseEnter: !paused,
    stopOnFocusIn: true,
  }), [paused])
  const [mainRef, mainApi] = useEmblaCarousel({
    loop: true,
    duration: 28,
    breakpoints: { [reducedMotionQuery]: { duration: 0 } },
  }, [autoplay])
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    align: 'start',
    breakpoints: { [reducedMotionQuery]: { duration: 0 } },
  })

  useEffect(() => {
    if (!mainApi) return
    const syncSelection = () => {
      const index = mainApi.selectedScrollSnap()
      setSelected(index)
      thumbsApi?.scrollTo(index)
    }
    mainApi.on('select', syncSelection).on('reInit', syncSelection)
    return () => {
      mainApi.off('select', syncSelection).off('reInit', syncSelection)
    }
  }, [mainApi, thumbsApi])

  useEffect(() => {
    const preference = window.matchMedia?.(reducedMotionQuery)
    if (!preference) return
    const respectPreference = (event: MediaQueryListEvent) => {
      if (event.matches) setPaused(true)
    }
    preference.addEventListener('change', respectPreference)
    return () => preference.removeEventListener('change', respectPreference)
  }, [])

  const selectImage = (index: number) => {
    mainApi?.scrollTo(index)
    autoplay.reset()
  }

  const previousImage = () => {
    mainApi?.scrollPrev()
    autoplay.reset()
  }

  const nextImage = () => {
    mainApi?.scrollNext()
    autoplay.reset()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    let index: number
    switch (event.key) {
      case 'ArrowLeft': index = (selected + galleryImages.length - 1) % galleryImages.length; break
      case 'ArrowRight': index = (selected + 1) % galleryImages.length; break
      case 'Home': index = 0; break
      case 'End': index = galleryImages.length - 1; break
      default: return
    }
    event.preventDefault()
    selectImage(index)
    if ((event.target as HTMLElement).closest('.gallery-thumb')) {
      thumbsApi?.slideNodes()[index]?.querySelector('button')?.focus({ preventScroll: true })
    }
  }

  const nextIndex = (selected + 1) % galleryImages.length

  return (
    <figure
      className="art-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Art and references"
      onKeyDown={onKeyDown}
      onFocusCapture={(event) => {
        if (
          event.target.matches(':focus-visible') &&
          !event.target.closest('.gallery-toggle')
        ) setPaused(true)
      }}
    >
      <div
        className="gallery-viewport"
        ref={mainRef}
        tabIndex={0}
        role="group"
        aria-label="Image viewer. Use the left and right arrow keys to browse."
      >
        <div className="gallery-track">
          {galleryImages.map((item, index) => (
            <div
              className="gallery-slide"
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${galleryImages.length}`}
              aria-hidden={index !== selected}
            >
              <img
                src={item.src}
                width={item.width}
                height={item.height}
                alt={item.alt}
                style={{ objectPosition: item.objectPosition }}
                loading={index === selected || index === nextIndex ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="gallery-toolbar">
        <button type="button" aria-label="Previous image" onClick={previousImage}>←</button>
        <span className="gallery-counter" aria-hidden="true">
          {String(selected + 1).padStart(2, '0')} / {galleryImages.length}
        </span>
        <button
          type="button"
          className="gallery-toggle"
          aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>
        </button>
        <button type="button" aria-label="Next image" onClick={nextImage}>→</button>
      </div>

      <div className="gallery-thumbs" ref={thumbsRef} aria-label="Choose an image">
        <div className="gallery-thumbs-track">
          {galleryImages.map((item, index) => (
            <div className="gallery-thumb-slide" key={item.id}>
              <button
                type="button"
                className={`gallery-thumb${index === nextIndex ? ' gallery-thumb-next' : ''}`}
                aria-label={`Show ${index + 1}: ${item.caption}`}
                aria-current={index === selected ? 'true' : undefined}
                tabIndex={index === selected ? 0 : -1}
                onClick={() => selectImage(index)}
              >
                <img
                  src={item.thumbnail}
                  width={item.width}
                  height={item.height}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <figcaption className="gallery-caption" aria-live={paused ? 'polite' : 'off'}>
        {galleryImages[selected].caption}
      </figcaption>
    </figure>
  )
}
