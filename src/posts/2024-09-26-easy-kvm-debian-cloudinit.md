---
title: "Easy KVM Debian CloudInit"
publishDate: 2024-09-26
tags: [kvm]
---

Debian provides [cloud images](https://cloud.debian.org/images/cloud/) that are suitable for homelab or other libvirt/KVM oriented use.  They have 2 problems though:

* They essentially require cloud-init for initial connectivity
* The networking is a little bit tricky

In my ideal homelab world, on a single machine, I want to create a debian cloud host with a hostname of `debian-cloud01`, and then be able to address it by that hostname.  Thankfully recent versions of libvirt and Debian make this possible.

## Step 1: Configure the libvrt network

The `<network>` libvirt configuration supports the `domain` option, which, when combined with systemd-networkd and specifically systemd-resolved, will automatically wire up DNS for you.  Here's an example excerpt that you can add to the default libvirt network:

```xml
<domain name='kvm.internal' localOnly='yes' register='yes'/>
```

Once this is done, hosts created on this network will be accessible via the `<hostname>.kvm.internal` address.

## Step 2: Virt-install Debian

Virt install -- and the corresponding debian cloud-init -- contain 2 other tricks that give us what we need.  First, ensure that you are using the `generic` image, the cloud images lack enough stuff for this to work.  Second, have the ssh key that you want to use somewhere accessible.  I pull my keys for this purpose directly from github (https://github.com/bryanalves.keys).  Third, setting the `system.serial` sysinfo command lets you inject a minimal cloud-init configuration to set the hostname. With all of this, you can have a (long) one-liner command to instantiate debian cloud images with local connectivity and no extra file dependencies, no need to go through the step of creating extra files for cloud-init to load.

Here is a sample command:

```sh
virt-install \
  --import \
  --name debian-test01 \
  --memory 1024  \
  --vcpus 2  \
  --cpu host  \
  --disk=size=20,backing_store=/var/lib/libvirt/images/base/debian-12-generic-amd64-20240717-1811.qcow2  \
  --os-variant=debian12  \
  --noautoconsole  \
  --cloud-init clouduser-ssh-key=<(curl https://github.com/bryanalves.keys | head -1),root-password-generate=on,disable=on  \
  --sysinfo system.serial="ds=nocloud;h=debian-test01"
```

After running this command, you should be able to ping `debian-test01.kvm.internal`, and you should be able to ssh `debian@debian-test01.kvm.internal`, after which you can use whatever second-stage configuration you'd like.

This makes spinning up throwaway VMs as easy as spinning up throwaway containers
