from django.shortcuts import render
from django.http import HttpResponse
import datetime

def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>Olá Boa tarde! %s.</body></html>" % now
    return HttpResponse(html)

def home(request):

    return  render(request, 'manutencao/home.html')
    