// 获取频道
import server from "@/axiosconfig/axios";

export function GetChannel(){
    return server({
        method:'GET',
        url:'mergedCategroy.json'
    }).then(res=>{
        return res.data
    })
}