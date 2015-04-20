""" BJC : Beauty and Joy of Computing """
""" Besides Blocks II code examples   """
""" Author: Dan Garcia, UC Berkeley   """
""" License: (CC BY-NC-SA 3.0)        """

import functools
import math

"""Let's start with our classic Acronym"""

def acronym(sentence):
    """Return the acronym of the input sentence."""
    return(functools.reduce(lambda L,R:L+R, (map(lambda word:word[0], filter(lambda word: len(word)>3, sentence.split(" "))))))

print("acronym('The United States of America') = " + acronym("The United States of America"))

"""Now, how about the list-of-functions --> equivalent-function"""

def compose(f,g):
    """Given two monadic functions f and g, return lambda(x),f(g(x))"""
    return lambda x: f(g(x))

def joinswap(s1,s2):
    """Return the string arguments reversed"""
    return s2+s1

def reverse(s):
    """Return the string reversed"""
    return functools.reduce(joinswap, s)  ## Simpler is return s[::-1]

def duplicate_front(s):
    """Return the string with the first letter duplicated"""
    return s[0] + s

def double(x):
    """Return double the input"""
    return x+x

frankenstein = functools.reduce(compose,[reverse,duplicate_front,double])

print("frankenstein('cal') = ", frankenstein('cal')) ## laclacc
