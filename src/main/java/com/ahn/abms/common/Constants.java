package com.ahn.abms.common;

import java.io.File;

public class Constants {
	public static class AccoutType {
		public static final String SUPER = "SUPER";
		public static final String COMMON = "COMMON";
	}
	
	public static enum Account {
		SUPER("SUPER"), 
		MANAGER("MANAGER"),
		COMMON("COMMON"),
		GUEST("GUEST");

		private final String value;

		Account (String value) {
			this.value = value;
		}

		public String value() {
			return this.value;
		}

		public static Account valueFrom(String value) throws Exception {
			if (value.equalsIgnoreCase("super")) {
				return SUPER;
			} else if (value.equalsIgnoreCase("mannager")) {
				return MANAGER;
			} 
			else if (value.equalsIgnoreCase("common")) {
				return COMMON;
			} 
			else if (value.equalsIgnoreCase("guest")) {
				return GUEST;
			} 
			else {
				throw new Exception("Unknown value : " + value);
			}
		}
	}
	
	public static enum ResourceType {
		USER_RESOURCE("_user_resource_"), 
		PUBLIC_RESOURCE("_public_resource_");

		private final String value;

		ResourceType(String value) {
			this.value = value;
		}

		public String value() {
			return this.value;
		}

		public static ResourceType valueFrom(String value) throws Exception {
			if (value.equalsIgnoreCase("user_resource")) {
				return USER_RESOURCE;
			} else if (value.equalsIgnoreCase("public_resource")) {
				return PUBLIC_RESOURCE;
			} else {
				throw new Exception("Unknown value : " + value);
			}
		}
	}

	public enum SaveFileType {
		A3("_a3"), 
		EPUB("_epub"), 
		HTML("_html"), 
		PSD("_psd"), 
		PDF("_pdf"), 
		COVER_IMAGE("_cover_image"), 
		ATTACH_FILE("_attach_file"), 
		CAPTURE("_capture"),
		RESOURCES("_resources"),
		PUBLIC_RESOURCES ("_public_resources");

		private final String value;

		SaveFileType(String value) {
			this.value = value;
		}

		public String value() {
			return this.value;
		}

		public static SaveFileType valueFrom(String value) throws Exception {
			if (value.equalsIgnoreCase("a3")) {
				return A3;
			} else if (value.equalsIgnoreCase("epub")) {
				return EPUB;
			} else if (value.equalsIgnoreCase("attach_file")) {
				return ATTACH_FILE;
			} else if (value.equalsIgnoreCase("psd")) {
				return PSD;
			} else if (value.equalsIgnoreCase("pdf")) {
				return PDF;
			}else if (value.equalsIgnoreCase("capture")) {
				return CAPTURE;
			} 
			else {
				throw new Exception("Unknown value : " + value);
			}
		}
	}
}
