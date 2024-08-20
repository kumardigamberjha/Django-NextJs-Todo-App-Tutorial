from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import TaskModel
from .serializers import TaskModelSerializer

@api_view(['GET'])
def Index(request):
    return Response({'data': "Success"}, status=200)


# GET
# POST
# PUT
# DELETE


# GET MEthod
@api_view(['GET'])
def GetTaskView(request):
    data = TaskModel.objects.all()
    ser = TaskModelSerializer(data, many=True)
    return Response({'ss': ser.data}, status=200)


@api_view(['POST'])
def CreateTaskView(request):
    data = request.data
    ser = TaskModelSerializer(data=data)

    if ser.is_valid():
        ser.save()
        print("Created")    
        return Response({'status':"Created"}, status=200)
    else:
        return Response({'status': f"Failed {ser.errors}"}, status=400)


@api_view(['PUT'])
def updateTaskView(request, id):
    taskdata = TaskModel.objects.get(id=id) 
    data = request.data
    ser= TaskModelSerializer(taskdata, data=data, partial=True)

    if ser.is_valid():
        ser.save()
        print("Updated")
        return Response({'status': "Updated"}, status=200)
    else:
        return Response({'Status: ': f"Filed {ser.errors}"}, status=400)
    

@api_view(['Delete'])
def DeleteView(request, id):
    data = TaskModel.objects.get(id=id)
    data.delete()
    return Response({'status': "Deleted"}, status=200)