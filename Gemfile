source 'https://rubygems.org'

ruby '2.1.1'


require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'rack-jekyll'
gem 'github-pages', versions['github-pages']