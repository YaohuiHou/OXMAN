import fetch from './ajax'

const HTTP_DEV = 'http://192.168.0.247:8087'  // 开发
const HTTP_PRO = 'https://wxcms-api.360che.com'   // 预发布

/*
//  评论系统地址说明
//  测试域名  http://cmt_test.360che.com/
//  示例：http://cmt_test.360che.com/comlist/CommentList.aspx
//  host：120.132.50.35   cmt_test.360che.com
//  正式域名：https://cmt.360che.com/
*/

const C_HTTP_DEV = 'http://cmt_test.360che.com'
const C_HTTP = 'https://cmt.360che.com'

const B_HTTP_DEV = 'https://circle-api-yufabu.360che.com/'
const B_HTTP = 'https://circle-api.360che.com/'


const DEBUG = false                         // 是否开发模式

const URLS = DEBUG ? HTTP_DEV : HTTP_PRO

const C_URLS = DEBUG ? C_HTTP_DEV : C_HTTP

const B_URLS = DEBUG ? B_HTTP_DEV : B_HTTP

class XHR {
// 获取用户信息
    getHis(json) {
        return fetch({
            url: `${URLS}/f/his.php`,
            body: json
        })
    }

    // 热门列表数据
    getHotList(json) {
        return fetch({
            url: `${URLS}/f/hotindex.php`,
            body: json,
            type: 'post'
        })
    }


    // 首页每日推荐牛人接口
    getEveryDay() {
        return fetch({
            url: `${URLS}/api/nr/Index/GetEveryDay`
        })
    }

    // 首页推荐文章列表接口
    getIndexAsy(json) {
        return fetch({
            url: `${URLS}/api/nr/Index/GetIndexArticleAsync`,
            body: json
        })
    }

    // 牛人标签属性接口
    getNoteName(json) {
        return fetch({
            url: `${URLS}/api/nr/Index/GetNBCategoryAsync`,
            body: json
        })
    }
    // 牛人个人信息接口
    getManInfo(json){
      return fetch({
                  url: `${URLS}/api/nr/NBMan/GetNBManInfoAsync`,
                  body: json
               })
    }
    // 牛人主页推荐---文章列表接口
    getNbTindex(json){
      return fetch({
          url: `${URLS}/api/nr/NBMan/GetNBIndexArticleAsync`,
          body: json
       })
    }
    // 牛人主页原创---文章列表接口
    getNbAsync(json){
      return fetch({
          url: `${URLS}/api/nr/NBMan/GetNBArticleAsync`,
          body: json
       })
    }
    // 牛人主页圈子---文章列表接口
    getNbCircle(json){
      return fetch({
          url: `${URLS}/api/nr/NBMan/GetNBCircleArticleAsync`,
          body: json
       })
    }
    // 测试
    isCK(json) {
        return fetch({
            url: `${URLS}WeiXin/WXJSsignature.aspx`
        })
    }

    // 文章详情
      getNewsMsg (json) {
        return fetch({
                  url: `${URLS}/api/nr/pcedit/GetA`,
                  body: json
               })
      }

    // 推荐关注九宫格接口
    getRecommendAttention(json) {
        return fetch({
            url: `${URLS}/api/nr/Follower/GetTNBListAsync`,
            body:json
        })
    }
    // 关注、取消关注接口
    postAttention(json){
        return fetch({
            url: `${URLS}/api/nr/Follower/PostFollowerAsync`,
            body:json,
            type:'POST'
        })
    }
    // 分类标签接口
    getCategoryList(json) {
        return fetch({
            url: `${URLS}/api/nr/Index/GetNBCategoryAsync`,
            body:json
        })
    }
    // 请求已关注列表
    getFollowed(json) {
        return fetch({
            url: `${URLS}/api/nr/Follower/GetNBFollowerListAsync`,
            body:json
        })
    }
    // 分类标签已关注接口
    getFollowedCategoryList(json) {
        return fetch({
            url: `${URLS}/api/nr/Follower/GetNBFollowerListByCategoryIdAsync`,
            body:json
        })
    }

    // 获取标签属性
    getTagAttributes(json){
        return fetch({
            url: `${URLS}/api/nr/Index/GetNBCategoryAsync`,
            body:json
        })
    }
    // 牛人认证接口
    postNbAuthentication(json){
        return fetch({
            url: `${URLS}/api/nr/Index/PostAddNBManAsync`,
            body:json,
            type:'POST'
        })
    }
    // 牛人点赞接口
    postUpvoteAsync(json){
        return fetch({
            url: `${URLS}/api/nr/NBMan/PostUpvoteAsync`,
            body: json,
            type: 'POST'
        })
    }
    // 牛人个人信息接口
    getNbInfo(json){
        return fetch({
            url: `${URLS}/api/nr/NBMan/GetNBManInfoAsync`,
            body:json
        })
    }
    // 修改牛人信息接口
    getEditNBMan(json){
        return fetch({
            url: `${URLS}/api/nr/NBMan/EditNBMan`,
            body:json,
            type:'POST'
        })
    }
    // 牛人"我的"选项卡文章列表接口
    getNbArticleList(json){
        return fetch({
            url: `${URLS}/api/nr/NBMan/GetArticleList`,
            body:json,
        })
    }
    // 文章发布 || 取消接口
    getArticleAttention(json){
        return fetch({
            url: `${URLS}/api/nr/pcedit/PostB`,
            body:json,
            type:'POST'
        })
    }
    // 评论文章--回复，发表
    postComSub (json) {
        return fetch({
              url: `${URLS}/api/nr/index/postcmt`,
              body: json,
              type:'POST'
           })
    }
// 牛人点赞－点赞
  postCite (json) {
    return fetch({
              url: `${URLS}/api/nr/NBMan/PostUpvoteAsync`,
              body: json,
              type:'POST'
           })
  }
// 文章点赞－点赞
  getPcd (json) {
    return fetch({
              url: `${URLS}/api/nr/pcedit/GetD`,
              body: json
           })
  }
// 牛人圈子－－推送接口
  postPushAsyn (json) {
    return fetch({
              url: `${URLS}/api/nr/NBMan/PostPushCircleArticleAsync`,
              body: json,
              type:'POST'
           })
  }
/*---------------C_URLS---评论相关---------------------*/
// 获取评论信息
  getTopic (json) {
    return fetch({
              url: `${C_URLS}/api/getTopic.ashx?action=topicinfo`,
              body: json
           })
  }
// 文章详情－评论列表
  getNewsComList (json) {
    return fetch({
              url: `${C_URLS}/api/CommentsList.ashx?action=getlist`,
              body: json
           })
  }
// 评论详情－评论列表
  getComListMsg (json) {
    return fetch({
              url: `${C_URLS}/api/CommentsList.ashx?action=getcommentsreply`,
              body: json
           })
  }


/*----------------B_URLS---论坛相关--------------------------*/
    // 获取论坛个人信息接口
    getBbsUserInfo(json){
        return fetch({
            url: `${B_URLS}?c=user&m=userInfo`,
            body: json,
            type:'POST'
        })
    }
    getBbsNbCircleList(json){
        return fetch({
            url: `${B_URLS}?c=subForum&m=threadsBySubFid&sub_fid=5&sync=1`,
            body: json,
            type:'POST'
        })
    }







    // //上传图片
    // PostHeadPortrait(json){
    //    return fetch({
    //        url: `${URLS}/api/nr/Index/PostUploadToken`,
    //        body:json,
    //        type:'POST'
    //    })
    // }

}


export default new XHR()
