from django.db import models

# Create your models here.

class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200,unique=True)

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=250)
    model_name = models.CharField(max_length=250)
    color = models.CharField(max_length=250)
    shoe_url = models.URLField(null=True)
    picture = models.URLField(null=True)
    bin = models.ForeignKey (
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )
