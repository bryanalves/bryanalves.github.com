---
title: "A Brief Overview of Account Types"
publishDate: 2022-08-23
tags: [accounting]
---

In double-entry accounting, there are 5 account types.  Here we will summarize them from the scope of personal finance, and provide some sample use cases and cash flows so you can help identify when to create which type of account.

# What is an account?

Most people will properly identify accounts as things like checking accounts at banks, or your credit card, or maybe a mortgage or loan.  Things that typically have identifying features such as an account number, are associated with an institution, etc.  While these *ARE* accounts, the actual definition of an account is much more broad:

> An account is a named list of transactions

It doesn't need to be owned by an institution. It doesn't have to have an account number.  It doesn't even have to have a known representation outside of your accounting system!  Getting over this hurdle of understanding will make understanding "accounts" in double-entry personal finance *MUCH* easier.  It comes with a bit of practice, and it eventually clicks.

A sample use case to define this is savings sub-accounts.  Some people like to create things like the "save for a holiday fund", or the "new car fund", and many financial institutions support this functionality in their interface.  For those that don't, however, you can create these accounts manually on your side and track it yourself.  There's nothing stopping you from creating as many sub-accounts as you want manually and "transferring" money between them within your own ledger.  Beancount will even helpfully report the balance of the main account, even if there aren't any actual transactions there, by rolling up the sub-accounts so you can still see the whole picture.

In my opinion, as a general rule, it's better to create more accounts than fewer.

# Debits and credits need not apply

Traditional double entry accounting used the terms debit and credit to reflect changes to accounts, and different types of accounts either increased or decreased based on debits or credits.  It's easy to find the history of this, but it isn't particularly relevant for most computer-generated double entry systems.  Beancount (and others) use the simpler "increase" and "decrease" verbs, as well as allowing negative numbers.

# Account type 1: Assets

Assets are what most people first think of when they think of accounts. Assets are anything you own or have control over that has value.  The most obvious examples are your checking and savings accounts.  Your house, if you own one, is also an asset, as well as other physical property that has cash value (cars, collectibles, art).  Also your investment accounts, whether they are normal brokerage accounts or retirement accounts.  If it has a positive value, and you regularly receive a statement for it, it's almost certainly an asset account. Obviously your cash in your wallet, or cash that you keep on hand in the house or in your car for emergencies can also be asset accounts.

Asset accounts don't need to have value denominated in your country's native currency.  You could track work vacation hours for example.

A final uncommon thing that you may see as an asset account is an IOU.  In the business world this would be modeled as accounts receivable.  If you have a friend who owes you some money, you may choose to record that as an account to keep track of how much they owe you.  This is another great example of an account that doesn't have a number, and doesn't actually have a representation outside of your ledger.

* Asset accounts are almost always positive.
* They can increase or decrease due to transfers from other asset accounts.
* The can increase from income (salary, dividends, capital gains, etc).
* They can decrease from funding an expense.
* They can decrease from paying off liabilities.

# Account type 2: Liabilities

Liabilities are often the second most common thing that people will think of when thinking of accounts.  These are things your own or have control over that you owe money to.  The most common examples are credit cards and loans.  Your mortgage, if you have one, is also a liability.

The IOU asset account can also be a liability account if you owe a friend money.  This is analogous to accounts payable from the business world.

* Liabiliity accounts are almost always negative (or zero).
* They can decrease from funding an expense.
* They can increase from a transfer from an asset account (representing a payment towards the liability)
* They can increase from a transfer representing cash back rewards or similar.  This is usually modeled as an income account.
* They can increase or decrease due to transfers from other liability accounts (representing a balance transfer).

# Account type 3: Expenses

Expense accounts are when double-entry accounting starts to really differentiate itself from other methods.  Expense accounts are analogous to "spending categories" in Mint or other tools.  In double entry accounting however they are "just another account."  This homogeneity has a lot of benefits.  When getting started though, just thinking of them as spending categories will get you a long way down the path.  You can create as many expense accounts as you want; they are all internal to your ledger system.  The only thing to keep in mind is that this is an account, not a tag, meaning that you can't attribute multiple expense accounts to a single transaction (unless you split the transaction).

Some examples of expense accounts include:

* Groceries
* Restaurants
* Auto repairs
* Investment fees
* Insurance
* Taxes

Any set of expense accounts that makes sense to you and will let you track what you want to track will work.  One of the benefits of plain text accounting is that doing things like renaming accounts, or being more (or less) fine-grained in the future is pretty easy to do.  I also always keep a "Miscellaneous" expense account because categorizing everything perfectly isn't possible, or if it is possible is way too much work.

* Expense accounts are almost always positive (this is counterintuitive!)
* Expense accounts are increased by transfers from assets or liabilities to represent purchases.
* Expense accounts are decreased product returns.

# Account type 4: Income (sometimes called Revenue)

Income accounts are one of the most confusing account types when first coming across double entry accounting.  People generally think of income as "making money," yet income accounts are almost always monotonically *decreasing*, not increasing!

The easiest way to reason about this is to think about income accounts as "somebody elses bank account."  When you receive income, somebody is transferring money from their account, to yours.  Their account decreases, yours increases.  This insight helped me really understand income accounts.

The most obvious example of an income account is for your paycheck.  There are 2 ways to record this, by net or by gross.

By net is a simple transfer of net pay from the income account to the desired asset account.  By gross involves transcribing all of the details of the paystub. The income account will decrease by the gross pay, and there will be legs of the transaction for taxes, insurance, retirement contributions, health insurance and other benefit deductions.

> A transaction involves 2 *or more* accounts. Another huge difference between other systems!

By gross sounds complicated, but remember, most of your paychecks are very repetitive, and this is just plain text.  Copy and paste!

Other examples of income accounts include bank interest, credit card cash back rewards, investment dividends, investment capital gains, and gifts.  It's also usually handy to have a miscellaneous income account here because sometimes things don't fit into neat buckets.

# The final type: Equity (sometimes called Capital)

Equity accounts are not very relevant for most personal finance setups.  The most common use by far is the "opening balances" account, which is used to give accounts their starting balance.  Because you typically start your double entry ledger sometime in the future after the account has been opened, the starting balance from where you start tracking each transaction needs to come from somewhere.

Another use for equity accounts is for things that you don't otherwise want to track.  When you have capital gains in retirement accounts for example, those capital gains need to be recorded somewhere so that transactions balance.  You *could* create an income account for this, but I find it better to "hide" this detail in an equity account.  The same can be done for retirement accounts that have expenses and fees as separate line items instead of just rolled up into the fund's expense ratio.  These *could* be recorded into an expense account, but again I prefer to "hide" it.

The last 2 things you might see equity accounts used for are conversions or rounding errors.  Because of beancount's robust currency and inventory system, you probably won't find a need for a conversion account.  A rounding errors account can be helpful if things just don't line up (a statement records fractions of a cent by doesn't tell you, for example).  It can be a useful escape hatch.  Be really careful relying on this though, as it's more likely that you are doing something wrong if you have large rounding errors!  At the time of writing, I have thousands of transactions across multiple years, and the sum of my rounding errors account is 1 cent.

# This seems hard, isn't there something simpler?

There are simpler things, yes.  They are not double-entry accounting. While it may be possible to simplify some of this, you'll find that you end up needing or using all of these concepts pretty shortly after getting started.  Give it a little time and practice and it will make sense.

The comments from [this stackexchange post](https://money.stackexchange.com/questions/47561/simplified-version-of-double-entry-bookkeeping-for-personal-and-business-finance) do a good job of explaining why simplifying this might not make sense.  Trust the process a little bit!
