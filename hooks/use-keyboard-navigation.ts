"use client"

import { useEffect } from "react"

export function useKeyboardNavigation(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    // Trap focus within modal
    const modal = document.querySelector('[role="dialog"]')
    if (!modal) return

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    const firstElement = focusableElements?.[0] as HTMLElement
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keydown", handleTabKey)

    // Focus first element when modal opens
    setTimeout(() => {
      firstElement?.focus()
    }, 100)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keydown", handleTabKey)
    }
  }, [isOpen, onClose])
}
