import { dotProd } from "./utils.js";

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

	this.weights = new Array(featureAmt).fill(0);
	this.bias = 0;

	for (let i = 0; i < this.iters; ++i) {

		samples.forEach((sample, idx) => {

			const condition = labels[idx] * (dotProd(sample, this.weights) - this.bias) >= 1;

			if (condition) {

				this.weights.forEach((_, i) => {
					this.weights[i] -= this.learnRate * (2 * this.lambda * this.weights[i]);
				});

			} else {

				this.weights.forEach((_, i) => {
					this.weights[i]-= this.learnRate * (2 * this.lambda * this.weights[i] - (sample[i] * labels[idx]));
				});
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
const dataset = {
	"samples":[[1,2],[2,3],[3,1],[4,4],[5,2],[6,5],[7,6],[8,7],[9,5],[10,6]],
	"labels":[1,1,1,1,1,-1,-1,-1,-1,-1] //MUST be either 1 or -1, if 0 algo is fucked
}

svm.fit(dataset.samples, dataset.labels);
console.log(svm.predict([process.argv[2], process.argv[3]]));

