document.addEventListener('DOMContentLoaded',function(){

	// References to all the element we will need.
	var video = document.querySelector('#camera-stream'),
			//vsrc = document.querySelector('#srcVideo'), TRY
			image = document.querySelector('#snap'),
			start_camera = document.querySelector('#start-camera'),
			controls = document.querySelector('.controls'),
			take_photo_btn = document.querySelector('#take-photo'),
			delete_photo_btn = document.querySelector('#delete-photo'),
			download_photo_btn = document.querySelector('#download-photo'),
			error_message = document.querySelector('#error-message');


	// The getUserMedia interface is used for handling camera input.
	// Some browsers need a prefix so here we're covering all the options
	navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

	$("#cameraON").on("click",function(e){
		e.preventDefault();
		cameraON();
	});

	// Mobile browsers cannot play video without user input,
	// so here we're using a button to start it manually.
	start_camera.addEventListener("click",function(e){
		e.preventDefault();
		cameraON();
	});
	
	function cameraON(){
		if(!navigator.getMedia){
			displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
		}else{
			// Request the camera.
			navigator.getMedia({
				video:true
			},
				// Success Callback
				function(stream){
					// Create an object URL for the video stream and
					// set it as src of our HTLM video element.
					video.src = window.URL.createObjectURL(stream);
					
					//vsrc.src = window.URL.createObjectURL(stream); TRY

					// Play the video element to start the stream.
					video.play();
					video.onplay = function(){
						showVideo();
					};
					$("#modalCamera").modal("show");
				},
				// Error Callback
				function(err){
					displayErrorMessage("There was an error with accessing the camera stream: "+err.name,err);
				}
			);
		}
		// Start video playback manually.
		video.play();
		showVideo();
	}

	take_photo_btn.addEventListener("click",function(e){
		e.preventDefault();
		var snap = takeSnapshot();

		// Show image. 
		image.setAttribute('src',snap);
		image.classList.add("visible");

		// Enable delete and save buttons
		delete_photo_btn.classList.remove("disabled");
		download_photo_btn.classList.remove("disabled");

		// Set the href attribute of the download button to the snap url.
		download_photo_btn.href = snap;

		video.pause(); // Pause video playback of stream.
		
		$('.face-video').remove();
	});

	delete_photo_btn.addEventListener("click",function(e){
		e.preventDefault();

		// Hide image.
		//image.setAttribute('src',"");
		image.src = "";
		image.classList.remove("visible");

		// Disable delete and save buttons
		delete_photo_btn.classList.add("disabled");
		download_photo_btn.classList.add("disabled");
		download_photo_btn.setAttribute('href',"#");

		// Resume playback of stream.
		video.play();
	});

	function showVideo(){
		// Display the video stream and the controls.
		hideUI();
		video.classList.add("visible");
		controls.classList.add("visible");
	}

	function takeSnapshot(){
		// Here we're using a trick that involves a hidden canvas element.
		var hidden_canvas = document.querySelector('canvas'),
				context = hidden_canvas.getContext('2d');

		var width = video.videoWidth,
				height = video.videoHeight;

		if(width && height){
			// Setup a canvas with the same dimensions as the video.
			hidden_canvas.width = width;
			hidden_canvas.height = height;

			// Make a copy of the current frame in the video on the canvas.
			context.drawImage(video,0,0,width,height);

			// Turn the canvas image into a dataURL that can be used as a src for our photo.
			return hidden_canvas.toDataURL('image/jpeg'); // 'image/png'
		}
	}
	
	function displayErrorMessage(error_msg,error){
		error = error || "";
		if(error){
			console.error(error);
		}
		error_message.innerText = error_msg;

		hideUI();
		error_message.classList.add("visible");
	}
 
	function hideUI(){
		// Helper function for clearing the app UI.
		controls.classList.remove("visible");
		start_camera.classList.remove("visible");
		video.classList.remove("visible");
		snap.classList.remove("visible");
		error_message.classList.remove("visible");
	}
	
	function stopVideo(){
		video.pause();
		video.currentTime = 0;
		return false;
	}	
	
	/*$("#stopCam").on("click",function(){
		hideUI();
		stopVideo();
	});*/
	
	$("#modalCamera").on("hidden.bs.modal",function(e){
		video.pause();
		hideUI();
    //$("#camera-stream").each(function(){
      //this.player.pause();
    //});
		//$("#camera-stream").trigger('pause');
		//$("#camera-stream")[0].pause();
		
		$('.face-video').remove();
	});


  var $video = $('#camera-stream');
	// Flash flash bulb
	function flash(){
		$('<div />',{
				'class':'flash'
			})
			.appendTo('body')
			.fadeOut('fast',function(){
				$(this).remove();
			});
		//sound.play();
	}	
	
	$('.do-video-detect').click(function(e){
		e.preventDefault();
		$('.face-video').remove();

		//if($video[0].paused){
			//$video[0].play();
		//}

		setTimeout(function(){
			$video[0].pause();
			$video.faceDetection({
				interval:1,
				async:true,
				complete:function(faces){
					flash();
					$('<div>',{
						'class':'face-video',
						'css':{
							'left':faces[0].x * faces[0].scaleX + 'px',
							'top':faces[0].y * faces[0].scaleY + 'px',
							'width':faces[0].width * faces[0].scaleX + 'px',
							'height':faces[0].height * faces[0].scaleY + 'px'
						}
					}).insertAfter(this);
				}
			});
		},500);	
	});
	
	
	
	
});
