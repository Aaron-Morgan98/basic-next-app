## Look and feel / UX
- Nice and clean looking.
- From a UX perspective, checkboxes imply you can select more then one. I'd prefer a 'more details' button/link next to each item.

## General approach
- I'd like to see you using the server-side rendering feature of Next.js when making api calls.

- Instead of passing data between pages, I would expect you to make an api call in the moreinfo page. There is a single object endpoint - https://api.restful-api.dev/objects/7

- Consider splitting your code into smaller components and moving functions into separate files. E.g. in [locale]\page.tsx:

  - Move the fetchData function into a separate .ts file - this not only make it neater, it makes it more testable

  - Create 2 components - ObjectList and MoreInfoButton (in real life, you'd probably look at making these re-usable components by passing things like data/text as properties)

## Translation
- Good translation methodology

## Tests

File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   73.56 |       80 |   72.72 |   73.56 |                   
 [locale]          |   69.48 |    85.71 |   83.33 |   69.48 |                   
  layout.tsx       |       0 |        0 |       0 |       0 | 1-45              
  page.tsx         |   98.16 |     92.3 |     100 |   98.16 | 46-47             
 [locale]/moreInfo |   97.63 |    88.88 |     100 |   97.63 |                    
  page.tsx         |   97.63 |    88.88 |     100 |   97.63 | 40-42              
 components        |       0 |        0 |       0 |       0 |                    
  footer.tsx       |       0 |        0 |       0 |       0 | 1-18               
  header.tsx       |       0 |        0 |       0 |       0 | 1-15               

- Some good, meaningful tests - you've considered what you'd want the tests to achieve.
- I'd like to see more coverage - this wouldn't pass our 80% threshold.
