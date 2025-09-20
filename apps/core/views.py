from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from django.views import View
from django.contrib.auth.models import auth
from django.contrib import messages
from django.shortcuts import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from .models import QuestionsUser, Profile, Cat, Breed
from django.views.generic import TemplateView
from django.urls import reverse_lazy
from django.contrib.auth.views import LoginView
import json

# Create your views here.

User = get_user_model()

class MainPage(TemplateView):
    def get(self, request):
        user_object = request.user
        context = {'active_section': 'main'}
        user_profile = None

        if user_object:
            try:
                user_profile = Profile.objects.get(user=user_object)
                print(user_profile)
                context = {'active_section': 'main',
                        'user_object': user_object,
                        'user_profile': user_profile,}
            except:
                context = {'active_section': 'main'}
        
        return render(request, 'index.html', context)

    def post(self, request):
        try:
            form_data = json.loads(request.body.decode('utf-8'))

            fullname = form_data.get('fullname')
            email = form_data.get('email')
            phone_number = form_data.get('phone_number')
            theme = form_data.get('theme')
            description = form_data.get('description')

            QuestionsUser.objects.create(fullname=fullname, email=email, phone_number=phone_number, theme=theme, description=description)

            return HttpResponse(status=200)
        except:
            return HttpResponse(status=400)


def register(request):
    context = {'active_section': 'register'}
    
    if request.method == 'POST':
        username = request.POST['username']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        password = request.POST['password']
        password_confirm = request.POST['password_confirm']

        print(username, first_name, last_name, email, password, password_confirm)
        
        if password_confirm != password_confirm:
            return JsonResponse({'errorMessage': 'passwords don\'t match'}, status=400)
            
        if len(password) < 8 and len(password) > 22:
            return JsonResponse({'errorMessage': 'password should be between 8 and 22 characters'}, status=400)
        
        if len(first_name) < 2 or len(last_name) < 2:
            return JsonResponse({'errorMessage': 'first name and last name should be at least two characters long'}, status=400)
        
        if len(username) < 10 and len(username) > 25:
            return JsonResponse({'errorMessage': 'username should be between ten and 25 characters long'}, status=400)
        
        if User.objects.filter(username=username).exists():
            return JsonResponse({'errorMessage': 'User with this username already exists'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'errorMessage': 'This email is already used by another user'}, status=400)

        user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, email=email, password=password)
        Profile.objects.create(user=user)
        return redirect('login')
    
    else:
        return render(request, 'register.html', context)


class CustomLoginView(LoginView):
    template_name = 'login.html'
    redirect_authenticated_user = True
    extra_context = {'active_section': 'login'}

    def form_invalid(self, form):
        messages.error(self.request, 'Invalid credentials')
        return super().form_invalid(form)

    def get_success_url(self):
        user_id = self.request.user.pk
        return reverse_lazy('profile', kwargs={'pk': user_id})


def login(request):
    context = {'active_section': 'login'}

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            auth.login(request, user)
            user_id = user.username
            profile_url = reverse('profile', kwargs={'pk': user_id})
            return redirect(profile_url)
        else:
            print('No!')
            messages.info(request, 'Credentials Invalid')
            return redirect('login')

    else:
        return render(request, 'login.html', context)

def forum(request):
    context = {'active_section': 'forum'}
    return render(request, 'forum.html', context)

def exhibitions(request, number):
    if number == 1: 
        context = {'active_section': 'exhibitions', 'text': '✨ До уваги шанувальників театру! Запрошуємо вас на захоплюючу виставу "Незабутні моменти". Підготуйтеся до захоплюючого та емоційного театрального досвіду, який залишить вам незабутні враження.🎉 "Незабутні моменти" - це сучасна драма, яка перенесе вас у світ емоцій, почуттів та непередбачуваних сюжетних поворотів. Глибокі персонажі, захоплююча історія та майстерне виконання акторів гарантують вам незабутні враження.', 'title': '🎭 Неймовірна вистава "Незабутні моменти"', 'exhb': 'URaniauM!', 'moto': 'Me too!'}
    elif number == 2:
        context = {'active_section': 'exhibitions', 'text': '✨ Відчуйте магію моменту! Запрошуємо вас на захоплюючу премєру вистави "Межі світла". Погрузьтесь у світ театру та насолоджуйтесь незабутнім шоу, яке відкриє перед вами нові горизонти.', 'exhb': '🎭 Нова вистава "Межі світла"!', 'moto': 'Little bit!', 'title': 'mira!'}
    else:
        context = {'active_section': 'exhibitions'}

    return render(request, 'exhibitions.html', context)

@login_required(login_url='login')
def profile(request, pk):        
    user_object = request.user
    user_profile = Profile.objects.get(user=user_object)
    cats = Cat.objects.filter(profile=user_profile)
    breed_objects = Breed.objects.all()
    names = [breed.name for breed in breed_objects]    
    print(names)

    context = {
        'user_object': user_object,
        'user_profile': user_profile,
        'cats': cats,
        'breeds': names,
    }

    if request.method == "POST":
        name = request.POST['name']
        breed = request.POST['breed']
        sex = request.POST['sex']
        age = request.POST['age']
        color = request.POST['color']
        image = request.FILES['image']

        breed = Breed.objects.get(name=breed)

        if image:
            Cat.objects.create(profile=user_profile, name=name, breed=breed, sex=sex, age=age, color=color, image=image)
        else: 
            Cat.objects.create(profile=user_profile, name=name, breed=breed, sex=sex, age=age, color=color)

    return render(request, 'profile.html', context)


@login_required(login_url='login')
def logout(request):
    auth.logout(request)
    return redirect('login')

@login_required(login_url='login')
def settings(request):
    user_object = request.user
    user_profile = Profile.objects.get(user=user_object)

    if request.method == "POST":
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        email = request.POST.get('email')
        profileimg = request.POST.get('profileimg')
        bio = request.POST.get('bio')
        location = request.POST.get('location')

        user_object.first_name = first_name
        user_object.last_name = last_name
        user_object.email = email
        user_object.save()

        if profileimg:
            user_profile.profileimg = profileimg
        user_profile.bio = bio
        user_profile.location = location
        user_profile.save()

        profile_url = reverse('profile', kwargs={'pk': user_object.pk})
        return redirect(profile_url)
    else:
        context = {'active_section': 'settings',
                   'user_object': user_object,
                   'user_profile': user_profile,
                   }
        return render(request, 'settings.html', context)
