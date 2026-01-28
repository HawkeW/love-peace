# Implementation Plan: Lenis-GSAP Synchronization

## Overview

This implementation plan modifies the VideoScrollSection.astro component to detect and synchronize with Lenis smooth scroll library when present, while maintaining backward compatibility with pages that don't use Lenis. The implementation adds Lenis detection and synchronization logic before the existing ScrollTrigger setup.

## Tasks

- [x] 1. Add Lenis detection function
  - Create `detectLenis()` function that checks for `window.lenis`
  - Validate that the detected object has required methods (`on`, `raf`)
  - Return the Lenis instance or null
  - Add console logging for detection result
  - _Requirements: 1.1, 2.4_

- [ ]* 1.1 Write property test for Lenis detection
  - **Property 1: Lenis Detection Accuracy**
  - **Validates: Requirements 1.1**

- [x] 2. Add Lenis synchronization function
  - Create `setupLenisSync(lenis)` function
  - Implement scroll event binding: `lenis.on('scroll', ScrollTrigger.update)`
  - Implement ticker integration: `gsap.ticker.add((time) => lenis.raf(time * 1000))`
  - Implement lag smoothing disable: `gsap.ticker.lagSmoothing(0)`
  - Add console logging for sync status
  - Wrap in try-catch for error handling
  - _Requirements: 1.2, 1.3, 1.4, 5.2_

- [ ]* 2.1 Write property test for Lenis synchronization
  - **Property 2: Lenis Synchronization Completeness**
  - **Validates: Requirements 1.2, 1.3, 1.4**

- [x] 3. Integrate Lenis detection into initialization flow
  - Call `detectLenis()` at the start of `initVideoScroll()`
  - Store the result in a variable
  - Add conditional logic to call `setupLenisSync()` if Lenis is detected
  - Ensure initialization continues normally if Lenis is not detected
  - _Requirements: 1.1, 1.5, 2.1_

- [ ]* 3.1 Write property test for backward compatibility
  - **Property 3: Backward Compatibility Preservation**
  - **Validates: Requirements 1.5, 2.1, 2.2, 2.4**

- [x] 4. Checkpoint - Test basic integration
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Add error handling for synchronization
  - Wrap `setupLenisSync()` call in try-catch
  - Log errors with clear error prefix
  - Ensure component continues to function if sync fails
  - Add fallback to native scroll on sync failure
  - _Requirements: 5.2, 5.4, 5.5_

- [ ]* 5.1 Write property test for error handling
  - **Property 8: Error Handling Isolation**
  - **Validates: Requirements 5.3, 5.4, 5.5**

- [x] 6. Enhance logging for debugging
  - Add log for Lenis detection result (found/not found)
  - Add log for sync configuration start
  - Add log for sync configuration complete
  - Use emoji prefixes for easy identification (🔍, 🔗, ✅, ❌)
  - Ensure logs are clear and helpful for debugging
  - _Requirements: 5.1, 5.2_

- [ ]* 6.1 Write unit tests for logging
  - Test that detection logs are output
  - Test that sync logs are output
  - Test that error logs are output
  - _Requirements: 5.1, 5.2_

- [x] 7. Verify existing functionality is preserved
  - Ensure video initialization logic is unchanged
  - Ensure ScrollTrigger configuration is unchanged
  - Ensure all existing props (scrollDistance, scrubSpeed, showDebug) work
  - Ensure video scrubbing behavior is unchanged
  - Ensure pin/unpin behavior is unchanged
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4_

- [ ]* 7.1 Write property tests for video scrubbing
  - **Property 4: Video Scrubbing Bidirectionality**
  - **Validates: Requirements 3.2, 3.3, 3.4**

- [ ]* 7.2 Write property test for ScrollTrigger pin behavior
  - **Property 5: ScrollTrigger Pin Behavior**
  - **Validates: Requirements 3.1, 3.5**

- [ ]* 7.3 Write unit tests for configuration parameters
  - Test scrollDistance parameter
  - Test scrubSpeed parameter
  - Test showDebug parameter
  - Test default values
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 8. Test integration with index.astro (Lenis page)
  - Verify component works on index.astro
  - Verify Lenis is detected
  - Verify synchronization is configured
  - Verify video scrolling works smoothly
  - Verify no console errors
  - _Requirements: 7.1_

- [x] 9. Test integration with pure-test.astro (non-Lenis page)
  - Verify component works on pure-test.astro
  - Verify Lenis is not detected
  - Verify native scroll is used
  - Verify video scrolling works smoothly
  - Verify no console errors
  - _Requirements: 2.3, 7.2_

- [ ]* 9.1 Write property test for scroll tracking accuracy
  - **Property 10: Scroll Tracking Accuracy**
  - **Validates: Requirements 7.3, 7.4**

- [x] 10. Final checkpoint - Comprehensive testing
  - Run all unit tests and property tests
  - Test on both index.astro and pure-test.astro
  - Verify all requirements are met
  - Ensure no regressions in existing functionality
  - Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The core implementation (tasks 1-3, 5-7) maintains all existing functionality while adding Lenis support
- Integration tests (tasks 8-9) verify the solution works in both scenarios
