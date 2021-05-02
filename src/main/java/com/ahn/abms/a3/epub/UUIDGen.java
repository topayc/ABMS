package com.ahn.abms.a3.epub;

import java.util.UUID;

public class UUIDGen {
	public static String gen(){
		 UUID uuid =UUID.randomUUID();	
       String ss 	= uuid.toString();
       return ss;
	}
}
