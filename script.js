import { Camera, drawCube } from "./render/index.js";
import { Vector3 } from "./world/Vector3.js";
import { VoxelMap } from "./world/voxelMap.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Calculate FOV based on canvas dimensions and distance to canvas
function calculateFOV(canvasHeight, distanceToCanvas) {
	return 2 * Math.atan(canvasHeight / (2 * distanceToCanvas));
}

const camera = new Camera(new Vector3(10, 0, 10), canvas, 0, 0, calculateFOV(canvas.height, 1000));
console.log(camera.fov);
const voxelMap = new VoxelMap(10, 10, 10);

window.addEventListener("keydown", (e) => {
	const movementSpeed = 1; // Adjust as needed
	const rotationSpeed = 0.1; // Adjust as needed

	switch (e.key) {
		case "w":
			camera.position.z -= Math.cos(camera.yaw) * movementSpeed;
			camera.position.x -= Math.sin(camera.yaw) * movementSpeed;
			break;
		case "s":
			camera.position.z += Math.cos(camera.yaw) * movementSpeed;
			camera.position.x += Math.sin(camera.yaw) * movementSpeed;
			break;
		case "a":
			camera.position.x -= Math.cos(camera.yaw) * movementSpeed;
			camera.position.z += Math.sin(camera.yaw) * movementSpeed;
			break;
		case "d":
			camera.position.x += Math.cos(camera.yaw) * movementSpeed;
			camera.position.z -= Math.sin(camera.yaw) * movementSpeed;
			break;
		case "q":
			camera.position.y += movementSpeed;
			break;
		case "e":
			camera.position.y -= movementSpeed;
			break;
		case "8":
			camera.pitch += rotationSpeed;
			break;
		case "2":
			camera.pitch -= rotationSpeed;
			break;
		case "4":
			camera.yaw += rotationSpeed;
			break;
		case "6":
			camera.yaw -= rotationSpeed;
			break;
	}
});

function update() {}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const voxels = [];
	voxelMap.voxelMap.forEach((column, x) =>
		column.forEach((row, y) =>
			row.forEach((voxel, z) => {
				if (!voxel) return;

				const voxelPos = new Vector3(x, y, z);
				voxels.push(voxelPos);
			})
		)
	);

	const sortedVoxels = voxels
		.filter((v) => {
			const point = camera.projectPoint(v);
			return !!point;
		})
		.sort((a, b) => {
			const AD = camera.position.distance(a);
			const BD = camera.position.distance(b);

			return AD - BD;
		});

	let drawn;
	for (let voxel of sortedVoxels) {
		drawCube({ voxel, camera }, ctx);
		drawn = drawn || camera.projectPoint(voxel, true);
	}

	ctx.textAlign = "left";
	ctx.font = "bold 50px monospace";
	ctx.textBaseline = "hanging";

	ctx.fillText(`camera: ${camera.position}`, 0, 0);
	ctx.fillText(`pitch:${camera.pitch.toPrecision(2)} yaw:${camera.yaw.toPrecision(2)}`, 0, 50);
	ctx.fillText(`voxels: ${sortedVoxels.length}`, 0, 100);
	ctx.fillText(`screen pos: ${JSON.stringify(drawn)}`, 0, 150);
}

setInterval(() => {
	update();
	render();
}, 16); // 60 frames per second
