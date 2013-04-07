---
layout: page
title: Bryan's Blah Blog
tagline: Stuff
---
{% include JB/setup %}

## Posts

<ul class="posts">
  {% for post in site.posts %}
  <li>
    <span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a>  
    <br />
    {{ post.content | strip_html | truncatewords:75}}<br/>
    <a href="{{ post.url }}">Read more...</a>
  </li>
  {% endfor %}
</ul>

## About me

My name is Bryan Alves, and I'm a software engineer in the Boston area.  I mostly work on web applications using a variety of technologies.  Here are some links for more information about me:

* [Facebook](https://www.facebook.com/bryanalves)
* [Github](https://www.github.com/bryanalves)
* [Twitter](https://www.twitter.com/bryanalves)
* [LinkedIn](https://www.linkedin.com/in/bryanalves)
* [Resume](https://dl.dropbox.com/u/51369407/resume.pdf)
