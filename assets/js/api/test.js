/**
 * 文章内容相关接口 
 */
export default axios => ({
  GetCard () { return axios.get("/viz/cfg/card") },//收藏喜欢文章/帖子
});