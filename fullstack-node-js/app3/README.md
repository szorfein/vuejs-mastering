Query with Curl

All products

    /usr/bin/curl http://localhost:1337/products | jq

Single product

    /usr/bin/curl http://localhost:1337/products/3 | jq

Paginate

    /usr/bin/curl -sG -d limit=1 -d offset=2 http://localhost:1337/products | jq

See Headers

    /usr/bin/curl -I http://localhost:1337/products

Learn

- Paginate result with javascript slice()
- Return next() when no product exist or match
