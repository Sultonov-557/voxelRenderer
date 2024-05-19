import { Vector3 } from "../world/Vector3.js";

export class Camera {
	/**
	 * @param {Vector3} position
	 * @param {number} yaw
	 * @param {number} pitch
	 */
	constructor(position, canvas, yaw, pitch) {
		this.position = position;
		this.yaw = yaw;
		this.pitch = pitch;
		this.canvas = { width: canvas.width, height: canvas.height };
		this.fov = Math.PI / 4;
		this.near = 0.1;
		this.far = 1000;
		this.aspectRatio = this.canvas.width / this.canvas.height;
	}

	projectPoint(point) {
		const { x, y, z } = point;

		const cosPitch = Math.cos(this.pitch);
		const sinPitch = Math.sin(this.pitch);
		const cosYaw = Math.cos(this.yaw);
		const sinYaw = Math.sin(this.yaw);

		const dx = x - this.position.x;
		const dy = y - this.position.y;
		const dz = z - this.position.z;

		const cameraX = cosYaw * dx + sinYaw * dz;
		const cameraY = sinPitch * (cosYaw * dz - sinYaw * dx) + cosPitch * dy;
		const cameraZ = cosPitch * (cosYaw * dz - sinYaw * dx) - sinPitch * dy;

		if (cameraZ < this.near) {
			return null;
		}

		const scale = this.fov / cameraZ;
		const projectedX = cameraX * scale * this.aspectRatio;
		const projectedY = cameraY * scale;

		const screenX = projectedX * (this.canvas.width / 2) + this.canvas.width / 2;
		const screenY = -projectedY * (this.canvas.height / 2) + this.canvas.height / 2;

		return { x: screenX, y: screenY };
	}
}
