import { Vector3 } from "../world/Vector3.js";

export class Camera {
	/**
	 * @param {Vector3} position
	 * @param {number} yaw
	 * @param {number} pitch
	 */
	constructor(position, canvas, yaw, pitch, fov = 90) {
		this.position = position;
		this.yaw = yaw;
		this.canvas = { width: canvas.width, height: canvas.height };
		this.pitch = pitch;
		this.fov = fov;
	}

	// Function to project 3D point to 2D screen coordinates
	projectPoint(point3D, behind) {
		const x = point3D.x - this.position.x;
		const y = point3D.y - this.position.y;
		const z = point3D.z - this.position.z;

		// Apply camera rotation
		const rotatedX = x * Math.cos(this.yaw) + z * Math.sin(this.yaw);
		const rotatedZ = -x * Math.sin(this.yaw) + z * Math.cos(this.yaw);

		// Apply camera pitch
		const rotatedY = y * Math.cos(this.pitch) - rotatedZ * Math.sin(this.pitch);

		// Check if point is behind camera
		if (rotatedY <= 0 && !behind) return null;

		// Project onto 2D screen
		const projectedX = rotatedX / rotatedY;
		const projectedZ = rotatedZ / rotatedY;

		// Apply FOV
		const fovFactor = Math.tan(this.fov / 2);
		const projectedXFinal = projectedX / fovFactor;
		const projectedZFinal = projectedZ / fovFactor;

		// Scale to canvas dimensions
		const scaleX = this.canvas.width / 2;
		const scaleY = this.canvas.height / 2;
		const screenX = projectedXFinal * scaleX + scaleX;
		const screenY = projectedZFinal * scaleY + scaleY;

		return { x: screenX, y: screenY };
	}
}
