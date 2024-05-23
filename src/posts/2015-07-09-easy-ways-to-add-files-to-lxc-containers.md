---
title: "Easy ways to add files to LXC containers"
publishDate: 2015-07-09
tags: [systems, lxc]
---

When working with LXC containers, you occasionally need to transfer files from the host. If you are just using a normal file system, rooted somewhere like /var/lib/lxc, you can just copy the files in:

    sudo cp file.blah /var/lib/lxc/test01/rootfs/home/blah/blah/blah

This kind of misses the point for 2 reasons. First of all, it's assuming some things that can be considered "internal" to LXC, namely that file systems are rooted under something called {your_container_name}/rootfs. Furthermore, this won't work if you are using different backends, like btrfs or zfs.

The other reason why this isn't good is that the file will be based on permissions and uid/gids from the host. A better way is to transfer using [lxc-attach](http://linux.die.net/man/1/lxc-attach). For example:

    <something_on_my_machine.sh lxc-attach -n $1 -- /bin/sh -c "/bin/cat > /target/on/lxc/guest"

In case you aren't familiar with the \<file syntax, this is equivalent to:

    cat something_on_my_machine.sh | lxc-attach -n $1 -- /bin/sh -c "/bin/cat > /target/on/lxc/guest"

Using a similar technique, you can pipe things into tar to transfer a bunch of files in bulk. Alternatively, you can transfer files from the container to the guest.

The reason I'm being pedantic by using /bin/sh and /bin/cat is so that it will work more readily across a variety of OSes without having to worry about environment, having $PATH set, etc.
