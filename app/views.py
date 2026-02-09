from django.shortcuts import render
from django.http import JsonResponse

def feed(request):
    feedEvents = [
        {
            "id": "evt1",
            "timestamp": "just now",
            "actor": {
                "username": "un-pixelated",
                "avatarUrl": "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
            },
            "activity": {
                "type": "REPO_STARRED",
            },
            "repo": {
                "owner": "blac-byte",
                "name": "currency",
                "description": "Django currency app",
                "lang": "Python",
            },
        },
        {
            "id": "evt2",
            "timestamp": "2 weeks ago",
            "actor": {
                "username": "surprised-pikachu",
                "avatarUrl": "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
            },
            "activity": {
                "type": "REPO_FORKED",
            },
            "repo": {
                "owner": "unibull",
                "name": "newforks",
                "description": "Pokemon API website",
                "lang": "C#",
            },
        },
    ]
    


    return JsonResponse(feedEvents, safe=False)
