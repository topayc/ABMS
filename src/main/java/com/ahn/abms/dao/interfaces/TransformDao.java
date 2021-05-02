package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.Transform;

public interface TransformDao {
	public ArrayList<Transform> getTransforms(Transform condition);
	public void insertTransform(Transform transform);
	public void deleteTransform(Transform transform);
	public void updateTransform(Transform transform);
}
