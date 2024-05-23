---
title: "Languages to pay attention to"
publishDate: 2013-04-20
tags: [programming]
---

So now that we've established why languages and platforms are powerful, let's take a look at some languages that you should pay attention to:

### C

C trades everything else for speed. Most languages have bindings to C, so if you need to drop down to C in order to get fast things done, you can. It's development environment is good enough, and it's just what you use if you want to take something and make it faster.

If you need to write fast code, or convert existing code to fast code, you are likely going to end up working in C, at least a little bit.

### Java

Java is ubiquitous. There's a huge community around it, and a lot of work has gone into it -- and the JVM -- to make it a fast and reliable platform. With this huge community comes a lot of junk to sift through, and swaths of under-performing engineers and companies, but there are a lot of gems to learn from this community.

### Ruby

Speaking of gems, Ruby has taken rails and run with it, turning it into a successful platform that gets a lot of things right. Gems and bundler have made it easy for the community to grow and distribute shared code.

### Python

Like Ruby, Python has become a mainstream general purpose language. SciPy, NumPy, and Django have led the way in the growth of the community. Pypy is becoming a leader in code execution and JIT, concepts that will hopefully become more universally usable in the months and years to come.

### Javascript

This introduction of JIT and other advanced optimization techniques in V8 has made Javascript become a prevalent language not only in the client-side, but also in the server-side. Node has helped develop a whole new class of full-stack engineers; engineers that only need 1 primary language to do _everything_. While the merits of actually doing this are arguable, there is a lot of good work coming out of this camp, including pushes for event-based programming, especially concurrency concepts. A lot of these have been known about in acadamia for a while, but now there are some practical implementations of them.

### Scala

Where Java fails, Scala hopes to succeed. Java has helped the development of the JVM, which other people are now trying to build upon to build a better Java. Scala adds a robust typesystem and a whole host of other language features to Java that are poised to allow developers to write better code. Scala is another example of taking concepts from acadamia and putting them in a package that regular developers can use.

### Clojure

Lisp on the JVM. Lisp's community is small, and sometimes it's performance is suboptimal. By tapping into the JVM, Clojure hopes to get both the peformance and community behind it, turning Lisp into a mainstream powerhouse. Rich Hickey is a brilliant man, and even if Clojure doesn't succeed, he should be listened to, as he has very pragmatic, very well thought out ideas about how development should be.

### Go

Google's systems programming language, Go allows development of systems that would traditionally be written in C (web servers, messaging systems, etc), without the hassle of memory management. Furthermore, it provides a lot of essential tools, namely channels, that allow massively concurrent systems to be built easily and with less bugs. Erlang had this market a long time ago, but now Go has both a more traditional code syntax, as opposed to Erlang's prolog-inspired syntax, and the support of a major company, Google. Go is also more concerned with performance than Erlang ever was.

### Closing thoughts

This list is certainly biased, and are things that I care about. The goal of this list is to expose yourself to a variety of languages that will help you incorporate concepts into your daily work, whatever the language. This list is also very unix-centric; there is no C# for example. The goal of this list is to encourage you to learn some new concepts and hopefully make yourself a better programmer. Exposing yourself to new skills and new methods from other communities is the best way to make yourself better. Most importantly, know the right tool for the job, and understand what makes something the right tool for a given job.
