---
title: "Beancount Recommended Structure"
publishDate: 2022-09-07
tags: [accounting]
---

By now, your beancount file might be getting a bit unwieldy and hard to understand. You have accounts, commodities, transactions, prices, plugins, settings, and more. Thankfully, beancount provides a way to help provide some structure, the `include` directive. This lets you split your ledger up into multiple files. Here's a recommended structure:

```
option "title" "Main Ledger"
; more options

plugin "beancount.plugins.check_average_cost"
; more plugins

include "data/accounts.beancount"
include "data/closed_accounts.beancount"
include "data/commodities.beancount"
include "data/prices.beancount"
include "data/2010.beancount"
include "data/2011.beancount"
include "data/2012.beancount"
include "data/2013.beancount"
include "data/2014.beancount"
include "data/2015.beancount"
include "data/2016.beancount"
include "data/2017.beancount"
include "data/2018.beancount"
include "data/2019.beancount"
include "data/2020.beancount"
include "data/2021.beancount"
include "data/2022.beancount"

include "data/incoming.beancount"
```

A couple of notes:

- I separated accounts from closed accounts. This allows me to have a clearer view into current accounts if necessary to make changes (for example, renaming).
- I do transactions per year. This helps to make older transactions "feel immutable" and safer. Also less stuff to sort through if I'm looking for a specific transaction.
- I create an "incoming" file that is usually blank (and checked in as blank into version control). I treat this as a staging area for adding lots of transactions at once (for example, monthly sync from importers). Get everything right, make `bean-check` pass, and then cut/paste into the correct year.
- All of these files are in a `data` subdirectory. This structure makes code/data separation a bit easier and cleaner in my opinion.
