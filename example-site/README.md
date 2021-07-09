example-site
============

This example uses content from www.gov.uk to demonstrate the idea of stitching
together pieces of content using edge compute with Edgedancer.

index.mjs contains a node js implementation. The idea is:

* `/random` gets a random page from [www.gov.uk/random](www.gov.uk/random)
* All other paths:
  * Load the header and footer from files in `static`
  * Request the content for the page from GOV.UK's content API
  * Concatenate the header, the content and the footer

The nodeJS implementation isn't really that interesting. The fun bit is doing
the same thing "on the edge" - using the CDN's edge compute features.

