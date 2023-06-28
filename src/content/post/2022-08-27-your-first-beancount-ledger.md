---
title: "Your First Beancount Ledger"
publishDate: 2022-08-27
tags: [accounting]
---

Getting started with beancount is easy -- it's a plaintext file!  Create a blank `ledger.beancount` file if you haven't already, and run `bean-check` on it:

```
bean-check ledger.beancount
```

An empty file is valid.  You can and should run `bean-check` regularly to ensure that what you are doing stays accurate as you go, just like red-green refactoring.

# Your first account

You create accounts using the `open` directive.  Let's assume you have a checking account.  The syntax will look something like this:

```
2022-01-01 open Assets:CapitalTwo:Checking
```

The format of the open directive is `{date} open {account}`.  Accounts are colon-separated.  The first component must be one of the [5 account types]({{< ref "/posts/2022-08-23-a-brief-overview-of-account-types.md" >}}) (`Assets`, `Liabilities`, `Equity`, `Expenses`, `Income`). Everything after the first component can be structured however you want.  Accounts will tend to have a hierarchical structure, and the result is called your chart of accounts.  For assets and liabilities, I recommend grouping things by institution (like bank-name), and then account.  If you are tracking accounts for multiple people (such as spouse), having a higher-level grouping by person can make things easier, such as:

```
2022-01-01 open Assets:Me:CapitalTwo:Checking
2022-01-01 open Assets:Me:CapitalTwo:Savings
2022-01-01 open Assets:Spouse:CapitalTwo:Checking
2022-01-01 open Assets:Joint:CapitalTwo:Checking
```

The structure is entirely up to you. The date of the open directive just needs to be a date before the first recorded transaction on the account.


You'll also need an account to source opening balances, so create that now:

```
2022-01-01 open Equity:Opening-Balances
```

# Your first transaction

Now we can fund the account:

```
2022-08-01 txn "Opening Balance"
  Assets:CapitalTwo:Checking 4000 USD
  Equity:Opening-Balances
```

Transactions take the form of `{date} txn "{narration}" "{optional payee}"`, followed by a series of two or more postings.  Postings can take a couple of forms, the most common of which is `{account} {amount-change} {currency}`.
* Postings are indented.
* *Postings must sum to zero*. `bean-check` will fail and yell if this invariant is violated.
* Currency is a series of at least 2 capital letters. Preceding dollar signs are not used in beancount.

You'll note that the `Equity:Opening-Balances` posting has no amount to change.  Beancount will automatically infer up to one posting for you in order to make your life easier.  This is equivalent to the following:

```
2022-08-01 txn "Opening Balance"
  Assets:CapitalTwo:Checking 4000 USD
  Equity:Opening-Balances -4000 USD
```

There can be more than 2 postings:

```
2022-08-01 txn "Opening Balance"
  Assets:CapitalTwo:Checking 4000 USD
  Assets:CapitalTwo:Savings 10000 USD
  Equity:Opening-Balances -14000 USD
```

Remember that at most one posting can have it's value inferred:

```
2022-08-01 txn "Opening Balance" ; does not work
  Assets:CapitalTwo:Checking 4000 USD
  Equity:Opening-Balances
  Assets:CapitalTwo:Savings 10000 USD
  Equity:Opening-Balances
```

(Note: The `; does not work` above is valid syntax for a comment)

Ordering of postings does not matter:

```
2022-08-01 txn "Opening Balance"
  Equity:Opening-Balances -14000 USD
  Assets:CapitalTwo:Checking 4000 USD
  Assets:CapitalTwo:Savings 10000 USD
```

# Your first expense

Let's record an expense:

```
2022-01-01 open Expenses:Groceries

2022-08-02 txn "Buy Groceries"
  Expenses:Groceries 40 USD
  Assets:CapitalTwo:Checking
```

Remember, transactions must sum to zero, so you increase your expenses to decrease your account balance.  This is equivalent to the following:

```
2022-01-01 open Expenses:Groceries

2022-08-02 txn "Buy Groceries"
  Assets:CapitalTwo:Checking -40 USD
  Expenses:Groceries
```

Record whichever way makes more sense to you, or manually specify the amounts in both postings.  I tend to skip one of the postings for simple transactions like this. Importers, which we'll talk about in a subsequent post, will simplify a lot of this as well.

Additionally, ordering of directives does not matter in beancount, with the exception of some intraday transactions.  This will almost never come up or matter, but it does generally make your life easier.

# A brief view into reports

Before we do some reporting, we need to tell beancount which currency is our operating currency.  US dollars (or whatever you use) are not special in beancount. `USD` is just a string of 3 characters.  You configure beancount using `option` directives.  You can tell beancount that you want reports in USD by specifying:

```
option "operating_currency" "USD"
```

This will make more sense if and when you start tracking other assets, such as stocks, mutual funds, or if you travel and actually work with multiple currencies

With the final form:

```
option "operating_currency" "USD"

2022-01-01 open Assets:CapitalTwo:Checking
2022-01-01 open Expenses:Groceries
2022-01-01 open Equity:Opening-Balances

2022-08-01 txn "Opening Balance"
  Assets:CapitalTwo:Checking 4000 USD
  Equity:Opening-Balances -4000 USD

2022-08-02 txn "Buy Groceries"
  Expenses:Groceries 40 USD
  Assets:CapitalTwo:Checking
```

We can run `bean-check ledger.beancount` and receive no feedback, telling us out file is valid.  We can get our net worth using

```
bean-report ledger.beancount networth
```

This will tell us the current value of all of our assets, minus any liabilities that we have.

You can see the current balance of all of your accounts by doing:

```
bean-report ledger.beancount balances
```

You can also start to visualize the data with fava:

```
fava ledger.beancount
```

And then visit <http://localhost:5000> in your browser.  Fava won't make sense at first, but paradoxically the more data you add, the more useful it will become.
