package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.AbmsProjectJoinCommand;

public interface AbmsProjectJoinCommandDao {
	public ArrayList<AbmsProjectJoinCommand> getAbmsProjectJoinCommands(AbmsProjectJoinCommand condition);
}
