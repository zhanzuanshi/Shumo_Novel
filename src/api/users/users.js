import request from '@/axiosconfig/axios-login'
export function getUsers(){
    return request({
        methods:'Get',
        url:'/users'
    }).then(res=>{
        return res.data
    })
}