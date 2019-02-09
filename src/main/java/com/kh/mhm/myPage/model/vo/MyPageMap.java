package com.kh.mhm.myPage.model.vo;

public class MyPageMap {

	private String mno;
	private String mapLat; // 위도
	private String mapLng; // 경도
	public MyPageMap() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MyPageMap(String mno, String mapLat, String mapLng) {
		super();
		this.mno = mno;
		this.mapLat = mapLat;
		this.mapLng = mapLng;
	}
	public MyPageMap(String mapLat, String mapLng) {
		super();
		this.mapLat = mapLat;
		this.mapLng = mapLng;
	}
	public String getMno() {
		return mno;
	}
	public void setMno(String mno) {
		this.mno = mno;
	}
	public String getMapLat() {
		return mapLat;
	}
	public void setMapLat(String mapLat) {
		this.mapLat = mapLat;
	}
	public String getMapLng() {
		return mapLng;
	}
	public void setMapLng(String mapLng) {
		this.mapLng = mapLng;
	}
	@Override
	public String toString() {
		return mapLat +","+ mapLng;
	}
	
	
	
	
}
