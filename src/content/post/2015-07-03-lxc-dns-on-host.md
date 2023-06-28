---
title: "Access LXC containers by name from host"
publishDate: 2015-07-03
tags: [systems,systemd,lxc,dns]
---

In a [previous installment](/2015/07/02/enabling-lxc-archlinux-with-systemd-networkd/) we configured systemd-networkd and lxc to play nicely together, along with docker.  There was one problem with that setup, which is that the host could not find containers by name.  This post addresses that.

### LXC\_DOMAIN

On Archlinux at least, LXC\_DOMAIN is empty by default.  It's a good idea to set this to something to help segregate the LXC containers.  I used .lxc, [even though I probably shouldn't](https://support.comodo.com/index.php?/Knowledgebase/Article/View/722/16/acceptable-internal-domain-names)

### systemd-networkd to the rescue

In the previous post, I had mentioned that switching to systemd-networkd was probably just yak shaving.  It pays off now though, as it makes handling upstream DNS a lot simpler with dnsmasq.  First off, make sure that /etc/resolv.conf is a normal file, and **not** symlinked to /run/systemd/resolve/resolv.conf as most guides suggest.

Next, update dnsmasq.conf and add the following line:

    resolv-file=/run/systemd/resolve/resolv.conf

Finally, add where your dnsmasq server listens to /etc/resolv.conf:

    nameserver 10.0.3.1

Now, not only do you have access to LXC containers by name, but you have a local caching nameserver in place that you can do various thing with.  This dnsmasq server does double-duty, so if you get too fancy it might be wise to separate concerns and create 2 dnsmasq instances, 1 for local caching and one solely for DNS/DHCP for LXC.
