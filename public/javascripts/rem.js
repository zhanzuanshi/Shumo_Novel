
// 实现rem布局
// 当窗口发生变化
function setRem(){

        let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
            if(deviceWidth>=750){
                deviceWidth=600
            }
            if(deviceWidth<=375){
                deviceWidth=375
            }
    
        document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px';
        // 设置字体大小
        document.querySelector('body').style.fontSize=0.3+'rem'
        
    }
    setRem()
    window.onresize=function(){
        setRem()
    }




