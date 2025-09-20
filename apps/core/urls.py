from django.urls import path
from . import views 
from .views import CustomLoginView

urlpatterns = [
    path('', views.MainPage.as_view(), name='index'),
    path('register', views.register, name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('forum', views.forum, name='forum'),
    path('exhibitions/<int:number>', views.exhibitions, name='exhibitions'),
    path('profile/<str:pk>/', views.profile, name='profile'),
    path('logout', views.logout, name='logout'),
    path('settings', views.settings, name="settings")
]