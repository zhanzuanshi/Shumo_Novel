import server from "@/axiosconfig/axios";


export  async function Getshelf(id){
    const res = await server({
        method: 'GET',
        url: `shelf/detail.json?ids=${id}`
    });
    return res.data.data.list;
}