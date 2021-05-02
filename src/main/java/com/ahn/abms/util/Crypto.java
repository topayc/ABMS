package com.ahn.abms.util;

import java.security.MessageDigest;

public class Crypto {
	public static String getEncSHA256(String txt) throws Exception{
	    StringBuffer sbuf = new StringBuffer();
	     
	    MessageDigest mDigest = MessageDigest.getInstance("SHA-256");
	    mDigest.update(txt.getBytes());
	    byte[] msgStr = mDigest.digest() ;
	     
	    for(int i=0; i < msgStr.length; i++){
	        byte tmpStrByte = msgStr[i];
	        String tmpEncTxt = Integer.toString((tmpStrByte & 0xff) + 0x100, 16).substring(1);
	        sbuf.append(tmpEncTxt) ;
	    }
	    return sbuf.toString();
	}
	
	public static String getEncMD5(String txt) throws Exception {
	    StringBuffer sbuf = new StringBuffer();
	    MessageDigest mDigest = MessageDigest.getInstance("MD5");
	    mDigest.update(txt.getBytes());
	    byte[] msgStr = mDigest.digest() ;
	     
	    for(int i=0; i < msgStr.length; i++){
	        String tmpEncTxt = Integer.toHexString((int)msgStr[i] & 0x00ff) ;           
	        sbuf.append(tmpEncTxt) ;
	    }
	    return sbuf.toString() ;
	}
}
