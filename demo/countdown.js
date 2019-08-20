$(function(){
	$(".captchaBtn").html('获取验证码').on("click", function(){
         var that = $(this);
		 var seconds = 60;
		 that.attr("disabled", true);
		 that.html(seconds+'秒');
	     let promise = new Promise((resolve, reject) => {
	      let setTimer = setInterval(
	        () => {
	          seconds -= 1;
	          // console.info('倒计时:' + seconds);
	          that.html(seconds+'秒');
	          if (seconds <= 0) {
	          	that.html('获取验证码');
	            resolve(setTimer)
	          }
	        }
	        , 1000)
	    })
	    promise.then((setTimer) => {
	       // console.info('清除');
	      clearInterval(setTimer);
	      that.attr("disabled", false);
	    })   

	})
});