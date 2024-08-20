from django.urls import path

from . import views

urlpatterns = [
    path('', views.Index, name="index"),
    path('gettask/', views.GetTaskView, name="gettask"),
    path('createtask/', views.CreateTaskView, name="createtask"),
    path('updatetask/<int:id>/', views.updateTaskView, name="updatetask"),
    path('deletetask/<int:id>/', views.DeleteView, name="deletetask"),



]