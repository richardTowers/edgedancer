Edgedancer
==========

> “I want control,” she said, opening her eyes. “Not like a king or anything. I
> just want to be able to control it, a little. My life. I don’t want to get
> shoved around, by people or by fate or whatever. I just… I want it to be me
> who chooses.” - Lift

Edgedancer aims to be an edge computing platform compatible with many CDNs.

It will provide a useful subset of CDN features, enabling multi-CDN
architectures. This will improve reliability and eliminate vendor lock-in.

Status
------

🤔 **Idea** 🤔

This project is currently in the "idea" phase.

We're following a documentation-driven development process. Any documentation
you find is likely to be aspirational, incorrect, or straight up impossible to
implement. Any implementation is purely a proof of concept.

Only a fool would rely on this code in production.

Comparison of edge computing platforms
--------------------------------------

| Platform | Technology | Supported languages | Edge Storage | Notes |
|----------|------------|---------------------|------------|-------|
| AWS CloudFront Functions | "Process based isolation" | JavaScript | ❌ | Very strict execution time limits - less than 1ms max |
| AWS Lambda@Edge | Firecracker | Python, JavaScript | 🤷‍♂️ You can sort of hack stuff together using CloudFront's cache | Not _really_ `@ Edge` - lambda functions run in regional data centres |
| Akamai EdgeWorkers | V8 Isolates | JavaScript | ✅ (EdgeKV) | |
| CloudFlare Workers | V8 Isolates | JavaScript | ✅ (Workers KV) | |
| Fastly (classic) | Varnish | VCL | ✅ (edge dictionaries) | |
| Fastly (compute@edge) | WASM / Lucet | Rust, AssemblyScript | ✅ (edge dictionaries) | |
| Fly | Firecracker | Any | ✅ (multi-region postgres) | |

_Got another edge computing platform you think we should include? Let us know by raising an issue._

Supported edge computing platforms
----------------------------------

| Platform | Support |
|----------|---------|
| AWS CloudFront Functions | 🤔 considering |
| AWS Lambda@Edge | 🤔 considering |
| Akamai EdgeWorkers | 🤔 considering |
| CloudFlare Workers | 🛠 in progress |
| Fastly (classic) | 🙅‍♀️ no plans |
| Fastly (compute@edge) | 🛠 in progress |
| Fly | 🤔 considering |

Initial ideas
-------------

The most similar two platforms are CloudFlare Workers and Akamai EdgeWorkers -
these are both built on V8 Isolates, they both support JavaScript, and they have
similar key-value storage offerings.

However, [Akamai's sign up form](https://www.akamai.com/us/en/campaign/assets/trials/edgeworkers.jsp)
gives me bad vibes. It's too enterprise-y. So I don't want to use their product. 

Also CloudFlare and Akamai's offerings are _so_ similar that they don't make a
particularly good proof of concept.

So instead, let's start with CloudFlare and Fastly. I use Fastly at work, so
this will be a good opportunity for me to learn a bit about their Compute@Edge
platform.

As a proof of concept, let's consider a simple website that:

* Has hundreds of thousands of pages
* Has (almost) the same header / footer on every page
* If the user has a cookie, tells them they're signed in
* Has a single big block of content in the middle which is different on every page, fetched from an origin

Our edge compute platforms should:

* Fetch the header / footer from edge storage
* Check the user's cookie and show them if they're signed in
* Fetch the main content from the origin
* Stitch the content together
* Serve a response

