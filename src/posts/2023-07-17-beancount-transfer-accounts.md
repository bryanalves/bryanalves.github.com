---
title: "Beancount Transfer Accounts"
publishDate: 2023-07-17
tags: [accounting]
---

If you do transfers between 2 separate bank accounts, for example a checking and a savings, and you use importers for each, you might run into the following set of transactions:

```
2023-07-14 * "Transfer to Checking"
  Assets:CapitalTwo:Savings -1000 USD
  Assets:CapitalTwo:Checking

2023-07-15 * "Transfer from Savings"
  Assets:CapitalTwo:Checking 1000 USD
  Assets:CapitalTwo:Savings
```

This is problematic because it's a duplicated transaction: it shows 2000 being transfered to Checking, not 1000. This also comes up with credit card payments. Your checking account will show a payment to the credit card company, and the credit card statement will have a transaction from the checking account as well. One way to solve this is to just delete one of the transactions. This is not ideal for a couple of reasons:

1. It requires some manual intervention
2. It's not clear which transaction to keep (the date and description are different)

A better solution is to create a transfer account, an account whose purpose is to hold funds that are transferred between 2 accounts that you import. You can either create 1 transfer account for everything, or create multiple special purpose ones. A single transfer account is easiest, multiple accounts will help you do things like cash flow analysis. For example, how much money have I paid to the credit card company is trivial in this model.

For a simple example, change the above transactions to:

```
2023-01-01 open Equity:Transfers:Bank USD

2023-07-14 * "Transfer to Checking"
  Assets:CapitalTwo:Savings -1000 USD
  Equity:Transfers:Bank

2023-07-15 * "Transfer from Savings"
  Assets:CapitalTwo:Checking 1000 USD
  Equity:Transfers:Bank
```

The transfer account can be either an asset or an equity. I prefer equity accounts for these "toolbox" type accounts.

After making this change, both importers will function without a need for manual intervention, the dates for how long transfers take is preserved, and the descriptions for each transfer are preserved. The only small downside is the need to create yet another account, which should not be a big deal at this point.

One final note: if your transfer account ever keeps a running balance, you know you have either a pending transfer, or there is a data entry mistake somewhere, so be sure to add some balance assertions to your transfer accounts on a regular basis to help ensure data integrity.
