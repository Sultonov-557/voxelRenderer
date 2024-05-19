import { Camera, drawCube } from "./render/index.js";
import { Vector3 } from "./world/Vector3.js";
import { VoxelMap } from "./world/voxelMap.js";
import { loadTexture } from "./render/loadTexture.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const camera = new Camera(new Vector3(0, 0, 5), canvas, Math.PI / 6, Math.PI / 4);
const voxelMap = new VoxelMap(10, 10, 10);

window.addEventListener("keydown", (e) => {
	const movementSpeed = 0.5; // Adjust as needed
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

async function update() {
	// Update logic can go here if needed
}

async function render(texture) {
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
			return BD - AD;
		});

	for (let voxel of sortedVoxels) {
		drawCube({ voxel, camera }, ctx, texture);
	}

	ctx.fillStyle = "black";
	ctx.textAlign = "left";
	ctx.font = "bold 20px monospace";
	ctx.textBaseline = "hanging";

	ctx.fillText(`camera: ${camera.position.toString()}`, 0, 0);
	ctx.fillText(`pitch: ${camera.pitch.toFixed(2)} yaw: ${camera.yaw.toFixed(2)}`, 0, 20);
	ctx.fillText(`voxels: ${sortedVoxels.length}`, 0, 40); 
}

async function main() {
	const texture = await loadTexture("./textures/terrain.png");
	const loop = () => {
		update();
		render(texture);
		requestAnimationFrame(loop);
	};
	loop();
}

main();
