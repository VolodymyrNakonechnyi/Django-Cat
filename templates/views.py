from django.shortcuts import render

# Create your views here.

def index(request):
    context = {'active_section': 'main'}
    return render(request, 'index.html', context)

def register(request):
    context = {'active_section': 'register'}
    return render(request, 'register.html', context)

def login(request):
    context = {'active_section': 'login'}
    return render(request, 'login.html', context)

def forum(request):
    context = {'active_section': 'forum'}
    return render(request, 'forum.html', context)

def exhibitions(request):
    context = {'active_section': 'exhibitions'}
    return render(request, 'exhibitions.html', context)