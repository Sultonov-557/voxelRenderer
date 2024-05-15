// Function to draw a 3D cube
export function drawCube({ voxel, camera }, ctx) {
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
	//console.log(projectPoint(voxel, camera, true));
	// Check if any projected point is null (behind camera)
	if (projectedVertices.some((vertex) => vertex === null)) {
		return; // Skip drawing if any vertex is null
	}

	// Draw cube
	ctx.beginPath();
	ctx.moveTo(projectedVertices[0].x, projectedVertices[0].y);
	ctx.lineTo(projectedVertices[1].x, projectedVertices[1].y);
	ctx.lineTo(projectedVertices[2].x, projectedVertices[2].y);
	ctx.lineTo(projectedVertices[3].x, projectedVertices[3].y);
	ctx.closePath();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(projectedVertices[4].x, projectedVertices[4].y);
	ctx.lineTo(projectedVertices[5].x, projectedVertices[5].y);
	ctx.lineTo(projectedVertices[6].x, projectedVertices[6].y);
	ctx.lineTo(projectedVertices[7].x, projectedVertices[7].y);
	ctx.closePath();
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(projectedVertices[0].x, projectedVertices[0].y);
	ctx.lineTo(projectedVertices[4].x, projectedVertices[4].y);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(projectedVertices[1].x, projectedVertices[1].y);
	ctx.lineTo(projectedVertices[5].x, projectedVertices[5].y);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(projectedVertices[2].x, projectedVertices[2].y);
	ctx.lineTo(projectedVertices[6].x, projectedVertices[6].y);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(projectedVertices[3].x, projectedVertices[3].y);
	ctx.lineTo(projectedVertices[7].x, projectedVertices[7].y);
	ctx.stroke();
}
