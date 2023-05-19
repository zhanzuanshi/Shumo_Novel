import server from "@/axiosconfig/axios";
// 获取首页免费内容
export async function getFreebook(){
    const res = await server({
        method: 'GET',
        url: 'shelf/info.json'
    });
    return res.data.data.list;
}
// 获取热门专题
export async function getHotclass(){
    const res = await server({
        method: 'GET',
        url: `column/data.json?id=2001`
    });
    return res.data.data.books;
}
// 获取轮播图片
export async function getswiperImg(){
    const res = await server({
        method: 'GET',
        url: 'store/show.json?type=recommend&uuid=f2cb32ff209f4010911a77a617add8c4'
    });
    return res.data.data.list[0];
}
// 获取首页分类
export async function gethomeType(){
    const res = await server({
        method: 'GET',
        url: 'https://apis.netstart.cn/yunyuedu/store/show.json?type=recommend&uuid=f2cb32ff209f4010911a77a617add8c4'
    });
    return res.data.data.list[1].shortCut;
}