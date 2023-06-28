---
title: "Beancount Plugins and Options"
publishDate: 2022-09-01
tags: [accounting]
---

Options allow you to change the behavior of your beancount ledger.  We've already seen one to specify the main operating currency.  The list of the rest is codified [here](https://github.com/beancount/beancount/blob/2.3.5/beancount/parser/options.py).  My recommendations are as follows:

```
option "title" "Main Ledger"
option "documents" "data/documents"
option "operating_currency" "USD"

option "infer_tolerance_from_cost" "TRUE"
option "inferred_tolerance_multiplier" "1.1"

option "insert_pythonpath" "True"
```

See the above link for explanations about what these are used for.

Plugins run during the processing and parsing steps, and can be used to do things like modify entries in real time, add new entries, or add additional assertions or constraints to do error reporting on.  The list of plugins included with beancount is [here](https://github.com/beancount/beancount/tree/2.3.5/beancount/plugins).  I recommend the following plugins:

```
plugin "beancount.plugins.check_average_cost"
plugin "beancount.plugins.check_commodity"
plugin "beancount.plugins.check_closing"
plugin "beancount.plugins.coherent_cost"
plugin "beancount.plugins.noduplicates"
plugin "beancount.plugins.onecommodity"
plugin "beancount.plugins.sellgains"
plugin "beancount.plugins.tag_pending"
```

These help ensure that accounts are used for a single commodity, protect against accidental duplicates, help ensure that capital gains are reported correctly, and will help protect erroneous price conversions that aren't expected.

# Adding your own plugins

By using the `insert_pythonpath` option, you can add arbitrary python code to be executable.  Create a `lib/plugins` directory from the same relative path that your `ledger.beancount` file is, and you can write your own plugins (or copy from other sources).  Then you can specify their use like this:

```
plugin "lib.plugins.amortize_over"
plugin "lib.plugins.todo_as_error"
```

# Configuring fava

Fava options are configured using the `custom "fava-option"` directive.  A list of fava options can be found [here](https://github.com/beancount/fava/blob/main/src/fava/help/options.md).  Here's a sample config that will enable use of the import UI (more about this later), along with some other sensible defaults:

```
2010-01-01 custom "fava-option" "show-accounts-with-zero-transactions" "false"
2010-01-01 custom "fava-option" "show-accounts-with-zero-balance" "false"
2010-01-01 custom "fava-option" "import-config" "./import.config"
2010-01-01 custom "fava-option" "import-dirs" "./import-input/"
2010-01-01 custom "fava-option" "insert-entry" "incoming.beancount"
2010-01-01 custom "fava-option" "invert-income-liabilities-equity" "true"
2010-01-01 custom "fava-option" "default-page" "/income_statement/?time=year"
```

# Fava extensions

Fava extensions add entries to the left hand navigation to provide different views into data.  Some examples of things available are some budgets, some data visualizations, and some ways to report on capital gains.  If you want to write your own, you can add them to `lib/fava_ext` and then configure them like so:

```
2010-01-01 custom "fava-extension" "lib.fava_ext.short_term_gains"
2010-01-01 custom "fava-extension" "lib.fava_ext.long_term_gains"
```
