
ILOSC_WPISOW = 3000
LOREM = """
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
"""
from django.contrib.auth.models import User
from blog_service.models import Entry
import os, django, csv
from random import randrange

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "blog_test.settings")
django.setup()



def wypelnij_userow():
    with open('users.csv', newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')
        for i in reader:
            
            User(email=str(i['email']),username=str(i['username']),password=123).save()
        

def wypelnij_wpisy():
    for i in range(ILOSC_WPISOW):
        q = Entry(blog_entry=f'{LOREM}', author_name=User.objects.order_by('?').first())
        q.save()


wypelnij_userow()
wypelnij_wpisy()

