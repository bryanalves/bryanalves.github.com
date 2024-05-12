---
title: "Using Chef Zero with Berkshelf"
publishDate: 2016-08-14
tags: [systems,chef]
---

If you have a single machine that you want to control with Chef (for example, a single home server, or a server that you want to bootstrap to run chef-server for other things), Chef Zero can be a good tool to use.  Chef Zero can be used by using the `chef-client -z` command.  This will treat your local working directory like a Chef server, so you'll want the following directory structure:

    cookbooks/
    data_bags/
    nodes/
    roles/
    environments/

Things are optional, but you'll at least want `cookbooks`.

Actually, you don't want cookbooks either.

What?

Well, when you are working with a real chef server, you don't manually upload cookbooks to it, so why would you do the same with a virtual Chef server?  Use Berkshelf like you normally do!  Add `cookbooks/` do your .gitignore file, create a separate directory to store your environment cookbook (I use `site-cookbooks/`), and make a `Berksfile` in the root directory that references it:

```ruby
source 'https://supermarket.chef.io'

cookbook 'server-env', path: './site-cookbooks/server-env'
```

Now your directory structure will look like this:

    site-cookbooks/
      server-env/
        attributes/
        recipes/
        ..
    data_bags/
    Berksfile
    .gitignore

Add data\_bags, environments, roles, as necessary. When you are ready, run `berks vendor site-cookbooks` and the result will be a `cookbooks/` directory ready for use by chef-zero.  Run `chef-client -z` and you are ready to converge your server complete with the full power of the chef supermarket in an easy to maintain way.  Be sure to check in your `Berksfile.lock` so that this is fully reproducible.

The only real downside to this is that while Berksfile sort of works with multiple cookbooks, it can sometimes be awkward to resolve the dependency graph.  For example, if you use this as a baseline for multiple servers, and have `server1-env` and `server2-env`, those cookbooks must have exact version matches on overlapping dependencies from the supermarket.  This technique is only suitable for a single environment cookbook.
