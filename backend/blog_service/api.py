
from turtle import update
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from blog_service.models import UserDetails
from blog_service.serializers import UserSerializer, EntrySerializer, DetailsSerializer
# from django.contrib.auth.models import User
from blog_service.models import User
from rest_framework.exceptions import AuthenticationFailed
from blog_service.models import Entry, EntryStats
import jwt
import datetime
import os
import pandas as pd



def token_decode(token):
    if not token:
        raise AuthenticationFailed('Unauthenticated access')
    try:
        payload = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated access')


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
            'token': token,
        }

        return response


class UserView(APIView):

    def get(self, request):
        #   Get a token cookie from cookies
        token = request.COOKIES.get('token')

        #   Send a message if token doesnt exist
        payload = token_decode(token)

        #   If everything is allright, send appropriate response
        user = User.objects.get(id=payload['id'])
        details = DetailsSerializer(UserDetails.objects.get(username=user))
        return Response(details.data)

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
        response.delete_cookie('isAuth')
        response.data = {
            'message': 'So long, my friend...',
  
        }

        return response


#   View made for lsiting entries related to the author
class EntriesView(ListAPIView):
    serializer_class = EntrySerializer

    def get_queryset(self):
         #   Get a token cookie from cookies
        token = self.request.COOKIES.get('token')

        payload = token_decode(token)

        #   If everything is allright, send appropriate response
        user = User.objects.get(id=payload['id'])
        return Entry.objects.filter(author_name=user).order_by('-date_created')

     
class CreateEntryView(APIView):
    def post(self, request):
         #   Get a token cookie from cookies
        token = request.COOKIES.get('token')
        #   Send a message if token doesnt exist
        payload = token_decode(token)

        # variable that stores current User object
        user = User.objects.get(id=payload['id'])

        # check if entry_stats model exists for day that user posted blog entry
        # print(datetime.datetime.now().date())
        try:
            entry_stats = EntryStats.objects.filter(entry_author_name=user).order_by('-entry_date_created').first()
            if entry_stats.entry_date_created.date() == datetime.datetime.now().date():
                
                # if object exists, add 1 to an existing value of entry_amount
                if entry_stats.entry_amount >= 4096:
                    response_data={
                    "reponse": "You have reached maximum amount of entries for today. Take a quick nap."
                    }
                    return Response(response_data, status=status.HTTP_406_NOT_ACCEPTABLE)
                entry_stats.entry_amount = entry_stats.entry_amount + 1
                entry_stats.save()
            else:
                EntryStats.objects.create(entry_author_name=user, entry_amount=1).save()
        except AttributeError:
            # if record doesnt exist, create a new one
            # entry_amount starts at the value of 1
            EntryStats(entry_author_name=user, entry_amount=1).save()

        
        entry = Entry(author_name=user,blog_entry=request.data['blog_entry'])
        entry.save()

        response_data={
            "reponse": "Entry created"
        }
        return Response(response_data)

class DeleteEntryView(APIView):
    def post(self, request):
        token = request.COOKIES.get('token')
        #   Send a message if token doesnt exist
        payload = token_decode(token)

        #   If everything is allright, send appropriate response
        entry = Entry.objects.get(pk=request.data['pk'])
        entry.delete()
        return Response({"response": "Entry deleted successfully"})

class EditEntryView(APIView):
    def post(self, request):
        token = request.COOKIES.get('token')
        #   Send a message if token doesnt exist
        payload = token_decode(token)

        #   If everything is allright, send appropriate response
        entry = Entry.objects.get(pk=request.data['pk'])
        entry.blog_entry = request.data['entry']
        entry.date_created = datetime.datetime.now()
        entry.save()
        
        return Response({"response": "Entry updated successfully"})

class UploadPhotoView(APIView):
    def post(self,request):
        token = request.COOKIES.get('token')
        #   Send a message if token doesnt exist
        payload = token_decode(token)

       
        
        #   If everything is allright, send appropriate response
        
        user = User.objects.get(id=payload['id'])
        updated_photo = UserDetails.objects.get(username=user)
        photo = request.data['photo']
        updated_photo.profile_pic = photo
        updated_photo.save()

        return Response({"response": "Photo updated successfully"})

class UserDescriptionView(APIView):
    def post(self,request):
        token = request.COOKIES.get('token')
        #   Send a message if token doesnt exist
        payload = token_decode(token)
        
        #   If everything is allright, send appropriate response
        
        user = User.objects.get(id=payload['id'])
        updated_description = UserDetails.objects.get(username=user)
        if 'description' in request.data.keys():
            description = request.data['description']
            updated_description.user_description = description
            updated_description.save()
        
        if 'themeColor' in request.data.keys():
            color = request.data['themeColor']
            print(color)
            updated_description.user_profile_color = color
            print(updated_description.user_profile_color)
            updated_description.save()

        return Response({"response": "Description updated successfully"})


class UserDetailsGraph(APIView):
    def post(self, request):
        token = request.COOKIES.get('token')
        payload = token_decode(token)
        user = User.objects.get(id=payload['id'])
        userdetails = EntryStats.objects.filter(entry_author_name=user)

        basic_dict = {}
        for i in userdetails:
            basic_dict[i.entry_date_created.strftime('%m-%d-%Y')] = i.entry_amount
        today = datetime.datetime.now().strftime('%m-%d-%Y')
        month_ago = (datetime.datetime.now() - datetime.timedelta(days=30)).strftime('%m-%d-%Y')

        idx = pd.date_range(month_ago, today)
        series = pd.Series(basic_dict)
        series.index = pd.DatetimeIndex(series.index)
        amount_of_entries = series.reindex(idx, fill_value=0)
        date_of_entry = [str(i)[:10] for i in amount_of_entries.index]
        import time
        # time.sleep(3)
        return Response({'axisX': date_of_entry, 'axisY': amount_of_entries})