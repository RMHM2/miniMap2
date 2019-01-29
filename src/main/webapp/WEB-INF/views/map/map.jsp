<%@
	page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>새 지도</title>
</head>
<body>
	<c:import url="/WEB-INF/views/common/exFile.jsp"/>
	<div id="wrapper">
		<c:import url="/WEB-INF/views/common/header.jsp"/>
		
		<div class="container">
			<div class="col-lg-10 col-md-offset-1">
				<br>
				<div id="map" style="width:100%;height:500px;"></div>
				<input type="button" value="마커보이기" id="btnShow" onclick="showMarkers();">
				<input type="button" value="마커숨기기" id="btnHide" onclick="hideMarkers();">
				<input type="button" value="마지막지우기" id="btnOneDel" onclick="delLast();">
				<input type="button" value="테스트" id="btnTest" onclick="test();">
				<input type="button" value="저장하기" id="btbSave" onclick="mapSave();">
				<br>
			</div>
		</div>
			
		<c:import url="/WEB-INF/views/common/footer.jsp"/>
	</div>
</body>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=7c640246a6e5ab60531d33745c010be1&libraries=services,clusterer,drawing"></script>
<script src="/resources/js/map/map.js"></script>
</html>