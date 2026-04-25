# Thumbnail style references

Drop 2-3 of the brand IG poster images here as PNG/JPG before running
`npm run thumbnails`. The generator passes them to Nano Banana as
`inlineData` parts so the AI matches the painterly + serif aesthetic.

If this directory is empty, the generator runs prompt-only (still works,
just less locked-in to the IG look).

Recommended picks: covers with a clear focal subject, dramatic backlight,
deep moody palette with one warm accent. The text overlay in the IG
samples is fine — Nano Banana ignores it for style transfer.

Filenames don't matter. Anything ending in .png/.jpg/.jpeg/.webp is loaded.
