---
title: "Upgrading to MiniTest"
publishDate: 2013-06-12
tags: [programming,ruby]
---

There are a lot of testing frameworks out there for Rails.  A lot of work has been done in the community over the past few years, and it's important to stay up to date with the latest in testing.  Minitest is something that's fairly old and stable at this point, but it provides a nice, clean, standardized testing interface with enough extensions to support other testing methodologies as well.

### What about RSpec?

RSpec is great, and it's full featured and awesome.  If you are using RSpec, feel free to continue.  Lots of things have support for it, and there's a great environment around RSpec.

### MiniTest::Unit or MiniTest::Spec

Minitest's biggest strength is it's ability to straddle the xUnit/spec line, seamlessly transitioning between the two.  In my opinion, spec-style tests are better and the way to go.  They more cleanly and succinctly express intention of the test.  However, they aren't always appropriate, and falling back to standard xUnit assertions is very helpful.

Additionally, MiniTest::Spec gets surprisingly close to the ability of RSpec, especially with some of the extra expectation gems.

### Extension versus replacement

Things like shoulda attempted to make testing better by providing alternatives.  With the exception of RSpec, these alternatives have simply diluted the choice of testing frameworks.  MiniTest is different in that it's modular and plugin-based, so everything stays coherent, even with significant additions.  There's a large list of extensions available on [Github](https://github.com/seattlerb/minitest).

### The way forward

If you like spec-style tests, then gradually start going file-by-file through your test suite and do the conversion.  Once you are done, you get the satisfaction of using a single testing tool, more readable tests, and probably faster test execution.
