
		/* 
			Author : Luthfi Firmansyah
			Email  : luthfifs97@gmail.com
		*/

	
var RaizelYoutubeDownloader = {
	getVideoId:function(url){
		var res = new URLSearchParams(url);
		return res.get('v');
	},
	validateYouTubeUrl:function(url)
	{
		//src : http://stackoverflow.com/questions/28735459/how-to-validate-youtube-url-in-client-side-in-text-box
        if (url != undefined || url != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                // Do anything for being valid
                // if need to change the url to embed url then use below line
                return match;
            }
            else {
               return false
            }
        }
	},
	getInfoVideo:function(videoId,callback)
	{
		$.ajax({
			url:serverUrl,
			data:{videoId:videoId},
			type:'POST',
			success:function(data){
				callback(data);
			}
		});
	},
	showResult:function(obj){

	},
	parseInfoVideo:function(data)
	{
		var obj = {};
		obj.list = [];
		obj.videos = [];
		var url = "";
		var urlParams = new URLSearchParams((data));
		for (let p of urlParams) {
		  if(p[0] == 'url_encoded_fmt_stream_map'){
		      url = p[1];
		  }
		}

		var res = new URLSearchParams(url);

		for(let p of res){

		  if(p[0] == 'type'){
		  	var tmp = p[1].split(',');
		  	obj.list.push({type:tmp[0],url:tmp[1].replace('url=','')});
		  }

		  if(p[0] == 'url')
		  {
		  	obj.videos.push(p[1]);
		  }
 		}
		
		return obj;
	},
	doIt:function(url){
		var isValid = this.validateYouTubeUrl(url);
		if(isValid === false){
			alert("Invalid URL!");
			return false;
		}
		if(isValid.length < 3){
			alert("Invalid URL!");
			return false;
		}

		var that = this;
		$("#downloadList").hide();
		$("#downloadList").find('ol').html("");
		$("button").prop('disabled',true);
		$("button").html("Please Wait. . . ");
		this.getInfoVideo(isValid[2],function(data){
			$("button").html("Download");
			$("button").prop('disabled',false);
			var res = that.parseInfoVideo(data);
			var template = "";
			for (var i = res.videos.length - 1; i >= 0; i--) {
				if(res.videos[i].indexOf('http') >= 0)
				{
					template += '<li><a href="' + res.videos[i] + '">Download ' + res.list[i].type + '</li>';
				}
			}
			if(template == "")
			{
				template += "<li>Failed</li>";
			}

			$("#downloadList").find('ol').html(template);
			$("#downloadList").show();
			
		});
	}

};
