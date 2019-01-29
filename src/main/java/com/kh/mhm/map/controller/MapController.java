package com.kh.mhm.map.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.kh.mhm.map.model.vo.MyMap;

@Controller
public class MapController {

		

//
//	@RequestMapping(value = "/map/hoji.do")
//	@ResponseBody
////	public void passCheck(@RequestParam String mpw, @RequestParam String mid) {
//		public void passCheck(@RequestParam String tLat, @RequestParam String tLng,
//				@RequestParam String tInText, @RequestParam String tInSubject ) {
////		System.out.println("mpw : "+mpw + "  mid : "+ mid + " abc : " );
//		System.out.println("tLat : "+tLat + "  tLng : "+ tLng + " tInText : " + tInText + " tInSubject : " + tInSubject);
//	}


	@RequestMapping(value = "/map/hoji.do")
	@ResponseBody
	public static String CreateFile(@RequestParam String tUserId,@RequestParam String [] tLat, @RequestParam String [] tLng,
			@RequestParam String [] tInText, @RequestParam String [] tInSubject)
	
	{
		String alphago = "Succes hoji";
		System.out.println("전송이왔다 마리다");
		System.out.println("내이름은 : "+tUserId + " tLat : "+tLat[0] + "  tLng : "+ tLng[0] + " tInText : " + tInText[0] + " tInSubject : " + tInSubject[0]);
		System.out.println("tLat : "+tLat + "  tLng : "+ tLng + " tInText : " + tInText + " tInSubject : " + tInSubject);
		// 저장을 list outp fie read r List 단위로 불러와서 
		
		try{
	            //파일 객체 생성
				File folderCreate = new File("C:\\test\\");
				if(folderCreate.exists() == false) folderCreate.mkdirs();
	            File file = new File("C:\\test\\"+tUserId+".txt");
	            BufferedWriter bw = new BufferedWriter(new FileWriter(file));
	            // ObjectFilestream 사용하기
	            if(file.isFile() && file.canWrite()){
	                //쓰기
	            	
	            	for(int i =0; i< tLat.length;i++)
	            	{
	            	bw.write(tLat[i]+",");
	            	bw.write(tLng[i]+",");	            	
	            	bw.write(tInText[i]+",");	            	
	            	bw.write(tInSubject[i]+",");	            	
	            	//bw.newLine();
	            	}
	            	
	                bw.flush();
	                bw.close();
	            }
	        }catch (IOException e) {
	            System.out.println(e);
	        }
		System.out.println("알파고봐보자"+alphago);
		
		return alphago;
	}
	@RequestMapping(value = "/map/hoji2.do")
	@ResponseBody
	public static String[] readFile(@RequestParam String tUserId)
	
	{
		System.out.println("gggggggggggggggggggggggg");
		MyMap map1 = new MyMap();
		String part1 ;
		String part2;
		String[] parts= {};
		try {
			// 파일 객체 생성
			File file = new File("C:\\test\\"+tUserId+".txt");
			// 입력 스트림 생성
			FileReader filereader = new FileReader(file);
			// 입력 버퍼 생성
			BufferedReader br = new BufferedReader(filereader);
			String line = "";
				line = br.readLine();
			System.out.println();
			System.out.println(line);
			// .readLine()은 끝에 개행문자를 읽지 않는다.
			   if (line.contains(",")) {
		              
	               parts = line.split(",");
	                 part1 = parts[0]; // 004
	                 part2 = parts[1]; // 034556
	                 
	                 if(line.contains(".!."))
	                 {
	                	 
	                 }
	                	 
			   } else {
	                throw new IllegalArgumentException("String " + line + " does not contain -");
	            }

			   
			   for(int i =0; i< parts.length ;i++)
			   {
				   System.out.println(parts[i]);
				  
			   }
			   
			   
			   
			   System.out.println(part1 + "    "+ part2);
			br.close();

		} catch (FileNotFoundException e) {
			// TODO: handle exception
		} catch (IOException e) {
			System.out.println(e);
		}

		return parts;

	}
	
	// new coding part
	@RequestMapping("/map/map.go")
	public String map() {
		return "/map/map";
	}
	
	@RequestMapping("/map/mapSave.do")
	@ResponseBody
	public boolean mapSave(@RequestParam List<Object> position, @RequestParam List<String> content, HttpSession session) {
		
		boolean result = createGeoJson(position, content, session);
		
		return result;
	}
	
	@RequestMapping("/map/getMapData.do")
	@ResponseBody
	public String getMapData() {
		
		
		return null;
	}
	
	public boolean createGeoJson(List<Object> position, List<String> content, HttpSession session) {
		
		boolean result = false;
		
		String saveDir = session.getServletContext().getRealPath("/resources/upload/map/");
		File dir = new File(saveDir);
		if(dir.exists() == false) dir.mkdirs();
		
		// 서버에 저장할 파일명 지정
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		String today = formatter.format(new Date());
		String rename = today + "-" + UUID.randomUUID().toString().substring(20) + ".json";
		
		try(BufferedWriter bw = new BufferedWriter(new FileWriter(new File(saveDir + rename))))
		{
			// json file Start
			StringBuilder sb = new StringBuilder();
			
			sb.append((char)123 + "\n");
			sb.append((char)34 + "type" + (char)34 + ":" + (char)34 + "FeatureCollection" + (char)34 + ",\n");
			sb.append((char)34 + "features" + (char)34 + ":[" + "\n");
			
			// point start
			for(int i=0; i<content.size(); i++) {
				sb.append((char)123 + "\n");
				sb.append((char)34 + "type" + (char)34 + ":" + (char)34 + "Features" + (char)34 + ",\n");
				sb.append((char)34 + "geometry" + (char)34 + ":{\n");
				sb.append((char)34 + "type" + (char)34 + ":" + (char)34 + "Point" + (char)34 + ",\n");
				sb.append((char)34 + "coordinates" + (char)34 + ":" + ((content.size()<2)?Arrays.toString(position.toArray()):"[" + position.get(i) + "]") + "\n");
				sb.append((char)125 + ",\n");
				sb.append((char)34 + "properties" + (char)34 + ":" + (char)123);
				sb.append((char)34 + "content" + (char)34 + ":" + (char)34 + content.get(i) + (char)34 + (char)125 + "\n");
				sb.append((char)125 + ((position.size()-1!=i)?",":"") + "\n");
			}
			// point end
			
			sb.append("]\n");
			sb.append((char)125 + "\n");
			// json file end
			
			bw.write(sb.toString());
			session.setAttribute("fileName", rename);
			result = true;
		} catch(Exception e) {
			e.getStackTrace();
			result = false;
		}

		return result;
	}
	
}
