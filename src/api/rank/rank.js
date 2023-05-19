import server from "@/axiosconfig/axios";
// 获取排行榜分类
export function getrankList(gender,sortType,page){
    return server({
        method:'GET',
        url:`rank/original/list/data.json?gender=${gender}&sortType=${sortType}&type=sell&page=${page}`,
       
    }).then(res=>{
        return res.data.data.books
    })
}