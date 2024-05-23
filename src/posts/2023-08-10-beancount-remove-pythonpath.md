---
title: "Removing insert_pythonpath from Beancount configuration"
publishDate: 2023-08-10
tags: [accounting]
---

In a previous configuration, we added our extra python utilities by setting the beancount option `insert_pythonpath`. In this iteration, we are going to more correctly package our files so they can be used externally if desired.

# Installing pip-tools

There are a variety of ways to work with python packaging, whether it be manually, poetry, or others. I've found success with pip-tools, so it's what we are going to set up here. If you followed along in the original setup, you already have a virtual environment set up with pip-tools, along with a `requirements.in` file, if not, refer [here](/posts/2022-08-22-getting-started-with-beancount/).

# Packaging the code

If you've been following along, you have a top level `lib` directory with subdirectories for the various types of things. You'll want to rename this lib directory to what you want the name of the package to be. This can be whatever you want; I named mine `myledger`. You'll want to update all references to `lib` in your beancount config to account for this while transitioning. Next is to make a setup.py file to package the code. This can be as simple as:

```python
from setuptools import setup

setup(
  name='myledger',
  version='0.1.0',
  packages=['myledger'],
  install_requires = [
    'beancount >=2.3.5, <3.0',
    'fava >=1.22.2, <2.0.0',
    'beancount-import >=1.3.4',
    'ofxtools >= 0.9.5',
    'smart-importer >=0.3, <1.0.0',
    'beancount-reds-importers >=0.5.1, <1.0.0',
    'Jinja2 >=3.0.3, <4.0.0',
    'pandas >=1.3.5, <2.0.0',
    'click >=8.1.3, <9.0.0'
  ],
  license='MIT',
  author='Bryan Alves',
  author_email='bryanalves@gmail.com',
  description='Personal beancount ledger utilities'
)
```

The notable things here are the `packages` and the `install_requires` directives. Things that your package code needs directly, like Jinja, should be specified here directly and removed from the `requirements.in` file.

Next, you'll want to set the package to install locally, to do that, add the following line to `requirements.in`:

```python
-e file:.#egg=myledger
```

This somewhat magical invocation says to treat the current directory as a locally installed package, and to give it the name of `myledger`. After this, `pip-compile` will make a proper `requiremnts.txt` that can be installed. After this, you can remove the `insert_pythonpath` directive from your configuration, and have lines such as:

```beancount
plugin "myledger.plugins.amortize_over"
2010-01-01 custom "fava-extension" "myledger.fava_ext.short_term_gains"
```

Work correctly without any extra work. You can also remove any manual path manipulation in any scripts you have to run things, for example, I have a runner for reporting that now looks like this:

```python
#!/usr/bin/env python3

from myledger.reporting import cli

if __name__ == '__main__':
  cli.cli()
```

Before, this script would need to append the path of myledger before being able to access anything in it. Now it's just normal python packaging.
