from django.db import models
from django.contrib.auth import get_user_model
import uuid 
from datetime import datetime

User = get_user_model()

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profileimg = models.ImageField(upload_to='profile_images', default='blank-profile-picture.png')
    bio = models.TextField(max_length=4000, blank=True)
    location = models.CharField(max_length=100, blank=True)
    def __str__(self):
        return self.user.username
    
    class Meta:
        ordering = ['user__username']  # Сортування за користувачами
        verbose_name_plural = 'Профілі'


class Theme(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Теми публікацій'
        

class PostLanguage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Мови публікацій'

class Post(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    caption = models.TextField()
    created_at = models.DateTimeField(default=datetime.now)
    answered = models.BooleanField(default=False)
    id_theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    id_post_language = models.ForeignKey(PostLanguage, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)

    class Meta:
        verbose_name_plural = 'Пости користувача'
        ordering = ['created_at'] # Сортування за датою пубкації допису користувачем


class Breed(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Котячі породи'


class Cat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    breed = models.ForeignKey(Breed, on_delete=models.CASCADE)
    sex = models.CharField(max_length=50)
    age = models.IntegerField()
    color = models.CharField(max_length=100) 
    image = models.ImageField(upload_to='profile_cats', default='kitty-profile.jpg')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Коти'

class QuestionsUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    fullname = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=100)
    theme = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    answered = models.BooleanField(default=False) 
    created_at = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.fullname

    class Meta:
        verbose_name_plural = 'Питання користувачів'