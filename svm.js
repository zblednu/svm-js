import np from "numjs";
import fs from "node:fs";

class SVM {
	constructor(learningRate = 0.001, lambda = 0.01, iters = 1000) {
		this.lr = learningRate;
		this.lambda = lambda;
		this.iters = iters;

		this.w = null;
		this.b = null;
	}


	/*
	 y must be either 1 or -1
	 */
	fit(X, y) {
		const shape = X.shape;
		const nSamples = shape[0];
		const nFeatures = shape[1];

		this.w = np.zeros(nFeatures);
		this.b = 0;

		for (let i = 0; i < this.iters; ++i) {
			for (let j = 0; j < X.shape[0]; ++j) {
				const elem = X.get(j);
				const idx = j;
				const condition = y[idx] * (np.dot(elem, this.w) - this.b) >= 1;
				if (condition) {
					this.w -= this.lr * (2 * this.lambda * this.w);
				} else {
					this.w -= this.lr * (2 * this.lambda * this.w - np.dot(elem, y[idx]));
					this.b -= this.lr * y[idx];
				}
			}
		}
	}

	predict(X) {
	}
}

const X = np.array(JSON.parse(fs.readFileSync("input-data")));
const y = np.array(JSON.parse(fs.readFileSync("input-labels")));

console.log(X);
console.log(X.get(0, 0));


const svm = new SVM();
svm.fit(X, y);
