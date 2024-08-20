from rest_framework.serializers import ModelSerializer

from .models import TaskModel

class TaskModelSerializer(ModelSerializer):
    class Meta:
        model = TaskModel
        fields = "__all__"