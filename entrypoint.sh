#!/bin/bash +x
cd /backend
python manage.py makemigrations blog_service || exit 1
python manage.py migrate || exit 1
cd assets
python ../manage.py shell < ./create_users.py || exit 1
echo "Server is running at 127.0.0.1:8000..."
python ../manage.py runserver 0.0.0.0:8000 --noreload


