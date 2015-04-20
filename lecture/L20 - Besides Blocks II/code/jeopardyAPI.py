""" Jeopardy """
""" by Dan Garcia       """
""" ...lots of values hardcoded, this was a quick-n-dirty API example """

import urllib.request
import json

def play_jeopardy():
    """Play the game of Jeopardy by calling Jeopardy API to get random Qs"""
    jeopardy_json_string = urllib.request.urlopen("http://jservice.io/api/random").read().decode()
    jeopardy_dict = json.loads(jeopardy_json_string)[0]
    print("TITLE:" + jeopardy_dict['category']['title'])
    print(jeopardy_dict['question'])
    input('(hit enter for answer)')
    print(jeopardy_dict['answer'])

if __name__ == '__main__':
    play_jeopardy()
