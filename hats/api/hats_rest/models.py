from django.db import models
# from django.urls import reverse

# Create your models here.
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True)


class Hats(models.Model):
    fabric = models.CharField(max_length=200)
    style_name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True)
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )

    # def get_api_url(self):
    #     return reverse("api_show_hat", kwargs={"pk": self.pk})

    # def __str__(self):
    #     return f'This is a {self.color} {self.style_name} in {self.location}'



