package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.Transform;

public interface TransformMapper {
	public ArrayList<Transform> getTransforms(Transform condition);
	public void insertTransform(Transform transform);
	public void deleteTransform(Transform transform);
	public void updateTransform(Transform transform);
}
