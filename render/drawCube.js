import { Vector3 } from "../world/Vector3.js";

// Function to draw a 3D cube
export function drawCube({ voxel, camera }, ctx) {
	const light = new Vector3(100, 100, 100);
	// Define cube dimensions
	const cubeSize = 1;

	// Calculate cube's position in 3D space
	const cubeX = voxel.x * cubeSize;
	const cubeY = voxel.y * cubeSize;
	const cubeZ = voxel.z * cubeSize;

	// Define cube vertices
	const vertices = [
		{ x: cubeX - cubeSize / 2, y: cubeY - cubeSize / 2, z: cubeZ - cubeSize / 2 },
		{ x: cubeX + cubeSize / 2, y: cubeY - cubeSize / 2, z: cubeZ - cubeSize / 2 },
		{ x: cubeX + cubeSize / 2, y: cubeY + cubeSize / 2, z: cubeZ - cubeSize / 2 },
		{ x: cubeX - cubeSize / 2, y: cubeY + cubeSize / 2, z: cubeZ - cubeSize / 2 },
		{ x: cubeX - cubeSize / 2, y: cubeY - cubeSize / 2, z: cubeZ + cubeSize / 2 },
		{ x: cubeX + cubeSize / 2, y: cubeY - cubeSize / 2, z: cubeZ + cubeSize / 2 },
		{ x: cubeX + cubeSize / 2, y: cubeY + cubeSize / 2, z: cubeZ + cubeSize / 2 },
		{ x: cubeX - cubeSize / 2, y: cubeY + cubeSize / 2, z: cubeZ + cubeSize / 2 },
	];

	// Project vertices onto 2D screen
	const projectedVertices = vertices.map((vertex) => camera.projectPoint(vertex));

	// Check if any projected point is null (behind camera)
	if (projectedVertices.some((vertex) => vertex === null)) {
		return; // Skip drawing if any vertex is null
	}

	// Calculate brightness based on angle between face normal and light direction
	const faceNormals = [
		{ x: 0, y: 0, z: -1 }, // Front face
		{ x: 1, y: 0, z: 0 }, // Right face
		{ x: 0, y: 1, z: 0 }, // Top face
		{ x: 0, y: 0, z: 1 }, // Back face
		{ x: -1, y: 0, z: 0 }, // Left face
		{ x: 0, y: -1, z: 0 }, // Bottom face
	];

	const brightness = faceNormals.map((normal) => {
		const dotProduct = normal.x * light.x + normal.y * light.y + normal.z * light.z;
		return Math.max(dotProduct, 0); // Ensure brightness is non-negative
	});

	// Draw filled cube faces
	ctx.fillStyle = `rgba(128, 128, 128, ${brightness[0]})`; // Front face (grey)
	ctx.beginPath();
	ctx.moveTo(projectedVertices[0].x, projectedVertices[0].y);
	ctx.lineTo(projectedVertices[1].x, projectedVertices[1].y);
	ctx.lineTo(projectedVertices[2].x, projectedVertices[2].y);
	ctx.lineTo(projectedVertices[3].x, projectedVertices[3].y);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = `rgba(128, 128, 128, ${brightness[1]})`; // Right face (grey)
	ctx.beginPath();
	ctx.moveTo(projectedVertices[1].x, projectedVertices[1].y);
	ctx.lineTo(projectedVertices[5].x, projectedVertices[5].y);
	ctx.lineTo(projectedVertices[6].x, projectedVertices[6].y);
	ctx.lineTo(projectedVertices[2].x, projectedVertices[2].y);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = `rgba(128, 128, 128, ${brightness[2]})`; // Top face (grey)
	ctx.beginPath();
	ctx.moveTo(projectedVertices[2].x, projectedVertices[2].y);
	ctx.lineTo(projectedVertices[6].x, projectedVertices[6].y);
	ctx.lineTo(projectedVertices[7].x, projectedVertices[7].y);
	ctx.lineTo(projectedVertices[3].x, projectedVertices[3].y);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = `rgba(128, 128, 128, ${brightness[3]})`; // Back face (grey)
	ctx.beginPath();
	ctx.moveTo(projectedVertices[4].x, projectedVertices[4].y);
	ctx.lineTo(projectedVertices[5].x, projectedVertices[5].y);
	ctx.lineTo(projectedVertices[6].x, projectedVertices[6].y);
	ctx.lineTo(projectedVertices[7].x, projectedVertices[7].y);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = `rgba(128, 128, 128, ${brightness[4]})`; // Left face (grey)
	ctx.beginPath();
	ctx.moveTo(projectedVertices[0].x, projectedVertices[0].y);
	ctx.lineTo(projectedVertices[4].x, projectedVertices[4].y);
	ctx.lineTo(projectedVertices[7].x, projectedVertices[7].y);
	ctx.lineTo(projectedVertices[3].x, projectedVertices[3].y);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = `rgba(128, 128, 128, ${brightness[5]})`; // Bottom face (grey)
	ctx.beginPath();
	ctx.moveTo(projectedVertices[0].x, projectedVertices[0].y);
	ctx.lineTo(projectedVertices[1].x, projectedVertices[1].y);
	ctx.lineTo(projectedVertices[5].x, projectedVertices[5].y);
	ctx.lineTo(projectedVertices[4].x, projectedVertices[4].y);
	ctx.closePath();
	ctx.fill();
}
