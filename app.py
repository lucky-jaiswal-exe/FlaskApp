from flask import Flask, render_template, request
from pytube import YouTube
import os

app = Flask(__name__)


@app.route("/", methods=['POST', "GET"])
def show():

  return render_template('index.html')


@app.route("/getSongs", methods=["POST"])
def getSongs():
  dir_list = []
  if request.method == "POST":
    path = "/home/runner/VideoDownloader/static/songs"
    dir_list = os.listdir(path)
    print(dir_list)
  return dir_list


@app.route("/download", methods=["POST"])
def download():
  # info = {}
  data = []
  if request.method == "POST":
    print("post request occur")
    formatInp = request.form['format']
    linkInp = request.form['link']

    if (formatInp == "AUDIO"):
      yt = YouTube(linkInp)
      link = yt.streams.filter(only_audio=True)
      for i in range(len(link)):
        x = str(link[i]).split(" ")[3].replace("abr=", "").replace('"', '')
        data.append(x)

    elif (formatInp == "VIDEO"):
      yt = YouTube(linkInp)
      link = yt.streams.filter(progressive=True)
      for i in range(len(link)):
        x = str(link[i]).split(" ")[3].replace('res="', '').replace('"', '')
        data.append(x)

  return data


@app.route("/finalDownload", methods=["POST"])
def finalDownload():
  status = "False"
  if request.method == "POST":
    formatInp = request.form['format']
    linkInp = request.form['link']
    qInp = request.form['quality']

    if (formatInp == "AUDIO"):
      yt = YouTube(linkInp)
      link = yt.streams.filter(only_audio=True)
      for i in range(len(link)):
        x = str(link[i]).split(" ")[3].replace("abr=", "").replace('"', '')
        if (qInp == x):
          link[i].download("static//songs//")
          status = "True"

    elif (formatInp == "VIDEO"):
      yt = YouTube(linkInp)
      link = yt.streams.filter(progressive=True)
      for i in range(len(link)):
        x = str(link[i]).split(" ")[3].replace('res="', '').replace('"', '')
        if (qInp == x):
          link[i].download("static//videos//")
          status = "True"

    return status


if __name__ == "__main__":
  app.run(debug=True, host="0.0.0.0")

# # import OS module

# # Get the list of all files and directories
# path = "C://Users//Vanshi//Desktop//gfg"
# dir_list = os.listdir(path)

# print("Files and directories in '", path, "' :")

# # prints all files
# print(dir_list)
