---
title: "Adding Price Information to Beancount"
publishDate: 2022-08-29
tags: [accounting]
---

Once you've recorded some transactions with stocks, the price of those stocks changes over time.  Ideally, running `bean-report ledger.beancount networth` would take into account the current prices of your assets, as opposed to being limited to the price of the assets as entered on the transaction date.  The `price` directive allows for this.  It's simple to use:

```
2022-08-29 price VTSAX 98 USD
```

That's it.  Add price directives whenever you want.  But it's even easier than that!  Most directives in beancount support meta attributes.  An important one is the `price` attribute for a commodity, which will allow you to use a tool called `bean-price` (included with beancount), to look up prices automatically.  It supports several providers, but a common choice is Yahoo:

```
2022-01-01 commodity VTSAX
  price: "USD:yahoo/VTSAX"
```

Now you can run `bean-price`:

```
% bean-price ledger.beancount
2022-08-29 price VTSAX                                  98 USD
```

You can redirect this output directly to a beancount file:

```
% bean-price ledger.beancount >> ledger.beancount
```

The tool will (be default) take into account existing price entries, and be idempotent.  So running hte above command twice will not add two price directives to your file.
