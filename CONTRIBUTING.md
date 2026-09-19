# Contributing

Thank you for helping improve the Solana Ghana community website. Keep each contribution focused, easy to review, and grounded in a clear user need.

## Before you start

1. Create a short-lived branch from the current default branch.
2. Run `npm install`, then `npm run dev`.
3. Confirm the existing behavior before changing it.
4. Avoid unrelated formatting, dependency, or lockfile changes.

## HTML and React

- Prefer semantic elements such as `header`, `nav`, `main`, `section`, and `button` before adding ARIA roles.
- Keep one stable page heading and use heading levels in a logical order.
- Use Next.js `Link` for internal routes and ordinary anchors for external destinations or page fragments.
- Keep components small enough that their content, behavior, and state remain easy to understand.
- Use stable keys for rendered lists. Do not use a list index when the content already has a unique identifier.
- Read [MDN's HTML guidance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content) and [ARIA guidance](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) when choosing structure and semantics.

## CSS and responsive design

- Start with flexible layouts, intrinsic sizing, and content-driven breakpoints.
- Test at 320, 375, 768, 1024, and 1440 CSS pixels, plus at 200% browser zoom.
- Do not hide overflow to cover a layout defect. Fix the element that exceeds its container.
- Preserve readable line lengths, visible focus indicators, and touch targets of at least 44 by 44 CSS pixels.
- Respect `prefers-reduced-motion` for non-essential animation.
- Follow [MDN's responsive design guide](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design) and [media-query reference](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries).

## JavaScript and accessibility

- Use native browser behavior before adding custom interaction code.
- Every interactive control must work with a keyboard. Menus and temporary UI must have a clear way to close and must restore focus when appropriate.
- Communicate the current state in both visual and programmatic ways, such as `aria-current="page"` for active navigation.
- Give images useful alternative text when they convey information and empty alternative text when they are decorative.
- Do not announce frequently changing decorative text with live regions.
- Never show a success message unless data was actually accepted by a working service.
- Refer to [MDN's accessibility guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility) and [keyboard accessibility guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard).

## Testing

Before requesting review:

1. Run `npm run build`.
2. Check every changed route with a keyboard at desktop and mobile widths.
3. Verify focus visibility, menu behavior, headings, links, forms, and horizontal scrolling.
4. Test reduced-motion mode when animation behavior changed.
5. Review the final diff and confirm that no secrets, generated files, or unrelated lockfile updates are included.

## Git standards

- Use a descriptive branch name and small commits that each represent one coherent change.
- Write imperative commit subjects, for example `Fix mobile course layout`.
- Do not force-push over someone else's work or rewrite shared history without agreement.
- Keep pull-request descriptions factual: explain the problem, the change, how it was tested, and any known limitations.
- Link the relevant issue when one exists and include screenshots for visible UI changes.

See [MDN's contribution guidelines](https://developer.mozilla.org/en-US/docs/MDN/Community/Pull_requests) for additional review-friendly practices.
