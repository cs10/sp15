# Printing is like saying
# Oh, b-t-dubs - this is a comment.
# It beings with a #
print('Welcome')

print(1 + 1)
print(2**10)
print(1024 % 10)

number = 1024

number = number + 1 # add 1
number += 1 # a shorter way to add 1
print(number) #1026

number /= 2 # Can't do this in Snap!

# Just like the join block
print('Hello ' + 'Goodbye')

name = 'BJC'
len(name)

# Let's count to 10:
# Note that we are ending at 11!
# In Python the range function is exclusive at the end
for i in range(1, 11):
    print(i)

fruit = [
    'orange',
    'pear',
    'apple',
    'lemon'
]

print(len(fruit))

# Pluralize the fruit
for item in fruit:
    print(item + 's')

import turtle
sprite = turtle.Turtle()
# make the directions be like snap!
turtle.mode("logo")

def koch(size, levels):
    if levels == 1:
        sprite.forward(size)
    else:
        koch(size/3, levels-1)
        sprite.left(60)
        koch(size/3, levels-1)
        sprite.right(120)
        koch(size/3, levels-1)
        sprite.left(60)
        koch(size/3, levels-1)


def snowflake(size, levels):
    for _ in range(3):
        koch(size, levels)
        sprite.right(120)


# speed it up
sprite.speed(0)
# pen down
sprite.pendown()
# draw!
snowflake(150, 5)