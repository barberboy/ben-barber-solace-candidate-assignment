# Discussion

2:45 - Download and install dependencies.

There are a few deprecation warnings and vulnerabilities, but I'm going to ignore for now and run it as is.

<details>
  <summary>npm i output</summary>

```
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated @esbuild-kit/esm-loader@2.6.5: Merged into tsx: https://tsx.is
npm warn deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated @esbuild-kit/core-utils@3.3.2: Merged into tsx: https://tsx.is
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.

added 373 packages, and audited 374 packages in 4s

134 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (4 moderate, 1 critical)
```
</details>

2:50 Initial thoughts

- Project starts but there is a hydration error. 
- UI is an unformatted table
  - TODO: Switch to card layout
- Phone number is unformatted
  - TODO: format phone number
- Next.js 14.2.19 is outdated
  - TODO: update Next.js
- Search throws an error
  - TypeError: advocate.yearsOfExperience.includes is not a function
  - TODO: Fix search
- Search happens on every keystroke
  - TODO: Debounce
- Reset Search logs something but does not refresh the UI
- page.tsx:79 Warning: Each child in a list should have a unique "key" prop.

** Code **
- `/api/advocates` is fetched statically
- Direct DOM access with getElementById
  - TODO: switch to refs
- Type errors/warnings
- document.getElementById("search-term").innerHTML = searchTerm is unnecessarily unsafe

3:11 - Time Check: Resolved build and search errors and added typescript definition.

3:35 - Begin frontend styling
4:05 - Add initial styles to convert from table to card layout
- TODO: Search section is unformatted and...ugly
- TODO: Phone numbers are unformatted.
- TODO: Specialties take up a lot of room visually. Perhaps collapse or .join() into a paragraph instead of a list.
- TODO: Cards are missing some personality.
- TODO: Not showing `advocate.yearsOfExperience`

4:45 - Improve layout styles and auto-complete the search.
- TODO: Fetch the specialties from the server
- TODO: Include a photo to improve personalization
- TODO: Move searching to the server
- TODO: Add filter by state as well

