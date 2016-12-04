$(document).ready(function(){

	$("#btnDownloadVideo").click(function(e){
		e.preventDefault();		
		RaizelYoutubeDownloader.doIt($("[type=text]").val());
		
	});
})