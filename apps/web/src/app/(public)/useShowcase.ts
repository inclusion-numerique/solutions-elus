import { RefObject, useRef, useState } from 'react'
import { isBrowser } from '@sde/web/utils/isBrowser'

// Index of last leftmost card needed to see all cards
const getMaxIndex = ({
  count,
  containerWidth,
  cardTotalWidth,
}: {
  count: number
  containerWidth: number
  cardTotalWidth: number
}) => {
  const numberOfDisplayableCards = Math.ceil(containerWidth / cardTotalWidth)
  const maxIndex = count - numberOfDisplayableCards + 1
  // Can display all cards
  if (maxIndex > count - 1) {
    return count - 1
  }

  // Display at least one card
  if (maxIndex < 0) {
    return 0
  }

  return maxIndex
}

const getSizesFromDom = ({
  firstCardRef,
  containerRef,
}: {
  firstCardRef: RefObject<HTMLAnchorElement>
  containerRef: RefObject<HTMLDivElement>
}) => {
  const containerElement = containerRef.current
  const firstCardElement = firstCardRef.current
  // Should not happen, including for type safety
  if (!containerElement || !firstCardElement || !isBrowser) {
    return null
  }

  const containerWidth = containerElement.getBoundingClientRect().width
  const cardWidth = firstCardElement.getBoundingClientRect().width
  const cardSpacing = Number.parseFloat(
    window.getComputedStyle(firstCardElement).marginRight,
  )
  const cardTotalWidth = cardWidth + cardSpacing

  return {
    containerWidth,
    cardWidth,
    cardSpacing,
    cardTotalWidth,
  }
}

// Distance to container right edge of last card when max index is selected
const getOvershoot = ({
  containerWidth,
  cardTotalWidth,
}: {
  containerWidth: number
  cardTotalWidth: number
}) => containerWidth % cardTotalWidth

/**
 * Horizontal display of X cards.
 * All cards are expected to have exactly the same width
 */
export const useShowcase = ({ count }: { count: number }) => {
  const [current, setCurrent] = useState(0)
  const [offset, setOffset] = useState(0)

  const offsetString = `-${offset}px`

  const firstCardRef = useRef<HTMLAnchorElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const next = () => {
    const sizes = getSizesFromDom({ firstCardRef, containerRef })

    if (!sizes) {
      return
    }

    const { containerWidth, cardSpacing, cardTotalWidth } = sizes

    const nextIndex = (current + 1) % count
    const nextOffset = nextIndex * cardTotalWidth

    // We want the last element to be at maximum stuck to the right edge of the container
    const maxIndex = getMaxIndex({
      count,
      cardTotalWidth,
      containerWidth,
    })

    // If the last item is already inside the container, we go back to first item
    if (nextIndex > maxIndex) {
      setCurrent(0)
      setOffset(0)
      return
    }

    if (nextIndex === maxIndex) {
      // The last item will overshoot
      // we correct the offset so it will stick to right edge of container
      // We add a right padding of {spacing}

      setCurrent(nextIndex)
      setOffset(
        nextOffset +
          cardSpacing -
          getOvershoot({ containerWidth, cardTotalWidth }),
      )
      return
    }
    setCurrent(nextIndex)
    setOffset(nextOffset)
  }

  const previous = () => {
    const nextIndex = current - 1

    // Go back to start if we are at last index
    if (nextIndex >= count) {
      setCurrent(0)
      setOffset(0)
      return
    }
    const sizes = getSizesFromDom({ firstCardRef, containerRef })

    if (!sizes) {
      return
    }

    const { containerWidth, cardSpacing, cardTotalWidth } = sizes
    const nextOffset = nextIndex * cardTotalWidth

    if (nextIndex >= 0) {
      setCurrent(nextIndex)
      setOffset(nextOffset)
      return
    }

    // We want to go back to the last index where all cards are displayed
    const maxIndex = getMaxIndex({
      count,
      cardTotalWidth,
      containerWidth,
    })

    // The last item will overshoot
    // we correct the offset so it will stick to right edge of container
    // We add a right padding of {spacing}

    setCurrent(maxIndex)
    setOffset(
      maxIndex * cardTotalWidth +
        cardSpacing -
        getOvershoot({ containerWidth, cardTotalWidth }),
    )
  }

  return {
    current,
    offset,
    offsetString,
    firstCardRef,
    containerRef,
    previous,
    next,
  }
}
