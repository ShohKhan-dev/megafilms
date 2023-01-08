import requests
import json


api_key = "a500ed6497632b594464be767b4d390d"

page = 1





response_API = requests.get('https://api.themoviedb.org/3/trending/all/week?api_key={}&page={}'.format(api_key, page))
#print(response_API)
data = response_API.json()
print(data)