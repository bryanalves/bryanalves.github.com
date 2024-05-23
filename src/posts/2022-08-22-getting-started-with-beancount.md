---
title: "Getting started with Beancount"
publishDate: 2022-08-22
tags: [accounting]
---

[Beancount](https://github.com/beancount/beancount) is [double entry accounting](https://en.wikipedia.org/wiki/Double-entry_bookkeeping) software that's based on the [plain text accounting](https://plaintextaccounting.org/) principle. Being based on plain text allows a lot of programmatic flexibility, as well as portability.

I decided to track all of my personal finances using the tool, and want to provide a guide/cookbook to my methods. Documentation for the tool can be a bit scattered and incomplete, so I hope this cookbook-style guide helps to fill in some gaps.

# Journey to PTA/Beancount

Before beancount, tools used varied from some custom spreadsheets, [Mint](www.mint.com), and [GnuCash](www.gnucash.org). All of these tools have their uses, and depending on the level of effort you want to expend on your finances can be suitable.

I moved away from Mint for a couple of reasons. The first is the generic privacy/trust concerns. Also, at the time, a large portion of the reporting was run by Flash, which was being phased out in browsers and so the site lost a lot of utility. It also doesn't actually let you dig that deep into reporting, and errors in categorizations were a pain to deal with. Finally, syncing would randomly stop for extended periods of time, or weird duplicating things would happen. It is a good tool for getting an overall financial picture, but not a detailed one.

Custom spreadsheets can work fairly well for small scale tracking of things. One of the big downsides here is that it is manual entry; things are more error prone. If you want to track balances of accounts over time and get a good manual overall picture, a spreadsheet can be quite handy. I still have a spreadsheet for some tracking/estimating a few things that I haven't programmed in Beancount yet.

The next big step is into true double-entry accounting. If you have never done double-entry accounting, it conceptually might scare you, and you might think it's overkill for personal finances. That may be; your situation may vary. I found that after some upfront effort to understand things, and getting a system in place, things are actually much easier than with other tools.

GnuCash was my first foray into this. It has pretty good support for importing statements/documents, a reasonable user interface (which can make sharing the results/reporting of your finances easier). I found it to be significantly lacking in terms of tracking values of investments, including doing things such as rounding values that shouldn't be rounded. Ultimately I didn't have the control that I wanted, and the extensibility seemed lacking.

Which brings us to plain text accounting. It's just text! If you can program, you can parse this data and do very interesting arbitrary things. There are 2 primary directions you can go here: ledger and it's derivatives (like hledger), and beancount. I picked beancount because of it's stated goal of doing a more thorough and strict job of tracking investment values, and it being written in python and having a better (in my opinion) extensibility story.

A lot of concepts are shared between ledger and beancount; there is even a script that can take an accounting file written in ledger and make it compatible with beancount. This guide will talk about some generic double entry concepts, but many of the concepts will be beancount specific.

The final reason that I preferred beancount is [Fava](https://github.com/beancount/fava), the web user interface. At first glance it can be quite complicated and overwhelming, but once you understand the primary accounting concepts, it is a really powerful tool for digging around.

# Installing Beancount

Beancount comes as a python package; your operating system might already have it packaged up, ready to install. I prefer to run it from a python virtual environment though, to ensure I have the latest versions of things. There's a few tools that you'll likely benefit from that you'll also want to install, such as fava, some importers (more about these later), and maybe jinja or pandas if you end up writing custom reports. I like [pip-tools](https://github.com/jazzband/pip-tools) for this purpose. If you have a different preferred flow for working with python packages, go for it.

With pip-tools, the following requirements.in file will get you something pretty usable:

```
beancount >=2.3.5, <3.0
beancount-cryptoassets @ https://github.com/xuhcc/beancount-cryptoassets/archive/master.zip
beancount-import >=1.3.4
beancount-portfolio-allocation >=0.3.0, <1.0.0
beancount-reds-importers >=0.5.1, <1.0.0
Jinja2 >=3.0.3, <4.0.0
pandas >=1.3.5, <2.0.0
pyright >=0.0.13, <1.0.0
smart-importer >=0.3, <1.0.0
click >=8.1.3, <9.0.0
fava >=1.22.2, <2.0.0
```

Create a directory to store your financial data and code, save the above as `requirements.in`, then:

```bash
python -m venv .venv
source .venv/bin/activate
pip install pip-tools
pip-compile
pip-install -r requirements.txt
touch ledger.beancount
bean-check -v ledger.beancount
deactivate
```

Now, whenever you want to work with beancount, `cd` into your financial directory, `source .venv/bin/activate` and your shell prompt will change to indicate you are in a python virtual environment. When you are done, run `deactivate`. If you want to check this into version control, you'll want to check in both `requirements.in` and `requirements.txt`, and you'll want to exclude `.venv`

# Resources

- https://plaintextaccounting.org/
- https://www.reddit.com/r/plaintextaccounting/
- https://github.com/beancount/beancount
- https://github.com/beancount/fava
