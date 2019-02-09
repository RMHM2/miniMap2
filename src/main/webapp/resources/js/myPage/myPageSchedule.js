var today = new Date();
var event = new Object;
var temper;
var weather;
var todayArr = new Array();
$(function(){
$.ajax({
		url : "/myPage/selectSchedule.do",
		type : "GET",
		success : function(data){
			var content = new Object;
			var list =data.list;
			temper = data.temper;
			weather = data.weather;

			var tmpList = [];
			for(var i =0; i<list.length;i++){
				/*console.log("---");
				console.log("local : ???"+list[i].local[1]);*/
				content = {
						title : list[i].title,
						start : list[i].start,
						end : list[i].end +"T23:59:59" ,
						color : list[i].color,
						content : list[i].content,
						sId : list[i].sId,
						localAll : list[i].local
				};
			
				tmpList.push(content);
			
			}
			event = tmpList;
      for(var i =0; i<temper.length;i++){
				todayArr[i] = temper[i].low+"/"+temper[i].high;
			}
		},
		error : function(e){
	/*		console.log(e)*/
		},
		complete : function(){
			$('#loading').hide();
        getFullcalendar();
			temperarr(today.getMonth()+1,todayArr);
			weaderToday();
			$('.fc-next-button,  .fc-prev-button,  .fc-today-button').click(function(){
				$('#calendar').hide();
				$('#loading').show();
				nextTemper();
				mymap();
			});
		}
	})

})
function maptest(){
	

	var infowindow = new daum.maps.InfoWindow({zIndex:1});
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 7 // 지도의 확대 레벨
    };

	var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	
	// 장소 검색 객체를 생성합니다
	var ps = new daum.maps.services.Places();
	var texttest ="";
	$('#textSearch').blur(function(){
		texttest = $('#textSearch').val();
		/*console.log($('#textSearch').val());*/
		ps.keywordSearch('이태원 맛집', placesSearchCB); 
	
	
	});

	// 키워드 검색 완료 시 호출되는 콜백함수 입니다
	function placesSearchCB (data, status, pagination) {
	    if (status === daum.maps.services.Status.OK) {
	        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
	        // LatLngBounds 객체에 좌표를 추가합니다
	        var bounds = new daum.maps.LatLngBounds();

	 /*       for (var i=0; i<data.length; i++) {
	            displayMarker(data[i]);    
	            bounds.extend(new daum.maps.LatLng(data[i].y, data[i].x));
	        }       
*/
	        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
	        map.setBounds(bounds);
	    } 
	}
	// 지도에 클릭 이벤트를 등록합니다
	daum.maps.event.addListener(map, 'click', function(mouseEvent) {  
	    // 클릭한 위도, 경도 정보를 가져옵니다 
	   /*  var latlng = mouseEvent.latLng; 
	    // 마커 위치를 클릭한 위치로 옮깁니다
	    marker.setPosition(latlng); */
		/*console.log(mouseEvent);
		console.log(mouseEvent.latLng);
		*/
		addMarker(mouseEvent.latLng);  
	});
	
	// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
	var markers = [];
	// 마커를 생성하고 지도위에 표시하는 함수입니다
	
	
	
	function addMarker(position) {
	    console.log("포지션"+position)
	    // 마커를 생성합니다
	    var marker = new daum.maps.Marker({
	        position: position
	    });

	    // 마커가 지도 위에 표시되도록 설정합니다
	    marker.setMap(map);
	    // 생성된 마커를 배열에 추가합니다
	    markers.push(position);
	    
		 $('#markers').val(markers);	
	}

}

// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다

// 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)	
/*  	daum.maps.event.addListener(marker, 'click', function() {   
		console.log("한번클릭");
		 infowindow.setContent('<div style="padding:5px;font-size:12px;">' + "test" + '</div>');
     infowindow.open(map, marker);  
	
});  */
function nextTemper(){	
		var date = $("#calendar").fullCalendar("getDate");
		var month = new Date(date).getMonth()+1;
		var lastToday = new Date();
	
		$.ajax({
			url : "/myPage/temper.do",
			data : {
				num : month,
			},
			dataType : "json",
			success : function(data) {
				var arrTemper = new Array();
				for(var i = 0; i<data.length;i++){
					arrTemper[i] = data[i].low + "/" + data[i].high;
				}
				/*console.log("버튼" + arrTemper);*/
				temperarr(month,arrTemper); 
				
				if((lastToday.getMonth()+1)==month)weaderToday();
			},
			error : function(e) {
			/*	console.log("error" + data);*/
			},complete : function(){
				$('#loading').hide();
				$('#calendar').show();
			}
			
		});


} 

