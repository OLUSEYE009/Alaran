/* ==========================================================================
   EASY IMAGE REPLACEMENT
   --------------------------------------------------------------------------
   To swap in YOUR real project images, do this:

   1. Put the image file inside:   src/assets/images/
      (create that folder if it does not exist yet)
   2. Name the file EXACTLY the same as the filename used with localImage()
      in src/content.ts, e.g.:
          work-flyer-food.jpg
          work-brand-perfume.jpg
          abdulamid.jpg          (your portrait in the About section)
          hero-studio.jpg        (the workspace banner at the very top)
          service-design.jpg     (Graphic design image in Services)
          service-printing.jpg   (Printing image in Services)
   3. Rebuild the site — your image replaces the placeholder automatically.
      No other code changes are needed.

   Files in src/assets get bundled INTO the single HTML file, so they
   always show up — unlike files in /public which may not be served.
   ========================================================================== */

const local = import.meta.glob("./images/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/** Returns the local image if it exists in src/assets/images/, else the fallback. */
export function localImage(file: string, fallback: string): string {
  return local[`./images/${file}`] ?? fallback;
}
