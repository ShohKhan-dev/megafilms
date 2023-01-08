from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import ast
import requests
import json



app = Flask(__name__)
api = Api(app)




class Users(Resource):

    def get(self):

        print(request.args.get('username'))
       
        data = [{"name":"Some name", "age":19, "gender": "male", "Edu": "BS"}, 
                {"name":"Some ", "age":19, "gender": "male", "Edu": "BS"}]

        return {'data': data}, 200  # return data and 200 OK

    
class Trending(Resource): # https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}
    
    def get(self):  # http://127.0.0.1:5000/trending?api_key=a500ed6497632b594464be767b4d390d&page=1

        api_key = request.args.get('api_key')
        page = request.args.get('page')

        response_API = requests.get('https://api.themoviedb.org/3/trending/all/week?api_key={}&page={}'.format(api_key, page))
        data = response_API.json()
        return data, 200

class Series(Resource): # https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}
    
    def get(self): # http://127.0.0.1:5000/series?api_key=a500ed6497632b594464be767b4d390d&page=1&with_genres=10759,16

        api_key = request.args.get('api_key')
        page = request.args.get('page')
        with_genres = request.args.get('with_genres')

        response_API = requests.get('https://api.themoviedb.org/3/discover/tv?api_key={}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page={}&with_genres={}'.format(api_key, page, with_genres))
        data = response_API.json()

        return data, 200

class Movies(Resource): # https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}
    
    def get(self): # http://127.0.0.1:5000/movies?api_key=a500ed6497632b594464be767b4d390d&page=1&with_genres=28,53

        api_key = request.args.get('api_key')
        page = request.args.get('page')
        with_genres = request.args.get('with_genres')

        response_API = requests.get('https://api.themoviedb.org/3/discover/movie?api_key={}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page={}&with_genres={}'.format(api_key, page, with_genres))
        data = response_API.json()

        return data, 200

class Search(Resource):   # https://api.themoviedb.org/3/search/${mytype}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false
    
    def get(self): # http://127.0.0.1:5000/search?mytype=person&api_key=a500ed6497632b594464be767b4d390d&query=max&page=1

        api_key = request.args.get('api_key')
        page = request.args.get('page')
        mytype = request.args.get('mytype')
        searchText = request.args.get('query')

        response_API = requests.get('https://api.themoviedb.org/3/search/{}?api_key={}&language=en-US&query={}&page={}&include_adult=false'.format(mytype, api_key, searchText, page))
        data = response_API.json()

        return data, 200



class Actor(Resource):   # https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    
    def get(self): # http://127.0.0.1:5000/actor?id=1&api_key=a500ed6497632b594464be767b4d390d

        api_key = request.args.get('api_key')
        id_ = request.args.get('id')

        response_API = requests.get('https://api.themoviedb.org/3/person/{}?api_key={}&language=en-US'.format(id_, api_key))
        data = response_API.json()

        return data, 200



class MovieCredit(Resource): # https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    
    def get(self): # http://127.0.0.1:5000/movie_credits?id=1&api_key=a500ed6497632b594464be767b4d390d

        api_key = request.args.get('api_key')
        id_ = request.args.get('id')

        response_API = requests.get('https://api.themoviedb.org/3/person/{}/movie_credits?api_key={}&language=en-US'.format(id_, api_key))
        data = response_API.json()

        return data, 200


class TvCredit(Resource): # https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    
    def get(self): # http://127.0.0.1:5000/tv_credits?id=1&api_key=a500ed6497632b594464be767b4d390d

        api_key = request.args.get('api_key')
        id_ = request.args.get('id')

        response_API = requests.get('https://api.themoviedb.org/3/person/{}/tv_credits?api_key={}&language=en-US'.format(id_, api_key))
        data = response_API.json()

        return data, 200



class CaruselCredit(Resource): # https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    
    def get(self): # http://127.0.0.1:5000/carusel?media_type=movie&id=718930&api_key=a500ed6497632b594464be767b4d390d

        api_key = request.args.get('api_key')
        id_ = request.args.get('id')
        media_type = request.args.get('media_type')


        response_API = requests.get('https://api.themoviedb.org/3/{}/{}/credits?api_key={}&language=en-US'.format(media_type, id_, api_key))
        data = response_API.json()

        return data, 200


class ModalData(Resource): # https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    
    def get(self): # http://127.0.0.1:5000/modal_data?media_type=movie&id=718930&api_key=a500ed6497632b594464be767b4d390d

        api_key = request.args.get('api_key')
        id_ = request.args.get('id')
        media_type = request.args.get('media_type')


        response_API = requests.get('https://api.themoviedb.org/3/{}/{}?api_key={}&language=en-US'.format(media_type, id_, api_key))
        data = response_API.json()

        return data, 200


class ModalVideo(Resource): # https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    
    def get(self): # http://127.0.0.1:5000/modal_video?media_type=movie&id=718930&api_key=a500ed6497632b594464be767b4d390d

        api_key = request.args.get('api_key')
        id_ = request.args.get('id')
        media_type = request.args.get('media_type')


        response_API = requests.get('https://api.themoviedb.org/3/{}/{}/videos?api_key={}&language=en-US'.format(media_type, id_, api_key))
        data = response_API.json()

        return data, 200


class Genres(Resource): # https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US
    
    def get(self): # http://127.0.0.1:5000/genre?type=movie&api_key=a500ed6497632b594464be767b4d390d

        api_key = request.args.get('api_key')
        type_ = request.args.get('type')


        response_API = requests.get('https://api.themoviedb.org/3/genre/{}/list?api_key={}&language=en-US'.format(type_, api_key))
        data = response_API.json()

        return data, 200



class Img300(Resource): # https://image.tmdb.org/t/p/w300/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg
    
    def get(self): # http://127.0.0.1:5000/w300?id=/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg
        id_ = request.args.get('id')

        response_API = requests.get('https://image.tmdb.org/t/p/w300/{}'.format(id_))

        data = response_API
        print(data)

        return {"data":{}}, 200
        



class Img500(Resource):
    def get(self):
        pass



api.add_resource(Users, '/users')  # '/users' is our entry point for Users
api.add_resource(Trending, '/trending')  # and '/locations' is our entry point for Locations
api.add_resource(Series, '/series')
api.add_resource(Movies, '/movies')
api.add_resource(Search, '/search')

api.add_resource(Actor, '/actor')
api.add_resource(MovieCredit, '/movie_credit')
api.add_resource(TvCredit, '/tv_credit')
api.add_resource(CaruselCredit, '/carusel')
api.add_resource(ModalData, '/modal_data')
api.add_resource(ModalVideo, '/modal_video')
api.add_resource(Genres, '/genre')

api.add_resource(Img300, '/w300')


if __name__ == '__main__':
    app.run() 