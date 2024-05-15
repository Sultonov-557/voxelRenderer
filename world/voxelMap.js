import { Cube } from "./cube.js";

export class VoxelMap {
	constructor(sizeX, sizeY, sizeZ) {
		this.voxelMap = [];
		for (let x = 0; x < sizeX; x++) {
			this.voxelMap[x] = [];
			for (let y = 0; y < sizeY; y++) {
				this.voxelMap[x][y] = [];
				for (let z = 0; z < sizeZ; z++) {
					if (y == 0) {
						this.voxelMap[x][y][z] = new Cube("green");
					} else {
						this.voxelMap[x][y][z] = undefined;
					}
				}
			}
		}
	}
}
