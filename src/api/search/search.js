import server from "@/axiosconfig/axios";
// 获取热门搜索
export async function getHotWords(){
    const res= await server({
        method:'GET',
        url:'search/getHotWords'
    });
    return res.data.list
}
// 获取搜索结果
export async function getResult(keyword){
    const res= await server({
        method:'GET',
        url:`search/book.json?keyword=${keyword}`
    });
    return res.data.data.books
}