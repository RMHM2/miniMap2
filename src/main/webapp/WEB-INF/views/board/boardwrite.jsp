<%@
   page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>게시글 작성 페이지</title>
<script type="text/javascript"src="https://code.jquery.com/jquery-3.3.1.js"></script>
<link rel="stylesheet" href="<%=request.getContextPath()%>/daumeditor/css/editor.css" type="text/css" charset="utf-8"/>
<script src="<%=request.getContextPath()%>/daumeditor/js/editor_loader.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
	<c:import url="/WEB-INF/views/common/exFile.jsp" />
	<div class="wrapper">
		<c:import url="/WEB-INF/views/common/header.jsp" />
		<div class="container">
			<div class="col-md-2" align="center">
				&nbsp;&nbsp;
				<h4>--게시판 목록--</h4>
				<ul class="unstyled">
					<br><br>
					<li><a href="/board/boardlist1.do">자유 게시판</a></li>
					<br>
					<li><a href="/board/boardlist2.do">정보공유 게시판</a></li>
					<br>
					<li><a href="/board/boardlist3.do">여행후기 게시판</a></li>
					<br>
					<li><a href="/board/boardlist4.do">질문 게시판</a></li>
				</ul>
			</div>
			<!-- 에디터 넣어야됨. -->
			<div class="col-md-10">
				<c:if test="${not empty member}">
					<form action="/board/boardinsert.do" method="post" id="boardfrm" enctype="multipart/form-data">
						<input type="hidden" id="mNo" name="mNo" value="${member.mno}" />
						<!-- 작성자 회원번호  -->
						
						<br>						
						<select name="bCode" id="bCode" class="bCode" data-bCode="0">
							<option value="0">게시판 선택</option>
  							<option value="1">자유</option> 
  							<option value="2">정보공유</option>
 							<option value="3">여행후기</option>
 							<option value="4">질문</option> 							
						</select>
						<c:if test="${member.mtype eq 'A' }">
							<input type="checkbox" name="isNotice2" checked="checked">공지글로 올리기 <br>
						</c:if>
						<input type="hidden" name="isNotice" value='N'> 						
						<input type="text" placeholder="제목을 입력해주세요" name="bTitle" id="bTitle" 
						required style="width:100%;">
						<div id="daumeditor" class="edit" style="width: 100%; height: 100%;"></div>													
						<textarea name="boardcontent" id="boardcontent" style="display: none;"></textarea>							
							
												
						<!-- <input type="radio" name="bCode" value="1" checked="checked">잡담
						<input type="radio" name="bCode" value="2">정보 
						<input type="radio" name="bCode" value="3">후기 
						<input type="radio" name="bCode" value="4">질문 	 -->
						
						<div id="map" style="width:100%;height:350px;"></div>
						<input type="button" value="마커보이기" id="btnShow" onclick="showMarkers();">
						<input type="button" value="마커숨기기" id="btnHide" onclick="hideMarkers();">
						<input type="button" value="마지막지우기" id="btnOneDel" onclick="delLast();">
						<input type="button" value="테스트" id="btnTest" onclick="test();">
						<input type="button" value="저장하기" id="btbSave" onclick="mapSave();">
						<br>
						<input type="button" class="btn btn-theme" id="insertBoard" value="등록" style="right: 105px;"/>
						<input type="button" value="취소" onclick="history.back(-1);" class="btn btn-warning" style="right: 160px;"/>
						<br>	
					</form>
				</c:if>				
										
			</div>
			
			<%-- <div>

				<div class="container-fluid">
					<div class="row">
					&nbsp;&nbsp;&nbsp;
					<button type="button" class="btn btn-theme" id="viewmap" 
						onclick="viewmap(this);">지도추가 </button>					
						<div class="col-md-2"></div>
						<div class="col-md-10" name="jejumap" style="visibility:hidden;">
						<c:import url="/WEB-INF/views/test/testMap2.jsp"/>
						</div>
					</div>
				</div>
				
			</div> --%>
		</div> <br><br>
		
		
		<c:import url="/WEB-INF/views/common/footer.jsp" />
	</div>
</body>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=7c640246a6e5ab60531d33745c010be1&libraries=services,clusterer,drawing"></script>
<script src="/resources/js/map/map.js"></script>
<script src="/resources/js/board/boardwrite.js"></script>
</html>