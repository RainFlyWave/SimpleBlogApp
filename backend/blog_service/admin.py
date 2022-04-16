from django.contrib import admin
from .models import Entry, EntryStats, UserDetails

@admin.register(Entry)
class WpisAdmin(admin.ModelAdmin):
    list_display = ('author_name','show_entry', 'date_serialization', )
    list_filter = ('date_created',)

    def show_entry(self, obj):
        '''Show first 15 characters of a blog_entry'''
        return f'{obj.blog_entry[:15]}...'

    def date_serialization(self,obj):
        '''Format DateTimeField into H:M:S, D/M/Y format'''
        return f'{obj.date_created.strftime("%H:%M:%S, %d/%m/%Y")}'

    class Meta:
        ordering = ('date_created',)
    
    show_entry.short_description = 'Entry <15'
    date_serialization.short_description = 'Date Created'



@admin.register(UserDetails)
class UserDetailsAdmin(admin.ModelAdmin):
    list_display = ('username', 'profile_pic', 'is_banned','user_profile_color')
    list_filter = ('is_banned',)

@admin.register(EntryStats)
class EntryStatsDetails(admin.ModelAdmin):
    list_display = ('entry_author_name','entry_date_created', 'entry_amount')
    list_filter = ('entry_date_created',)


    def entry_author_name(self, obj):
        return f"{obj.entry_author_name}"

    def entry_date_created(self,obj):
        '''Format DateTimeField into H:M:S, D/M/Y format'''
        return f'{obj.entry_date_created.strftime("%H:%M:%S, %d/%m/%Y")}'

    class Meta:
        ordering = ('entry_date_created',)

    entry_author_name.short_description = 'Author'
    entry_date_created.short_description = "Date"
    



    


    

