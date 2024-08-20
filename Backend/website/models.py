from django.db import models

class TaskModel(models.Model):
    task = models.CharField(max_length=350)
    created_date = models.DateField(auto_now=True)

    def __str__(self):
        return self.task
