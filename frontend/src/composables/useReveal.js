import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
  let observer = null

  onMounted(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    const revealItems = document.querySelectorAll('.reveal')

    if (
      prefersReducedMotion ||
      !('IntersectionObserver' in window)
    ) {
      revealItems.forEach((item) => {
        item.classList.add('visible')
      })

      return
    }

    observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -70px',
        threshold: 0.08
      }
    )

    revealItems.forEach((item) => {
      observer.observe(item)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}