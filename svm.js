import { dotProd } from "utils.js";

const dataset = [
  { x: 1, y: 2, label: 1 },  // Positive class
  { x: 2, y: 3, label: 1 },
  { x: 3, y: 1, label: 1 },
  { x: 4, y: 4, label: 1 },
  { x: 5, y: 2, label: 1 },
  
  { x: 6, y: 5, label: -1 }, // Negative class
  { x: 7, y: 6, label: -1 },
  { x: 8, y: 7, label: -1 },
  { x: 9, y: 5, label: -1 },
  { x: 10, y: 6, label: -1 }
];

const samples = dataset.map(elem => [elem.x, elem.y]);
const labels = dataset.map(elem => elem.label);

function SVM(learnRate = 0.001, lambda = 0.01, iters = 1000) {

	this.learnRate = learnRate;
	this.lambda = lambda;
	this.iters = iters;

	this.weights = null;
	this.bias = null;
}

SVM.prototype.fit = function(samples, labels) {
	const samplesAmt = samples.length;
	const featureAmt = samples[0].length;

	// init bias and weights as zeros,
	this.weights = new Array(featureAmt).fill(0);
	this.bias = 0;

	for (let i = 0; i < this.iters; ++i) {
		samples.forEach((elem, idx) => {
			const condition = labels[idx] * (dotProd(elem, this.weights) - this.bias) >= 1;
			if (condition) {
				this.
			} else {
				this.bias -= this.learnRate * labels[idx];
			}
		})
	}
}

SVM.prototype.predict = function(sample) {
	const approximation = dotProd(sample, this.weights) - this.bias;
	return Math.sign(approximation);
}

const svm = new SVM();
svm.fit(samples, labels);
