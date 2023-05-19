import server from "@/axiosconfig/axios";
// 获取分类
export  async function getbookType(){
    const res = await server({
        method: 'GET',
        url: 'simpleCategroy.json'
    });
    return res.data;
   
}
// 获取分类详情
export  async function getbookdetail(catId,gender,sort,pay,state,page){
    const res = await server({
        method: 'GET',
        url: `category/original/data.json?id=${catId}&gender=${gender}&sort=${sort}&pay=${pay}&state=${state}&page=${page}`
    });
    return res.data.data.books;
   
}