function getFullcalendar(){
	$('#calendar').fullCalendar({
		header : {
			left : 'prev,next today',
			center : 'title',
			right : 'month,agendaWeek,agendaDay,listMonth'
		},
		  eventRender: function(event, element){
	          element.popover({
	              animation:true,
	              delay: 300,
	              content: event.content,
	              trigger: 'hover'
	          });
	        }, 
	         eventAfterRender: function(event, element, view) { 
            var new_description ='<a href="/board/boardwrite.do?BCode=3">' 
	            + '<strong>후기작성</strong>' + '</a>' 
	            
				if(event.end==null){
	         		if(today>event.start)element.append(new_description);
	         	}else{
	         		if(today>event.end)element.append(new_description);
	         	}
      
	        } , 
	        eventClick: function(calEvent, jsEvent, view) {

	        	var infowindow = new daum.maps.InfoWindow({zIndex:1});
	        	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	            mapOption = { 
	                center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
	                level: 8 // 지도의 확대 레벨
	            };
	        	var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
	        	// 지도에 클릭 이벤트를 등록합니다
	     
	        	for(var i =0; i<calEvent.localAll.length;i++){
		    		
		    		var arr = calEvent.localAll[i].split(',');
		    		console.log("arr : " + arr);
		    		
		    		var markertest = new daum.maps.Marker({
		    			map: map, // 마커를 표시할 지도   
		    			position: new daum.maps.LatLng(arr[0],arr[1])// 마커를 표시할 위치
		        });
		    		
		    		
		        // 마커가 지도 위에 표시되도록 설정합니다
		        markertest.setMap(map);
		    	}	
	        	
	        	daum.maps.event.addListener(map, 'click', function(mouseEvent) {  
	        	    // 클릭한 위도, 경도 정보를 가져옵니다 
	        	   /*  var latlng = mouseEvent.latLng; 
	        	    // 마커 위치를 클릭한 위치로 옮깁니다
	        	    marker.setPosition(latlng); */
	        		
	        	addMarker(mouseEvent.latLng);  
	        	});
	        	
	        	var markers = [];
	
	        	function addMarker(position) {
	        	    console.log("포지션"+position)
	        	    // 마커를 생성합니다
	        	    var marker = new daum.maps.Marker({
	        	        position: position
	        	    });

	        	    // 마커가 지도 위에 표시되도록 설정합니다
	        	    marker.setMap(map);
	        	    // 생성된 마커를 배열에 추가합니다
	        	    markers.push(position);
	        	    
	        		 $('#markers').val(markers);	
	        	}
	    	$('#myModalLabel').text('일정수정');
	    	  $('#sId').val(calEvent.sId);  
	    	 	$('#sTitle').val(calEvent.title);
	    		$('#sContent').val(calEvent.content);
	    		$('#startDateT').val(calEvent.start.format());
	    		$('#endDateT').val(calEvent.end.format("YYYY-MM-DD"));
	    		$('#sColor').val(calEvent.color);
	    		$('#result').attr("style","display:none");
	    		$('#updateresult').attr("style","display:block");
	    		
	    		$('#test').modal('show');
	        
	        
	        
	        
	        
	        },
	          eventMouseover:function(event , jsEvent , view){
	        	  
	          },
	          eventMouseout:function ( event , jsEvent , view ) {
	        	  
	          },
		dayClick : function(date, jsEvent, view) {
			
			$('input').empty(); 
				$('#sId').remove();
			$('#startDateT').val(date.format());
			$('#endDateT').val(date.format());
			$('#result').attr("style","display:block");
    		$('#updateresult').attr("style","display:none");
    		maptest();
    		$('#test').modal('show');
		},
		defaultDate : new Date(),
		
		navLinks : true, // can click day/week names to navigate views
		businessHours : true, // display business hours
		editable : false,
		eventLimit: true,
		events :event
	});	
}

function weaderToday(){
	var trS = $('thead tr td');
	var tdS = $('#calendar').find('td[data-date]');
	var arr = weather;
	for(var i = 1; i<arr.length; i++){
  var date = new Date();
		date.setDate(date.getDate()+(i+2));
		var re = (date.toISOString().slice(0, 10));
		var we = arr[i]; 
		 var sr = "";
	
		if(we.match(/맑음/))sr = "<img src='/resources/img/weather/sun1.PNG' width='15px';height='15px'>";
		else if(we.match(/흐림/))sr = "<img src='/resources/img/weather/cloud1.PNG' width='15px';height='15px'>";
		else if(we.match(/구름많음/))sr = "<img src='/resources/img/weather/cloud1.PNG' width='15px';height='15px'>";
		else if(we.match(/비/))sr = "<img src='/resources/img/weather/rain1.PNG' width='15px';height='15px'>";
		else if(we.match(/눈/)) sr = "<img src='/resources/img/weather/snow1.PNG' width='15px';height='15px'>"; 
		else sr = "<img src='/resources/img/weather/sunCloud1.PNG' width='15px';height='15px'>";
	/*	console.log(re);*/
		$('#calendar').find('td[data-date='+re+']').prepend(sr);
	}
}

function temperarr(month,arrT){
	
var arrdate = new Date();

arrdate.setMonth(month-1);
	for(var i =0; i < arrT.length; i++){
		arrdate.setDate(i+1);	
		var re = arrdate.toISOString().slice(0, 10);
		var tem = arrT[i];
		 $('#calendar').find('td[data-date='+re+']').prepend(tem).attr('style','font-size:x-small');
	}
	 
	if(arrdate.getMonth()==month-1 ){
			
			
	}
}

function scheduleTest(){
		 if($('#sTitle').val()==""){
			 alert('내용을 입력하세요');
			 return false;
		 }else if($('#sContent').val()==""){
			 alert('세부내용을 입력하세요');
			 return false;
		 }
		 return true;
}
function updateS(){
	
	console.log("update실행");
	$('#formAction').attr("action","updateSchedule.do");
}
function deleteS(){
	console.log("delete실행");
	$('#formAction').attr("action","deleteSchedule.do");
}

