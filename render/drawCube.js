import { Vector3 } from "../world/Vector3.js";

/**
 * Draws a textured 3D cube
 * @param {object} param0
 * @param {object} param0.voxel
 * @param {Camera} param0.camera
 * @param {CanvasRenderingContext2D} ctx
 * @param {HTMLImageElement} texture
 */
export function drawCube({ voxel, camera }, ctx, texture) {
	const cubeSize = 1;

	const cubeX = voxel.x * cubeSize;
	const cubeY = voxel.y * cubeSize;
	const cubeZ = voxel.z * cubeSize;

	// Define cube vertices
	const vertices = [
		new Vector3(cubeX - cubeSize / 2, cubeY - cubeSize / 2, cubeZ - cubeSize / 2),
		new Vector3(cubeX + cubeSize / 2, cubeY - cubeSize / 2, cubeZ - cubeSize / 2),
		new Vector3(cubeX + cubeSize / 2, cubeY + cubeSize / 2, cubeZ - cubeSize / 2),
		new Vector3(cubeX - cubeSize / 2, cubeY + cubeSize / 2, cubeZ - cubeSize / 2),
		new Vector3(cubeX - cubeSize / 2, cubeY - cubeSize / 2, cubeZ + cubeSize / 2),
		new Vector3(cubeX + cubeSize / 2, cubeY - cubeSize / 2, cubeZ + cubeSize / 2),
		new Vector3(cubeX + cubeSize / 2, cubeY + cubeSize / 2, cubeZ + cubeSize / 2),
		new Vector3(cubeX - cubeSize / 2, cubeY + cubeSize / 2, cubeZ + cubeSize / 2),
	];

	// Project vertices onto 2D screen
	const projectedVertices = vertices.map((vertex) => camera.projectPoint(vertex));

	// Check if any projected point is null (behind camera)
	if (projectedVertices.some((vertex) => vertex === null)) {
		return; // Skip drawing if any vertex is null
	}

	// Define the faces of the cube with texture coordinates
	const faces = [
		{
			vertices: [0, 1, 2, 3],
			uv: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1],
			],
		}, // Front
		{
			vertices: [1, 5, 6, 2],
			uv: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1],
			],
		}, // Right
		{
			vertices: [5, 4, 7, 6],
			uv: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1],
			],
		}, // Back
		{
			vertices: [4, 0, 3, 7],
			uv: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1],
			],
		}, // Left
		{
			vertices: [3, 2, 6, 7],
			uv: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1],
			],
		}, // Top
		{
			vertices: [4, 5, 1, 0],
			uv: [
				[0, 0],
				[1, 0],
				[1, 1],
				[0, 1],
			],
		}, // Bottom
	];

	// Draw each face with texture
	faces.forEach((face) => {
		ctx.beginPath();
		ctx.moveTo(projectedVertices[face.vertices[0]].x, projectedVertices[face.vertices[0]].y);
		for (let i = 1; i < face.vertices.length; i++) {
			ctx.lineTo(projectedVertices[face.vertices[i]].x, projectedVertices[face.vertices[i]].y);
		}
		ctx.closePath();
		ctx.clip();

		// Compute the texture coordinates
		const uv = face.uv;
		const sx = uv[0][0] * texture.width;
		const sy = uv[0][1] * texture.height;
		const sWidth = (uv[1][0] - uv[0][0]) * texture.width;
		const sHeight = (uv[2][1] - uv[0][1]) * texture.height;
		ctx.drawImage(
			texture,
			sx,
			sy,
			sWidth,
			sHeight,
			projectedVertices[face.vertices[0]].x,
			projectedVertices[face.vertices[0]].y,
			projectedVertices[face.vertices[2]].x - projectedVertices[face.vertices[0]].x,
			projectedVertices[face.vertices[2]].y - projectedVertices[face.vertices[0]].y
		);
		ctx.restore();
	});
}
