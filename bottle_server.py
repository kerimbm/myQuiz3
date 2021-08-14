#!/usr/bin/env python

import os, time
from bottle import route, run, static_file, template, view



@route("/quiz/<name>")
@view("index")
def hello(name):
    return dict(name=name)



@route('/quiz/css/<filename>')
def img_static(filename):
    return static_file(filename, root='./static/css')

@route('/quiz/font/<filename>')
def img_static(filename):
    return static_file(filename, root='./static/font')

@route('/quiz/img/<filename>')
def img_static(filename):
    return static_file(filename, root='./static/img')

@route('/quiz/js/<filename>')
def js_static(filename):
    return static_file(filename, root='./static/js')

@route('/quiz/json/<filename>')
def vid_static(filename):
    return static_file(filename, root='./static/json')

@route('/quiz/prism/<filename>')
def vid_static(filename):
    return static_file(filename, root='./static/prism')


@route("/quiz/QuizCreator")
@view("QuizCreator")
def hello2():
    return dict()







@route('/quiz/note/<name>/<idquiz>/<subTitle>/<points>/<total>')
def img_static(name, idquiz, subTitle, points, total):
    print(name + " - " + points + "/" + total)
    fichier = open("log.csv", "a")
    fichier.write("\n" + idquiz + ", " + time.strftime('%H:%M:%S, %d/%m/%y') + ", " + subTitle + ", " + points + ", " + total + ", " + name)
    fichier.close()
    






if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8030))
    run(
        host = '0.0.0.0',
        port = port,
        reloader = True,
        server = 'paste',
        debug = True
    )

