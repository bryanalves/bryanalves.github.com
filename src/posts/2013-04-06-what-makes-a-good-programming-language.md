---
title: "What makes a good programming language"
publishDate: 2013-04-06
tags: [programming]
---

There are a lot of programming languages available, and a lot of reasons to pick one over the other.

## It's all about power, right?

One thing that people discover as they work with languages is that some languages are more powerful than others. What does this mean exactly? Aren't most languages Turing complete? At some level, it's a matter of expressivity. Some languages are better at expressing concepts succinctly than others. Lisp is a good example of this. It's extreme ability to metaprogram makes it the most expressive language available.

Why then isn't it regularly used everywhere? If power and expressivity were all that mattered, then Lisp would dominate everything.

## Library and 3rd party support

Another critical component of a language is it's library support. Sure, Lisp might allow someone to write a web server in only a few dozen lines of code, but this reinvention of the wheel misses the point. Ruby developers will just add some gems, Python developers will hit up PyPi, Perl developers will go to CPAN, etc. Lisp has a set of libraries available, but it's not nearly as robust as what's provided by other, more popular languages.

This is one of the reasons why Node has taken off; it embraced library support immediately, and npm has provided a rich environment for developers to work with.

## Development environment

Another important aspect is strength of development environment. This is an area where Lisp shines; it's ability to be metaprogrammed makes things like Emacs work wonderfully with it. Here also is why Java and .NET are prevalent; Eclipse, NetBeans, and Visual Studio make up for other lackluster components of the languages.

## Consistent implementation

Lisp doesn't really have a de facto implementation. Common Lisp is a standard, but implementation of the standard isn't very widespread. This makes an already small community become somewhat fractured around implementatons. Python and Ruby don't have this problem because they do have a de facto implementation, and that de facto implementation (CPython, and MRI) occupies a huge majority of the market. PyPy, JRuby, etc. are useful and great, but they don't drive progress of the language. They also still identify at Python or Ruby programmers.

On the contrary, SBCL and Clojure don't have this property.

## Community

This is a bit of a chicken and egg problem. Some languages are better than others because their communities are larger. Have a problem? You'll be much more likely to get a response from a community of hundreds of thousands of developers than a community with orders of magnitude less than that.

## What about other languages?

So far I've primarily talked about Lisp, Ruby, and Python. Lisp is a powerful language, but it misses out on library support, and a consistent implementation. Ruby and Python are nearly as powerful, have tremendous libraries, reasonable development tools, and consistent implementations. What about other languages? Well, that's an analysis for another time.

## What does this mean?

There's more to a language than just it's syntax, how easy it is to install, or what features it has. Everything mentioned here matters. As a perfect counter-example, consider Javascript. From a language strength point of view, it's not very great. It's syntax is bad enough that CoffeeScript was written as a preprocessor for the language. However, it's still a wildly popular language, and that is because of a large community, among other things.

## How do I make my language popular?

As a language developer, you must:

- Make it easy for reusable libraries to be built, distributed, and publicized. Gems, Pypi, CPAN, NPM, etc. should all be motivations. If your language doesn't have something that compares, you likely won't be successful.

- Make development easy. Ensure that text editor support is good. Users of Vim or Emacs should want to use your language. If appropriate, work well with Eclipse or NetBeans. If you are huge like Microsoft, build your own world class IDE. Ensure that debugging support is good. If developers have to rely solely on print statements, you are in trouble.

- Take control of your implementation. Do more than just release a spec for your language; release an implementation, and make sure it's good.

- Build the community, and market your language. Javascript might be bad, but node marketed itself, and now it's huge. Make sure you are active in programming circles, attracting people. Have a presence on IRC. Have mailing lists. You want people more than using your language, you want them creating a community around it. Your goal should be to have a conference named after your language that people aspire to go to.
