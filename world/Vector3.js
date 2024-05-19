export class Vector3 {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} z
	 */
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	toString() {
		return `x:${this.x.toPrecision(2)} y:${this.y.toPrecision(2)} z:${this.z.toPrecision(2)}`;
	}

	dot(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	/**
	 * Adds two Vector3 objects together
	 * @param {Vector3} v The vector to add
	 * @returns {Vector3} A new Vector3 object containing the sum
	 */
	add(v) {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	/**
	 * Subtracts one Vector3 from another
	 * @param {Vector3} v The vector to subtract
	 * @returns {Vector3} A new Vector3 object containing the difference
	 */
	subtract(v) {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	}

	/**
	 * Multiplies the vector by a scalar
	 * @param {number} s The scalar to multiply by
	 * @returns {Vector3} A new Vector3 containing the result
	 */
	multiply(s) {
		return new Vector3(this.x * s, this.y * s, this.z * s);
	}

	/**
	 * Normalizes the vector
	 * @returns {Vector3} A new normalized Vector3
	 */
	normalize() {
		const mag = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		return new Vector3(this.x / mag, this.y / mag, this.z / mag);
	}

	/**
	 * Calculates the angle between this vector and another vector
	 * @param {Vector3} v The other vector
	 * @returns {number} The angle in radians
	 */
	angle(v) {
		const dot = this.x * v.x + this.y * v.y + this.z * v.z;
		const mag1 = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		const mag2 = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
		const mag = mag1 * mag2;
		return Math.acos(dot / mag);
	}

	/**
	 * Applies a matrix transform to the vector
	 * @param {Matrix4} matrix The transform matrix
	 * @returns {Vector3} A new transformed Vector3
	 */
	applyMatrix4(matrix) {
		const x = this.x * matrix[0] + this.y * matrix[4] + this.z * matrix[8] + matrix[12];
		const y = this.x * matrix[1] + this.y * matrix[5] + this.z * matrix[9] + matrix[13];
		const z = this.x * matrix[2] + this.y * matrix[6] + this.z * matrix[10] + matrix[14];
		return new Vector3(x, y, z);
	}

	/**
	 * Calculates the distance between this vector and another vector
	 * @param {Vector3} v The other vector
	 * @returns {number} The distance
	 */
	distance(v) {
		const dx = this.x - v.x;
		const dy = this.y - v.y;
		const dz = this.z - v.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
}
