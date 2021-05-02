package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.AbmsProjectJoinCommand;

public interface AbmsProjectJoinCommandMapper {
	public ArrayList<AbmsProjectJoinCommand> getAbmsProjectJoinCommands(AbmsProjectJoinCommand condition);
}
