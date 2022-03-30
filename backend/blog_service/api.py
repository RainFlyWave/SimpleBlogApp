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
  
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):

    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = User.objects.filter(username=username).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, os.environ.get('SECRET_KEY'), algorithm='HS256')
        response = Response()

        response.set_cookie(key='token', value=token, httponly=True)
        response.data = {
            'token': token
        }

        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('token')

        if not token:
            raise AuthenticationFailed('Unauthenticated access')

        try:
            payload = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated access')


        user = User.objects.get(id=payload['id'])
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):

    def post(self, request):
        response = Response()
        response.delete_cookie('token')
        response.data = {
            'message': 'logout success'
        }

        return response