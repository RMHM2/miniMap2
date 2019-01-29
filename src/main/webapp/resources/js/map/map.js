var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
var options = { //지도를 생성할 때 필요한 기본 옵션
		center: new daum.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
		level: 10 //지도의 레벨(확대, 축소 정도)
};

var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴

//지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomIn() {
    map.setLevel(map.getLevel() - 1);
}

// 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
function zoomOut() {
    map.setLevel(map.getLevel() + 1);
}

//지도를 클릭했을때 클릭한 위치에 마커를 추가하도록 지도에 클릭이벤트를 등록합니다
daum.maps.event.addListener(map, 'click', function(mouseEvent) {        
//	클릭한 위치에 마커를 표시합니다 
	addMarker(mouseEvent.latLng);             
});

//지도에 표시된 마커 객체를 가지고 있을 배열입니다
var markers = [];
var infowindows = [];

//마커를 생성하고 지도위에 표시하는 함수입니다
function addMarker(position) {

	var txt = prompt("내용을 입력해주세요");
	console.log(position)
	if(txt != null){
		var content = '<div style="padding:5px;">' + txt + '</div>';

		//인포윈도우를 생성합니다
		var infowindow = new daum.maps.InfoWindow({
			content : content
		});

//		마커를 생성합니다
		var marker = new daum.maps.Marker({
			position: position,
			draggable: true
		});

		// 마커에 마우스오버 이벤트를 등록합니다
		daum.maps.event.addListener(marker, 'mouseover', function() {
			// 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
			infowindow.open(map, marker);
		});

		// 마커에 마우스아웃 이벤트를 등록합니다
		daum.maps.event.addListener(marker, 'mouseout', function() {
			// 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
			infowindow.close();
		});

//		마커가 지도 위에 표시되도록 설정합니다
		marker.setMap(map);

//		생성된 마커를 배열에 추가합니다
		markers.push(marker);
		infowindows.push(infowindow);
	}
}

//배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
function setMarkers(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}            
}

//"마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
function showMarkers() {
	console.log(markers)
	setMarkers(map)    
}

//"마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
function hideMarkers() {
	setMarkers(null);    
}

function test(){
	for(var i=0; i < markers.length; i++){
		console.log(markers[i].getPosition());
	}
}

function delLast(){
	setMarkers(null);
	markers.pop();
	infowindows.pop();
	setMarkers(map);
}

// 지도 마커 저장하기
function mapSave(){
	if(markers.length>0){
		var latLng = [];
		var info = [];
		for(var i=0; i < markers.length; i++){
			console.log(markers[i].getPosition());
			
			latLng.push([markers[i].getPosition().getLng(), markers[i].getPosition().getLat()]);
			info.push(infowindows[i].getContent().replace(/<.*?>/gim, ''));
		}
		console.log(latLng);
		console.log(info)
		
		jQuery.ajaxSettings.traditional = true;
		
		$.ajax({
			url : "/map/mapSave.do",
			data : {
				'position' : latLng,
				'content' : info
			},
			success : function(result){
				console.log(result)
			},
			error : function(result){
				console.log(result);
				alert('지도 저장에 실패 하였습니다.')
			},
			async : false
		})
	}
}