const Articles = require('../models/articles');
var ObjectID = require('mongodb').ObjectID;

class ArticlesInterface { 
  async getArticles(ctx) {
    const {
      page,sortId,pagesize
    } = ctx.query;
    const thePage = parseInt(page);
    const theSortId = parseInt(sortId);
    const thePagesize = parseInt(pagesize);
    
    let skip = (thePage-1) * thePagesize;
    if(theSortId == 0){
      const articles = await Articles.find({}).sort({create_data: -1}).skip(skip).limit(thePagesize);
      ctx.body = {
        status:1,
        articles:articles
      }
    }else if(theSortId == 1){
      const articles = await Articles.find({}).sort({read_count: -1}).skip(skip).limit(thePagesize);
      ctx.body = {
        status:1,
        articles:articles
      }
    }else {
      const articles = await Articles.find({}).sort({collect_count: -1}).skip(skip).limit(thePagesize);
      ctx.body = {
        status:1,
        articles:articles
      }
    }
    
    
  } 
}
module.exports = new ArticlesInterface();