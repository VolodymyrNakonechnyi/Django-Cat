from django.contrib import admin
from .models import Profile, Theme, PostLanguage, Post, Breed, Cat, QuestionsUser

# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'profileimg', 'location')
    list_filter = ('location',) 

class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'answered', 'id_theme', 'id_post_language')
    list_filter = (
        ('id_theme', 'answered', 'id_post_language', 'created_at')
    )
 

class CatAdmin(admin.ModelAdmin):
    list_filter = ('breed', 'sex')

class QuestionsUserAdmin(admin.ModelAdmin):
    list_display = ('fullname', 'theme', 'phone_number', 'email', 'answered', 'created_at',)
    list_editable = ('answered',)
    list_filter = ('answered', 'created_at',)

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Theme)
admin.site.register(PostLanguage)
admin.site.register(Post, PostAdmin)
admin.site.register(Breed)
admin.site.register(Cat, CatAdmin)
admin.site.register(QuestionsUser, QuestionsUserAdmin)
