import {articles_url,theme,apiKey} from '../../config/rest_config';

export async function getArticles(){
    
    try{
        let articles = await fetch(`${articles_url}?q=${theme}&apiKey=${apiKey}`,{
            headers:{
                'X-API-KEY': apiKey
            }
        });

        let result = await articles.json();
        articles = null;
        return result.articles
    }catch(error){
        throw error;
    }
}