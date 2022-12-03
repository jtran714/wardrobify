from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import BinVO,Shoe

# Create your views here.

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size"
    ]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "manufacturer",
        "color",
        "id",
    ]
    def get_extra_data(self, o):
        return {"bin":o.bin.bin_number}


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "shoe_url",
        "picture",
        "bin"
    ]
    encoders = {
        "bin": BinVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def list_shoes(request,bin_id=None):
    if request.method == "GET":
        if bin_id is not None:
            shoes = Shoe.objects.filter(bin=bin_id)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href=content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET","DELETE"])
def show_shoe(request, pk):
    if request.method == "GET":
        try:
            shoe = Shoe.objects.get(id=pk)
            return JsonResponse(
                shoe,
                encoder=ShoeDetailEncoder,
                safe=False,
            )
        except Shoe.DoesNotExist:
            return JsonResponse (
                {"message": "Shoe doesn't exist"},
                status=400,
            )
    else:
        try:
            count, _=Shoe.objects.filter(id=pk).delete()
            return JsonResponse (
                {"deleted": count > 0}
            )
        except Shoe.DoesNotExist:
            return JsonResponse(
                {"message": "Shoe does not exist"},
                status=400,
            )
    # else:
    #     try:
    #         content = json.loads(request.body)
    #         Shoe.objects.filter(id=pk).update(**content)
    #         shoe = Shoe.objects.get(id=pk)
    #         return JsonResponse (
    #             shoe,
    #             encoder=ShoeDetailEncoder,
    #             safe=False,
    #         )
    #     except Shoe.DoesNotExist:
    #         return JsonResponse (
    #             {"message": "Shoe doesn't exist"},
    #             status=400,
    #         )
