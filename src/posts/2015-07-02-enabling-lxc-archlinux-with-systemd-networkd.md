---
title: "Enabling LXC on Archlinux with systemd-networkd"
publishDate: 2015-07-02
tags: [systems, systemd, lxc, dnsmasq]
---

After playing around with docker a lot, I decided that it was time to spend some time with LXC as I tended to treat some of my docker containers like mini VMs anyway, especially when developing. I think a lot of the benefits of docker aren't actually benefits, and I'll be writing a follow-up post about that. To that end, I wanted to get LXC up and running.

### What's so hard?

I'm on a laptop with wireless, so I can't just create a bridge and give IPs to containers from an upstream DHCP server. I needed to do NAT and essentially simulate/replicate how docker networking works. My goals were:

- DHCP or some other auto-assignment of IPs
- Containers can see each other by hostname
- Containers can see the host, and other nodes on the network
- Containers can see the internet
- Have all of this networking transparently work and persist across reboots

### General approach

- Create a bridge interface
- Set up IP forwarding and masquerading
- Set up [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html) as a DHCP server
- profit?

In practice, these things didn't work out so well.

### Problem 1: netctl

[Netctl](https://wiki.archlinux.org/index.php/Netctl) was the recommended choice for a while on Archlinux systems. Now that systemd is taking over, it seems like more and more support is coming over to [systemd-networkd](https://wiki.archlinux.org/index.php/Systemd-networkd). I asked for help in chat and 3 people immediately were like "why are you still using netctl?"I ran into a bit of trouble creating a netctl profile to create a bridge on boot. While I could have made this work (and the end solution would have had me not touch netctl at all), I ended up yak shaving and switching to systemd-networkd. It was mostly painless with 1 hiccup:

### Problem 2: systemd-networkd ip forwarding defaults

By default, systemd-networkd does not honor _sys.net.ipv4.ip_forward_. It instead creates a per-interface setting that defaults to no. This means that you need to explicitly set IPForward and IPMasquerade on your bridges. This includes the docker0 interface, which silently broke upon switching to systemd-networkd. It's at least related to [this bug report](https://bugs.freedesktop.org/show_bug.cgi?id=89509).

### Back to sanity

So we are now on systemd-networkd, which more easily allows us to define bridges and we have something roughly like this:

docker0.network

    [Match]
    Name=docker0

    [Network]
    IPForward=yes

wired.network

    [Match]
    Name=eth0

    [Network]
    DHCP=ipv4

    [DHCP]
    RouteMetric=10

wireless.network

    [Match]
    Name=wlan0

    [Network]
    DHCP=ipv4

    [DHCP]
    RouteMetric=20

### Now what

We haven't even started making LXC work yet, let's do that now. The first approach is to create a bridge interface for just LXC, so let's do that

lxcbr0.netdev

    [NetDev]
    Name=lxcbr0
    Kind=bridge

lxcbr0.network

    [Match]
    Name=lxcbr0

    [Network]
    Address=10.0.100.1
    IPForward=yes
    IPMasquerade=yes

To use this, add something like the following to a config for your lxc container:

    lxc.network.type = veth
    lxc.network.flags = up
    lxc.network.link = lxcbr0

This will work, but requires you to specify an IP for the container statically. Let's add dnsmasq:

    dhcp-range=10.0.100.100,10.0.100.200,12h
    interface=lxcbr0

After this, you'll notice that it still doesn't work. You need an iptables rule to handle some checksum mistakes

    iptables -t mangle -A POSTROUTING -o lxcbr0 -p udp -m udp --dport 68 -j CHECKSUM --checksum-fill

So far we've mostly got this handled by configuration files, but this checksum mangling is a manual step with no great place to automatically handle it. After a bit of looking around, Archlinux ships with a lxc-net systemd unit, which seems to do what I need. It's a bit tricky to setup, and needs some interaction with systemd-networkd:

- The bridge can't already exist, so we need to get rid of the lxcbr0.netdev file
- The bridge still needs systemd-networkd style masquerading, so we keep the lxcbr0.network file (remove the address line)

You also need to tell lxc-net that you want to use the bridge, so in /etc/default/lxc, change USE_LXC_BRIDGE to true. As a bonus, lxc-net handles dnsmasq for you, so you can get rid of that unit.

### Final results

The units you should have enabled are:

- wpa_supplicant@wlan0
- systemd-networkd
- systemd-resolved
- lxc-net

/etc/systemd/network/docker0.network

    [Match]
    Name=docker0

    [Network]
    IPForward=yes

/etc/systemd/network/lxcbr0.network

    [Match]
    Name=lxcbr0

    [Network]
    IPForward=yes
    IPMasquerade=yes

/etc/default/lxc

    LXC_AUTO="true"
    BOOTGROUPS="onboot,"
    SHUTDOWNDELAY=5
    OPTIONS=
    STOPOPTS="-a -A -s"
    USE_LXC_BRIDGE="true"
    [ ! -f /etc/default/lxc-net ] || . /etc/default/lxc-net

On the next reboot, you should have:

- A working docker0 interface (if you are keeping docker around)
- An lxcbr0 interface with an IP associated with it
- Starting LXC containers should grab a natted IP automatically via DHCP

As a bonus, LXC containers can address each other by hostname, and docker containers and lxc containers can see each other by IP. Some more dnsmasq magic could maybe clear some of that up even further.

The end resulting files make it seem like this is an easy problem, but the details of wireless not supporting actual bridging, netctl being flaky, systemd having unexpected ip_forwarding defaults, DHCP missing checksums, and lxc-net being a bit picky about how it gets started actually caused this exploration to take a few hours.
