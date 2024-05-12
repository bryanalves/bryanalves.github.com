---
title: "Adding Commodities and Investments"
publishDate: 2022-08-28
tags: [accounting]
---

So far we've worked only with USD as a currency.  Beancount also supports commodities held at cost.  This means that holding onto something that was acquired on a specific date and with a cost basis.  The most typical example of this is a unit of stock or a mutual fund.  Here is an example:

```
2022-01-01 commodity VTSAX
2022-01-01 open Assets:Brokerage

2022-08-27 txn "Acquire some VTSAX"
  Assets:Brokerage 10 VTSAX {100 USD}
  Equity:Opening-Balances

2022-08-28 txn "Acquire some more VTSAX"
  Assets:Brokerage 10 VTSAX {100 USD}
  Equity:Opening-Balances
```

After this, `Assets:Brokerage` has 20 total units of VTSAX, but it's recorded as two separate holdings:

```
# bean-report ledger.beancount holdings
Account                        Units  Currency  Cost Currency  Average Cost  Price  Book Value  Market Value
--------------------------  --------  --------  -------------  ------------  -----  ----------  ------------
Assets:Brokerage               10.00     VTSAX            USD        100.00           1,000.00
Assets:Brokerage               10.00     VTSAX            USD        100.00           1,000.00
```

This is because when you sell them, you need to keep track of which you sell, so you can recognize the correct capital gains.  Beancount uses 3 pieces of information for this:

* The acquisition cost (must be specified)
* The acquisition date (defaults to the date of the transaction)
* An optional label or id

When selling, you must specify enough information to uniquely identify the lots you are intending to sell.  If all of your lots are acquired at different prices, you can specify just the price.  If all of your lots are acquired on different dates, then you can just specify the date.  I recommend explicitly specifying both the date and price when selling, as it will help to reduce errors (and makes the file easier to read):

```
2022-08-29 txn "Sell VTSAX"
  Assets:Brokerage -10 VTSAX {100 USD, 2022-08-27}
  Assets:CapitalTwo:Checking
```

Note that this assumes that you sell the unit for exactly what you paid for it.  This is typically not the case!  When you sell for a different price, you recognize either a capital gain or a loss.  This is typically recorded using an `Income` account:

```
2022-01-01 open Income:Gains:Short-Term:Brokerage
2022-01-01 open Income:Gains:Long-Term:Brokerage

2022-08-29 txn "Sell VTSAX"
  Assets:Brokerage -10 VTSAX {100 USD, 2022-08-27}
  Assets:CapitalTwo:Checking 110 USD
  Income:Gains:Short-Term:Brokerage
```

This will put 10 USD into an account to track your short-term capital gains.  This is a US-centric interpretation of asset selling; consult your local laws to make sure you get the details right for recording.  An additional step is to specify the selling cost, which is usually only used for documentation.  A plugin (discussed later) can help you verify things by using this:

```
2022-08-29 txn "Sell VTSAX"
  Assets:Brokerage -10 VTSAX {100 USD, 2022-08-27} @ 101 USD
  Assets:CapitalTwo:Checking 110 USD
  Income:Gains:Short-Term:Brokerage
```

or with @@ to track the full cost

```
2022-08-29 txn "Sell VTSAX"
  Assets:Brokerage -10 VTSAX {100 USD, 2022-08-27} @@ 110 USD
  Assets:CapitalTwo:Checking 110 USD
  Income:Gains:Short-Term:Brokerage
```

By default, all accounts are treated as `STRICT`, meaning that bean-check will tell you if you get any of these details wrong.  This is analogous to selling by lot id, or spec id by most brokers.  There are other options:

* `NONE` which lets you do whatever you want, including things like negative assets.  You should ideally never need to use this.
* `FIFO`, which sells oldest things first
* `LIFO`, which sells newest things first

When using FIFO and LIFO, you don't need to specify price and date when selling:

```
2022-08-29 txn "Sell VTSAX"
  Assets:Brokerage -10 VTSAX {} @ 101 USD
  Assets:CapitalTwo:Checking 110 USD
  Income:Gains:Short-Term:Brokerage
```

With `FIFO`, it will sell the 10 units acquired on 2022-08-27 in our example. With `LIFO`, it will sell the 2022-08-28 units.  LIFO/FIFO are especially useful for retirement accounts, where you don't really want to track the gains, have no special tax treatment, and you ultimately just care about the total units held (with an approximately correct cost basis for reporting).

You specify the booking method when opening the account:

```
2022-01-01 open Assets:Brokerage "LIFO"
```

Finally, you will probably find it helpful to create sub-accounts for each commodity you plan on using.  This will help to reduce errors, makes interop with some other tools better, and will make some reports easier to read:

```
2022-01-01 open Assets:Brokerage:VTSAX
2022-01-01 Income:Gains:Short-Term:Brokerage:VTSAX
```

The income account is optional, but I tend to take the philosophy of more accounts is better than fewer.

Some summary guidelines:

* Create an account per commodity
* When acquiring units, always specify the acquisition cost.
* When selling units, always specify the acquisition cost and the acquisition date.  Also, unless the unit is being directly transferred (rare!), always specify the selling cost, either per unit with `@` or full cost with `@@`
* Create income accounts to track gains according to your tax laws (usually short-term and long-term).  Optionally make these granular to each unit type, instead of institution.
* Structure income accounts as `Income:{income-type}:{income-subtype-optional}:{institution}:{currency-or-unit}.  It is MUCH more common to want a report such as "all short-term capital gains" than "all gains of any type for institution x".  Both are possible, but the recommended structure makes the first report essentially free.
