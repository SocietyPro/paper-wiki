paper-wiki
==========

Exploration of polymer.js and material design to build a replacement for our current wiki

As a Society Pro Developer I frequently use our wiki to share persistent
information with my fellow developers.

I dislike the number of steps and poorly organized pages of DokuWiki.

The Material Design philosophy uses simplicity, obvious information and obvious
controls to minimize user confusion.

Usage
-----

    $ git clone git@github.com/SocietyPro/paper-wiki.git; cd paper-wiki;
    $ npm install -g http-server #or any equivalent server
    $ http-server -c-1 -p 8000
    $ firefox localhost:8000

Design Goals:
-------------

Post `information` under a `topic`
Organize from `root` by including sub-topics

Implementation:
---------------

`/` goes to `root`

A topic (including root) is a container
