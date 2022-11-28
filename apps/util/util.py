import random


def generate_color(transparency=1):
    rand_color = (random.randrange(255), random.randrange(255), random.randrange(255))
    color = "rgba({}, {}, {}, {})".format(rand_color[0], rand_color[1], rand_color[2], transparency)
    color_full = "rgba({}, {}, {}, {})".format(rand_color[0], rand_color[1], rand_color[2], 1)
    return color, color_full