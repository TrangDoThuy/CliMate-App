# importing requests package
import requests


def getNews():

    # news related to environment api
    main_url = " https://newsapi.org/v2/everything?q=environment&apiKey=ba8b8f10b0e04f14a605f51cfc1dd033"

    # fetching data in json format
    open_bbc_page = requests.get(main_url).json()

    # getting all articles in a string article
    article = open_bbc_page["articles"]

    # empty list which will
    # contain all trending news
    results = []

    for ar in article:
        results.append(ar["title"])

    for i in range(len(results)):

        # printing all trending news
        print(i + 1, results[i])

    # fun stuff if you like :))
    # to read the news out loud for us
    #from win32com.client import Dispatch
    #speak = Dispatch("SAPI.Spvoice")
    # speak.Speak(results)


# Driver Code
if __name__ == '__main__':

    # function call
    getNews()
