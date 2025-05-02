import * as faceapi from 'face-api.js';
import path from 'path';
import canvas from 'canvas';

// Patch face-api.js environment
const { Canvas, Image, ImageData } = canvas;

faceapi.env.monkeyPatch({
  Canvas: Canvas as unknown as { new (): HTMLCanvasElement; prototype: HTMLCanvasElement },
  Image: Image as unknown as { new (): HTMLImageElement; prototype: HTMLImageElement },
  ImageData: ImageData as unknown as { new (): ImageData; prototype: ImageData },
});


export async function loadModels() {
  const modelPath = path.join(__dirname, '../'); // Adjust path as needed
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
}

export function euclideanDistance(arr1: number[], arr2: number[]) {
  return Math.sqrt(arr1.reduce((sum, val, i) => sum + (val - arr2[i]) ** 2, 0));
}

export { faceapi, canvas };
