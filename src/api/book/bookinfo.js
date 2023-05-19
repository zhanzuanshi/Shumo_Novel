// 获取书籍详情
import server from "@/axiosconfig/axios";

export  async function GetBookInfo(id,title){
    const res = await server({
        method: 'GET',
        url: `book/getsub.json?id=${id}&title=${title}`
    });
    return res.data.feed.entry;
}
// 获取章节列表
export async function GetContent(uuid){
    const res= await server({
        method:'GET',
        url:`reader/book/info.json?source_uuid=${uuid}`
    });
    return res.data.data.catalog
}
// 获取章节内容
export async function GetContentinfo(uuid,conid){
    const res= await server({
        method:'GET',
        url:`reader/book/content.json?source_uuid=${uuid}&content_uuid=${conid}`
    });
    return res.data.data
}
// 获取评论
export async function GetComment(bookid){
    const res= await server({
        method:'GET',
        url:`sns/comment/get.json?type=3&id=${bookid}`
    });
    return res.data.data.data
}

// Warning: 此处接口的sourceid和bookid指的是同一个内容