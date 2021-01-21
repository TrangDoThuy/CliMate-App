# CliMate-App
## High Level Design

## NLP design
### Input data: 
+ You can run file get_data.py to get the data from NewsAPI. Please change the key API in url link to your key API if exceed the limit :))

https://newsapi.org/

### 2 main points:
+ classification: ? how can we label articles
[
![Screenshot 2020-12-29 123610](https://user-images.githubusercontent.com/30380242/105354141-1922eb00-5c2b-11eb-8008-de6b0edebf83.jpg)
](url)
+ chatbot: answer questions related to environment and climate change
![Screenshot 2021-01-21 205803](https://user-images.githubusercontent.com/30380242/105354335-62733a80-5c2b-11eb-96ba-e555e76e886b.jpg)




Based on https://github.com/deepset-ai/haystack
### Output:
Use FastAPI to send data to mobile app backend
