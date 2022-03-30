
from rest_framework.response import Response
from rest_framework.views import APIView
from blog_service.serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt
import datetime
import os



class RegisterView(APIView):

    def post(self, request):
        
        #   Serialize request data using UserSerializer
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):

    def post(self, request):
        #   Get username and password from request
        username = request.data['username']
        password = request.data['password']

        #   Filter users from django.contrib.auth.models User model
        user = User.objects.filter(username=username).first()

        #   If user doesnt exist, send a message
        if user is None:
            raise AuthenticationFailed('User not found')
        
        # If password is wrong, send a message (i know this is terrible idea but i will get back to it)
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        #   Create jwt token after successfull Login attempt
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow()
        }

        #   Initialaze token
        token = jwt.encode(payload, os.environ.get('SECRET_KEY'), algorithm='HS256')
        response = Response()

        # Create HttpOnly cookie with token
        response.set_cookie(key='token', value=token, httponly=True)
        response.data = {
            'token': token
        }

        return response


class UserView(APIView):

    def get(self, request):
        #   Get a token cookie from cookies
        token = request.COOKIES.get('token')

        #   Send a message if token doesnt exist
        if not token:
            raise AuthenticationFailed('Unauthenticated access')

        #   Try to decode existing token, and check if valid
        try:
            payload = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated access')

        #   If everything is allright, send appropriate response
        user = User.objects.get(id=payload['id'])
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):

    def post(self,request):
        #   Checking if token cookie exists, if not, return message
        if 'token' not in request.COOKIES.keys():
            return Response({
            'message': 'You have to Login first!'
            })

        #   If token cookie exists, delete it and send a message    
        response = Response()
        response.delete_cookie('token')
        response.data = {
            'message': 'So long, my friend...',
  
        }

        return response